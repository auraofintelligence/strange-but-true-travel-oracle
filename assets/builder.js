(function () {
  const builders = window.TravelOracleBuilders || {};
  const body = document.body;
  const builderKey = body.dataset.builder;
  const indexMount = document.querySelector("[data-builder-index]");
  const root = document.querySelector("[data-builder-root]");
  const builderFlow = [
    "intake",
    "destination",
    "legalBridge",
    "strategyRun",
    "signalLog",
    "serendipity",
    "relationship",
    "sharedTable",
    "agentBrief",
    "privacyRedaction",
    "styleReview"
  ];

  function todayStamp() {
    const parts = new Intl.DateTimeFormat("en-AU", {
      day: "2-digit",
      month: "2-digit",
      timeZone: "Australia/Brisbane",
      year: "numeric"
    }).formatToParts(new Date());
    const pick = (type) => parts.find((part) => part.type === type).value;
    return pick("year") + "-" + pick("month") + "-" + pick("day");
  }

  function displayDate() {
    return new Date().toLocaleDateString("en-AU", {
      dateStyle: "long",
      timeZone: "Australia/Brisbane"
    });
  }

  function slugify(value) {
    return String(value || "draft")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "draft";
  }

  function yamlScalar(value) {
    return '"' + String(value || "TODO").replace(/\s+/g, " ").trim().replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }

  function cleanLines(value) {
    return String(value || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function bulletList(items) {
    const clean = items.filter(Boolean);
    if (!clean.length) return "- TODO";
    return clean.map((item) => "- " + item).join("\n");
  }

  function fieldId(config, field) {
    return config.storageKey + "-" + field.name;
  }

  function selectedLabels(field, values) {
    const selected = new Set(values || []);
    return (field.options || [])
      .filter(([value]) => selected.has(value))
      .map(([, label]) => label);
  }

  function getFileName(config, state) {
    const title = state[config.titleField] || state.destination_name || state.question || config.markdownTitle;
    return config.fileName
      .replace("{date}", todayStamp())
      .replace("{slug}", slugify(title));
  }

  function currentFileName() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function getBuilderPage(config) {
    return currentFileName() || config.page;
  }

  function appendFieldHelp(label, field) {
    if (!field.help) return;
    const help = document.createElement("p");
    help.className = "field-help";
    help.textContent = field.help;
    label.appendChild(help);
  }

  function getState(config, form) {
    const state = {};
    config.groups.forEach((group) => {
      group.fields.forEach((field) => {
        if (field.type === "checkboxes") {
          state[field.name] = [...form.querySelectorAll('input[name="' + field.name + '"]:checked')].map((input) => input.value);
          return;
        }
        const input = form.elements[field.name];
        state[field.name] = input ? input.value : "";
      });
    });
    return state;
  }

  function restoreState(config, form, state) {
    config.groups.forEach((group) => {
      group.fields.forEach((field) => {
        if (field.type === "checkboxes") {
          const values = new Set(state[field.name] || []);
          [...form.querySelectorAll('input[name="' + field.name + '"]')].forEach((input) => {
            input.checked = values.has(input.value);
          });
          return;
        }
        const input = form.elements[field.name];
        if (input && Object.prototype.hasOwnProperty.call(state, field.name)) {
          if (field.type === "select") {
            const savedValue = state[field.name];
            const validOption = [...input.options].some((option) => option.value === savedValue);
            if (!validOption) return;
          }
          input.value = state[field.name];
        }
      });
    });
  }

  function readSavedState(config) {
    try {
      return JSON.parse(sessionStorage.getItem(config.storageKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveState(config, state) {
    sessionStorage.setItem(config.storageKey, JSON.stringify(state));
  }

  function shouldSpanField(config, field, fieldIndex) {
    const fieldType = field.type || "text";
    const fieldText = [field.name, field.label, field.placeholder, field.help].join(" ");
    const importantTextPattern = /\b(title|destination|route|place|country|region|base|source|subject|question|target|file|page|component|scope|context)\b/i;
    const longText = String(field.label || "").length > 42 || String(field.placeholder || "").length > 42 || String(field.help || "").length > 90;
    if (field.span === "all" || field.fullWidth) return true;
    if (fieldType === "textarea" || fieldType === "checkboxes") return true;
    if (field.name === config.titleField) return true;
    if (fieldType === "select") return longText;
    if (fieldType !== "text") return false;
    return fieldIndex === 0 || importantTextPattern.test(fieldText) || longText;
  }

  function renderField(config, field, fieldIndex) {
    const label = document.createElement("label");
    const fieldType = field.type || "text";
    label.className = "builder-field is-" + fieldType + (shouldSpanField(config, field, fieldIndex) ? " span-all" : "");
    if (field.type !== "checkboxes") label.setAttribute("for", fieldId(config, field));

    const labelText = document.createElement("span");
    labelText.textContent = field.label;
    label.appendChild(labelText);

    if (field.type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.id = fieldId(config, field);
      textarea.name = field.name;
      textarea.rows = 5;
      textarea.placeholder = field.placeholder || "";
      label.appendChild(textarea);
      appendFieldHelp(label, field);
      return label;
    }

    if (field.type === "select") {
      const select = document.createElement("select");
      select.id = fieldId(config, field);
      select.name = field.name;
      (field.options || []).forEach(([value, text]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
      });
      label.appendChild(select);
      appendFieldHelp(label, field);
      return label;
    }

    if (field.type === "checkboxes") {
      const group = document.createElement("div");
      group.className = "option-grid";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", field.label);
      (field.options || []).forEach(([value, text]) => {
        const optionLabel = document.createElement("label");
        optionLabel.className = "check-option";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = field.name;
        input.value = value;
        const optionText = document.createElement("span");
        optionText.textContent = text;
        optionLabel.append(input, optionText);
        group.appendChild(optionLabel);
      });
      label.appendChild(group);
      appendFieldHelp(label, field);
      return label;
    }

    const input = document.createElement("input");
    input.id = fieldId(config, field);
    input.name = field.name;
    input.type = field.type || "text";
    input.placeholder = field.placeholder || "";
    label.appendChild(input);
    appendFieldHelp(label, field);
    return label;
  }

  function buildMarkdown(config, state) {
    const fileName = getFileName(config, state);
    const frontMatter = [
      "---",
      "schema: " + yamlScalar(config.schema),
      "status: draft_for_ai_import",
      "privacy: private",
      "builder: " + yamlScalar(getBuilderPage(config)),
      "output_file: " + yamlScalar(fileName),
      "generated_date: " + yamlScalar(displayDate()),
      "title: " + yamlScalar(state[config.titleField] || config.markdownTitle),
      "---",
      ""
    ].join("\n");

    const lines = [
      frontMatter,
      "# " + config.markdownTitle,
      "",
      "## AI Import Instructions",
      "",
      "- Treat this as private self-sovereign context for the active traveller(s) inside Luke's Strange But True travel strategy dataset workspace.",
      "- Preserve Australian English, the private future-oracle frame, and the traveller's right to choose how a life of travel is navigated.",
      "- Do not flatten the traveller(s) into a client, itinerary, risk profile, destination score or travel-agent workflow.",
      "- Joyful Responsible Abundance is a direction of hope and a compass, not a sermon or a claim of arrival.",
      "- Relativity matters: hold shifting context, changing capacity, mixed motives and multiple possible lives without forcing one premature answer.",
      "- The source planning documents are examples of sophisticated Earth navigation, not gospel; scale the response to the traveller's actual moment.",
      "- Serendipity, spontaneity, romance, intercultural relationships and Global Group Marriages context are real life-navigation lanes, not side notes.",
      "- Insurance may only appear as a legal, entry, visa, venue, transport or client-framework requirement.",
      "- Do not publish live location, exact routes, real people, romance details, private contacts, financial details, identity documents, credentials or vulnerable material.",
      "",
      "## Agent Handoff",
      "",
      config.handoff || "Use this file as agent-ready context.",
      ""
    ];

    config.groups.forEach((group) => {
      lines.push("## " + group.legend, "");
      group.fields.forEach((field) => {
        let value = state[field.name];
        if (field.type === "checkboxes") value = bulletList(selectedLabels(field, value));
        if (field.type !== "checkboxes" && cleanLines(value).length > 1) value = cleanLines(value).join("\n");
        lines.push("### " + field.label, "", value || "- TODO", "");
      });
    });

    lines.push(
      "## Linked Context",
      "",
      "- Strange But True: https://auraofintelligence.github.io/strange-but-true/",
      "- Australian World Travel: https://auraofintelligence.github.io/Australian-world-travel/",
      "- Australian World Travel strategy: https://auraofintelligence.github.io/Australian-world-travel/strategy.html",
      "- Legal Memory Workbench local source: ../legal-memory-workbench/index.html",
      "- I C. Infinity Musicverse: https://auraofintelligence.github.io/i-C-infinity-music-universe/index.html",
      "- Shared Table Initiative: https://auraofintelligence.github.io/shared-table-initiative/",
      "- Global Group Marriages: https://globalgroupmarriages.com",
      "- Source docs: Designing_a_Dynamic_AI-Powered_Travel_Intelligence_System.md; Global_Peace_Through_AI_Travel.md; Aura_Travel_Oracle.md; Luke's_Travel_Oracle_for_2025_to_2035.md",
      "",
      "## Review Notes",
      "",
      "- Human review is required before action.",
      "- Official source checks must be refreshed close to travel.",
      "- Private or relational content should be redacted before any public summary.",
      ""
    );

    return lines.join("\n");
  }

  function setStatus(node, message) {
    if (!node) return;
    node.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      node.textContent = "";
    }, 2800);
  }

  function downloadMarkdown(config, markdown, state) {
    const fileName = getFileName(config, state);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 0);
  }

  function renderBuilderIndex() {
    if (!indexMount) return;
    const fragment = document.createDocumentFragment();
    Object.values(builders).forEach((config) => {
      const card = document.createElement("article");
      card.className = "card builder-card";

      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = config.fileName;

      const title = document.createElement("h3");
      title.textContent = config.markdownTitle;

      const copy = document.createElement("p");
      copy.textContent = config.lede;

      const link = document.createElement("a");
      link.className = "button secondary";
      link.href = config.page;
      link.textContent = "Open this map";

      card.append(tag, title, copy, link);
      fragment.appendChild(card);
    });
    indexMount.appendChild(fragment);
  }

  function renderBuilderTrail(config) {
    const trail = document.createElement("nav");
    trail.className = "builder-trail";
    trail.setAttribute("aria-label", "Builder navigation");

    const summary = document.createElement("p");
    summary.textContent = config.fileName + " self-sovereign export";

    const links = document.createElement("div");
    links.className = "builder-trail-links";

    const buildersLink = document.createElement("a");
    buildersLink.className = "button secondary";
    buildersLink.href = "builders.html";
    buildersLink.textContent = "Back to builders";
    links.appendChild(buildersLink);

    if (config.page && config.page !== currentFileName()) {
      const pageLink = document.createElement("a");
      pageLink.className = "button secondary";
      pageLink.href = config.page;
      pageLink.textContent = "Open main page";
      links.appendChild(pageLink);
    }

    trail.append(summary, links);
    return trail;
  }

  function builderFlowEntries() {
    return builderFlow
      .filter((key) => builders[key])
      .map((key) => [key, builders[key]]);
  }

  function adjacentBuilders() {
    const entries = builderFlowEntries();
    const index = entries.findIndex(([key]) => key === builderKey);
    return {
      currentIndex: index,
      total: entries.length,
      previous: index > 0 ? entries[index - 1][1] : null,
      next: index >= 0 && index < entries.length - 1 ? entries[index + 1][1] : null
    };
  }

  function renderPagerItem(direction, config, fallbackText) {
    const item = document.createElement(config ? "a" : "span");
    item.className = "form-pager-item" + (config ? "" : " is-disabled");
    if (config) item.href = config.page;

    const eyebrow = document.createElement("span");
    eyebrow.className = "form-pager-eyebrow";
    eyebrow.textContent = direction;

    const title = document.createElement("strong");
    title.textContent = config ? config.markdownTitle : fallbackText;

    item.append(eyebrow, title);
    return item;
  }

  function renderBuilderPager() {
    const adjacent = adjacentBuilders();
    const pager = document.createElement("nav");
    pager.className = "form-pager";
    pager.setAttribute("aria-label", "Form sequence navigation");

    const previous = renderPagerItem("Previous form", adjacent.previous, "Start of forms");
    const position = document.createElement("p");
    position.className = "form-pager-position";
    position.textContent = adjacent.currentIndex >= 0
      ? "Form " + (adjacent.currentIndex + 1) + " of " + adjacent.total
      : "Form sequence";
    const next = renderPagerItem("Next form", adjacent.next, "End of forms");

    pager.append(previous, position, next);
    return pager;
  }

  function renderBuilderPage(config) {
    if (!root) return;

    root.appendChild(renderBuilderTrail(config));

    const section = document.createElement("section");
    section.className = "section builder-layout";

    const form = document.createElement("form");
    form.className = "builder-form";
    form.setAttribute("data-builder-form", "");

    config.groups.forEach((group) => {
      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = group.legend;
      fieldset.appendChild(legend);
      const fieldGrid = document.createElement("div");
      fieldGrid.className = "field-grid";
      group.fields.forEach((field, fieldIndex) => fieldGrid.appendChild(renderField(config, field, fieldIndex)));
      fieldset.appendChild(fieldGrid);
      form.appendChild(fieldset);
    });

    const actions = document.createElement("div");
    actions.className = "builder-actions";
    actions.innerHTML = [
      '<button class="button" type="submit">Update Markdown</button>',
      '<button class="button secondary" type="button" data-copy-markdown>Copy Markdown</button>',
      '<button class="button secondary" type="button" data-download-markdown>Download .md</button>',
      '<button class="button danger" type="button" data-clear-form>Clear</button>'
    ].join("");
    const status = document.createElement("p");
    status.className = "status-message";
    status.setAttribute("aria-live", "polite");
    form.append(actions, status, renderBuilderPager());

    const outputPanel = document.createElement("aside");
    outputPanel.className = "output-panel";
    const outputLabel = document.createElement("label");
    outputLabel.setAttribute("for", "markdown-output");
    outputLabel.textContent = "Generated Markdown";
    const output = document.createElement("textarea");
    output.id = "markdown-output";
    output.className = "markdown-output";
    output.spellcheck = false;
    output.setAttribute("data-markdown-output", "");
    outputPanel.append(outputLabel, output);

    section.append(form, outputPanel);
    root.appendChild(section);

    restoreState(config, form, readSavedState(config));

    function updateOutput() {
      const state = getState(config, form);
      saveState(config, state);
      output.value = buildMarkdown(config, state);
      return state;
    }

    form.addEventListener("input", updateOutput);
    form.addEventListener("change", updateOutput);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      updateOutput();
      setStatus(status, "Markdown updated.");
    });

    form.querySelector("[data-copy-markdown]").addEventListener("click", async () => {
      updateOutput();
      try {
        await navigator.clipboard.writeText(output.value);
        setStatus(status, "Markdown copied.");
      } catch (error) {
        output.select();
        document.execCommand("copy");
        setStatus(status, "Markdown selected and copied.");
      }
    });

    form.querySelector("[data-download-markdown]").addEventListener("click", () => {
      const state = updateOutput();
      downloadMarkdown(config, output.value, state);
      setStatus(status, getFileName(config, state) + " ready.");
    });

    form.querySelector("[data-clear-form]").addEventListener("click", () => {
      sessionStorage.removeItem(config.storageKey);
      form.reset();
      updateOutput();
      setStatus(status, "Cleared.");
    });

    updateOutput();
  }

  renderBuilderIndex();
  if (builderKey && builders[builderKey]) renderBuilderPage(builders[builderKey]);
})();
