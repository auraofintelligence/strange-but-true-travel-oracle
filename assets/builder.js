(function () {
  const builders = window.TravelOracleBuilders || {};
  const body = document.body;
  const builderKey = body.dataset.builder;
  const indexMount = document.querySelector("[data-builder-index]");
  const root = document.querySelector("[data-builder-root]");

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

  function renderField(config, field) {
    const label = document.createElement("label");
    label.className = field.type === "checkboxes" ? "builder-field span-all" : "builder-field";
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
        optionLabel.append(input, " " + text);
        group.appendChild(optionLabel);
      });
      label.appendChild(group);
      return label;
    }

    const input = document.createElement("input");
    input.id = fieldId(config, field);
    input.name = field.name;
    input.type = field.type || "text";
    input.placeholder = field.placeholder || "";
    label.appendChild(input);
    return label;
  }

  function buildMarkdown(config, state) {
    const fileName = getFileName(config, state);
    const frontMatter = [
      "---",
      "schema: " + yamlScalar(config.schema),
      "status: draft_for_ai_import",
      "privacy: private",
      "builder: " + yamlScalar(config.page),
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
      "- Treat this as private context for Luke's Strange But True travel strategy dataset workspace.",
      "- Preserve Australian English and the private, agent-managed future-oracle frame.",
      "- Joyful Responsible Abundance is a direction of hope and a compass, not a sermon or a claim of arrival.",
      "- Serendipity, spontaneity, romance, intercultural relationships and Global Group Marriages context are real planning lanes, not side notes.",
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
      "- I C. Infinity Musicverse: https://auraofintelligence.github.io/i-C-infinity-music-universe/index.html",
      "- Shared Table Initiative: https://auraofintelligence.github.io/shared-table-initiative/",
      "- Global Group Marriages: https://globalgroupmarriages.com",
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
      link.textContent = "Open builder";

      card.append(tag, title, copy, link);
      fragment.appendChild(card);
    });
    indexMount.appendChild(fragment);
  }

  function renderBuilderPage(config) {
    if (!root) return;

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
      group.fields.forEach((field) => fieldGrid.appendChild(renderField(config, field)));
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
    form.append(actions, status);

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
