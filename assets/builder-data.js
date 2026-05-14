(function () {
  const lanes = [
    ["reality", "Reality checks"],
    ["jra", "Joyful Responsible Abundance"],
    ["serendipity", "Serendipity and spontaneity"],
    ["relationships", "Romance and intercultural relationships"],
    ["shared_table", "Shared Table and cultural context"],
    ["musicverse", "Musicverse context"],
    ["strange_but_true", "Strange But True field notes"],
    ["precognition", "Pattern and precognition notes"],
    ["privacy", "Privacy and redaction"]
  ];

  const evidenceLevels = [
    ["unknown", "Unknown"],
    ["pattern", "Pattern"],
    ["relational", "Relational"],
    ["cultural", "Cultural"],
    ["operational", "Operational"],
    ["official", "Official"],
    ["mixed", "Mixed"]
  ];

  const decisionBands = [
    ["go", "Go"],
    ["prepare", "Prepare"],
    ["watch", "Watch"],
    ["pause", "Pause"],
    ["no_go", "No-go"],
    ["private", "Private only"]
  ];

  const agentRoles = [
    ["intake", "Intake Agent"],
    ["safety", "Safety and Consular Agent"],
    ["visa", "Visa and Logistics Agent"],
    ["route_budget", "Route and Budget Agent"],
    ["serendipity", "Serendipity and Spontaneity Agent"],
    ["relationships", "Romance and Intercultural Relationships Agent"],
    ["opportunity", "Opportunity and Strange But True Agent"],
    ["shared_table", "Shared Table and Cultural Context Agent"],
    ["precognition", "Precognition and Planning Agent"],
    ["synthesis", "Synthesis Agent"],
    ["privacy", "Privacy and Redaction Agent"]
  ];

  window.TravelOracleBuilders = {
    intake: {
      page: "travel-intake-builder.html",
      fileName: "travel-intake.md",
      schema: "strange_but_true_travel_oracle.travel_intake.v1",
      storageKey: "sbtTravelOracleIntake",
      title: "Build travel-intake.md",
      lede: "Capture the current human situation before agents start scoring destinations.",
      markdownTitle: "Travel Intake",
      titleField: "working_title",
      handoff: "Give this file to the Intake Agent first. It should become the shared context for all later destination, strategy-run, relationship, serendipity and privacy files.",
      groups: [
        {
          legend: "Current frame",
          fields: [
            { name: "working_title", label: "Working title", type: "text", placeholder: "e.g. Luke's May 2026 travel reset" },
            { name: "current_base", label: "Current base or starting point", type: "text", placeholder: "Country, city, home base, or unknown" },
            { name: "timeframe", label: "Likely travel window", type: "text", placeholder: "e.g. next 30 days, June to August, open-ended" },
            { name: "current_energy", label: "Energy, health and recovery reality", type: "textarea", placeholder: "What is honestly true before planning gets clever?" },
            { name: "cashflow", label: "Cashflow and survival reality", type: "textarea", placeholder: "Money available, income timing, debt pressure, cheap options, work possibilities." }
          ]
        },
        {
          legend: "Purpose and compass",
          fields: [
            { name: "why_now", label: "Why travel now?", type: "textarea", placeholder: "The real motive, not the polished public version." },
            { name: "jra_direction", label: "Joyful Responsible Abundance direction", type: "textarea", placeholder: "Where does hope point, without pretending abundance is already solved?" },
            { name: "must_keep", label: "What must be protected?", type: "textarea", placeholder: "Privacy, money, time, health, dignity, family, friendships, creative work, legal status." },
            { name: "focus_lanes", label: "Focus lanes", type: "checkboxes", options: lanes }
          ]
        },
        {
          legend: "Public and private boundary",
          fields: [
            { name: "public_safe", label: "Public-safe themes", type: "textarea", placeholder: "What could become Strange But True writing, service patterns, music notes, or public-safe reflections later?" },
            { name: "private_only", label: "Private-only material", type: "textarea", placeholder: "Live location, romance, route, money, contacts, vulnerability, intimate or identity details." },
            { name: "agent_questions", label: "Questions for the agent team", type: "textarea", placeholder: "What should the agents help decide, check, protect or map next?" }
          ]
        }
      ]
    },

    destination: {
      page: "destination-dossier-builder.html",
      fileName: "destination-dossier-{slug}.md",
      schema: "strange_but_true_travel_oracle.destination_dossier.v1",
      storageKey: "sbtTravelOracleDestination",
      title: "Build destination-dossier.md",
      lede: "Create one destination file that separates official checks, lived-life fit, romance, culture, shared tables and pattern notes.",
      markdownTitle: "Destination Dossier",
      titleField: "destination_name",
      handoff: "Give this to the Synthesis Agent after specialist agents have added checks. Do not treat it as travel advice until official sources are checked close to action.",
      groups: [
        {
          legend: "Destination identity",
          fields: [
            { name: "destination_name", label: "Destination name", type: "text", placeholder: "City, region, country, route, or cluster" },
            { name: "country_region", label: "Country / region", type: "text", placeholder: "e.g. Japan / Kansai, India / Goa, Europe rail loop" },
            { name: "status", label: "Current status", type: "select", options: [["draft", "Draft"], ["watch", "Watch"], ["candidate", "Candidate"], ["shortlist", "Shortlist"], ["active_plan", "Active plan"], ["archive", "Archive"]] },
            { name: "last_checked", label: "Last checked date", type: "date" },
            { name: "evidence_level", label: "Evidence level", type: "select", options: evidenceLevels }
          ]
        },
        {
          legend: "Official and practical checks",
          fields: [
            { name: "visa_entry", label: "Visa and entry notes", type: "textarea", placeholder: "What needs official checking before action?" },
            { name: "safety_health", label: "Safety and health notes", type: "textarea", placeholder: "Official travel advice, health requirements, local risks, recovery needs." },
            { name: "legal_insurance", label: "Insurance only where legally or contractually required", type: "textarea", placeholder: "Only mention entry, visa, venue, transport or client-framework requirements. No peace-of-mind framing." },
            { name: "route_budget", label: "Route and budget feasibility", type: "textarea", placeholder: "Flights, trains, buses, accommodation, arrival plan, survival costs, cheap paths." }
          ]
        },
        {
          legend: "Living field",
          fields: [
            { name: "serendipity", label: "Serendipity and spontaneity", type: "textarea", placeholder: "Invitations, cheap routes, local events, chance meetings, smallest safe yes." },
            { name: "relationships", label: "Romance and intercultural relationships", type: "textarea", placeholder: "Consent, law, norms, family, language, privacy, power differences, real people before theory." },
            { name: "shared_table", label: "Shared Table and cultural context", type: "textarea", placeholder: "Food, hospitality, reciprocity, protocols, hosts, sensitive or sacred material." },
            { name: "musicverse", label: "Musicverse and creative signal", type: "textarea", placeholder: "Songs, field recording ideas, lyric threads, performance or reflection possibilities." },
            { name: "sbt_fit", label: "Strange But True fit", type: "textarea", placeholder: "Service, writing, AI help, learning, local usefulness, public-safe output later." }
          ]
        },
        {
          legend: "Decision readiness",
          fields: [
            { name: "risks", label: "Risks and blockers", type: "textarea", placeholder: "What could make this wrong, unsafe, unaffordable, disrespectful, or too exposed?" },
            { name: "open_questions", label: "Open questions", type: "textarea", placeholder: "Official links to check, people to ask, dates to confirm, facts still missing." },
            { name: "next_actions", label: "Next actions", type: "textarea", placeholder: "Small practical steps before the next strategy run." }
          ]
        }
      ]
    },

    strategyRun: {
      page: "strategy-run-builder.html",
      fileName: "strategy-run-{date}.md",
      schema: "strange_but_true_travel_oracle.strategy_run.v1",
      storageKey: "sbtTravelOracleRun",
      title: "Build strategy-run.md",
      lede: "Create the dated strategy-modelling file that future agents and smart datasets can import, review and improve.",
      markdownTitle: "Strategy Run",
      titleField: "question",
      handoff: "This is not the oracle. It is one structured dataset for modelling mixed preferences, plans, constraints, strategy, serendipity and what would change the answer.",
      groups: [
        {
          legend: "Strategy question",
          fields: [
            { name: "run_date", label: "Run date", type: "date" },
            { name: "question", label: "Question", type: "textarea", placeholder: "What route, place, timing, relationship, table, work or recovery strategy is being modelled?" },
            { name: "candidate_destinations", label: "Candidate destinations", type: "textarea", placeholder: "One per line, with short notes if helpful." },
            { name: "decision_band", label: "Current strategy band", type: "select", options: decisionBands }
          ]
        },
        {
          legend: "Dataset inputs",
          fields: [
            { name: "official_checks", label: "Official and operational checks", type: "textarea", placeholder: "Visa, safety, health, route, budget, legal-framework insurance requirements only." },
            { name: "serendipity_output", label: "Serendipity and spontaneity output", type: "textarea", placeholder: "Useful surprise, invitations, cheap paths, chance openings, smallest safe yes." },
            { name: "relationship_output", label: "Romance and intercultural relationship output", type: "textarea", placeholder: "Relational possibilities, consent, law, local norms, privacy, power differences." },
            { name: "shared_table_output", label: "Shared Table output", type: "textarea", placeholder: "Hospitality, food, reciprocity, cultural protocols, public/private story boundaries." },
            { name: "pattern_output", label: "Pattern and precognition output", type: "textarea", placeholder: "Dreams, repeated symbols, intuitive signals, pre-mortems, kept separate from evidence." }
          ]
        },
        {
          legend: "Strategy model",
          fields: [
            { name: "score_summary", label: "Model summary", type: "textarea", placeholder: "Plain summary of the preference mix, constraints, strategy, serendipity and current weighting." },
            { name: "reason", label: "Reason for current model", type: "textarea", placeholder: "The current strategy in plain English." },
            { name: "what_would_change", label: "What would change the answer?", type: "textarea", placeholder: "New source, new invitation, price shift, visa rule, health issue, consent boundary, route change." },
            { name: "next_check", label: "Next check date or trigger", type: "text", placeholder: "e.g. 48 hours, after visa source update, when invitation is confirmed" }
          ]
        }
      ]
    },

    signalLog: {
      page: "signal-log-builder.html",
      fileName: "signal-log-{date}.md",
      schema: "strange_but_true_travel_oracle.signal_log.v1",
      storageKey: "sbtTravelOracleSignal",
      title: "Build signal-log.md",
      lede: "Record dreams, intuition, coincidences and future-memory style notes without pretending they are official evidence.",
      markdownTitle: "Signal Log",
      titleField: "signal_title",
      handoff: "Give this to the Precognition and Planning Agent. It may influence attention, but it must not override official checks, consent, budget or safety.",
      groups: [
        {
          legend: "Signal record",
          fields: [
            { name: "signal_title", label: "Signal title", type: "text", placeholder: "e.g. the table by the sea, repeated blue trains, dream of crossing" },
            { name: "signal_date", label: "Date noticed", type: "date" },
            { name: "signal_type", label: "Signal type", type: "checkboxes", options: [["dream", "Dream"], ["body", "Body signal"], ["coincidence", "Coincidence"], ["repeated_symbol", "Repeated symbol"], ["conversation", "Conversation"], ["creative", "Song / lyric / image"], ["future_memory", "Future-memory style note"]] },
            { name: "related_places", label: "Related places or routes", type: "textarea", placeholder: "Places, cultures, routes, events or people this might point toward." }
          ]
        },
        {
          legend: "Interpretation with boundaries",
          fields: [
            { name: "raw_note", label: "Raw note", type: "textarea", placeholder: "Write it plainly before interpreting it." },
            { name: "possible_meanings", label: "Possible meanings", type: "textarea", placeholder: "Multiple readings. No false certainty." },
            { name: "practical_check", label: "Practical check it suggests", type: "textarea", placeholder: "What should be checked in reality because of this signal?" },
            { name: "do_not_overclaim", label: "What not to overclaim", type: "textarea", placeholder: "Where could this be projection, fear, wishful thinking, loneliness or pattern-hunger?" }
          ]
        }
      ]
    },

    serendipity: {
      page: "serendipity-builder.html",
      fileName: "serendipity-map.md",
      schema: "strange_but_true_travel_oracle.serendipity_map.v1",
      storageKey: "sbtTravelOracleSerendipity",
      title: "Build serendipity-map.md",
      lede: "Map useful surprise, spontaneous openings and the smallest safe yes.",
      markdownTitle: "Serendipity Map",
      titleField: "serendipity_title",
      handoff: "Give this to the Serendipity and Spontaneity Agent before a destination is flattened into logistics.",
      groups: [
        {
          legend: "Openings",
          fields: [
            { name: "serendipity_title", label: "Map title", type: "text", placeholder: "e.g. Japan rail openings, Europe invitation web, India return signals" },
            { name: "invitations", label: "Invitations and openings", type: "textarea", placeholder: "People, places, events, routes, cheap offers, cultural openings, odd chances." },
            { name: "small_yes", label: "Smallest safe yes", type: "textarea", placeholder: "A tiny action that explores the path without overcommitting." },
            { name: "small_no", label: "Smallest respectful no", type: "textarea", placeholder: "A clean refusal, delay or boundary if the opening is not right." }
          ]
        },
        {
          legend: "Spontaneity gates",
          fields: [
            { name: "hard_boundaries", label: "Hard boundaries", type: "textarea", placeholder: "Law, consent, safety, money, privacy, route, health, recovery." },
            { name: "recklessness_test", label: "What would make it reckless?", type: "textarea", placeholder: "Name the point where spontaneity becomes avoidance, exposure or harm." },
            { name: "what_planning_misses", label: "What over-planning might miss", type: "textarea", placeholder: "People, food, music, weather, local rhythm, love, coincidence, rest." },
            { name: "follow_up", label: "Follow-up actions", type: "textarea", placeholder: "Who to message, what to price, what to check, what to leave open." }
          ]
        }
      ]
    },

    relationship: {
      page: "relationship-field-builder.html",
      fileName: "relationship-field.md",
      schema: "strange_but_true_travel_oracle.relationship_field.v1",
      storageKey: "sbtTravelOracleRelationship",
      title: "Build relationship-field.md",
      lede: "Hold romance, intercultural relationships and Global Group Marriages context as a private relational field, not a generic dating checklist.",
      markdownTitle: "Relationship Field",
      titleField: "relationship_title",
      handoff: "Give this to the Romance and Intercultural Relationships Agent. Keep real people private and do not force theory onto lived relationships.",
      groups: [
        {
          legend: "Relational frame",
          fields: [
            { name: "relationship_title", label: "Field title", type: "text", placeholder: "e.g. relational possibilities in a destination, private GGM reflection" },
            { name: "places_cultures", label: "Places, cultures or communities", type: "textarea", placeholder: "Where does this field belong? What cultures, languages or norms may be involved?" },
            { name: "possibilities", label: "Possibilities honestly present", type: "textarea", placeholder: "Romance, friendship, kinship, collaboration, family, marriage thought, or no real possibility yet." },
            { name: "ggm_context", label: "Global Group Marriages / Love U.N. context", type: "textarea", placeholder: "Philosophy, governance, consent, kinship, world-family notes. Keep it private and non-normal." }
          ]
        },
        {
          legend: "Consent, law and care",
          fields: [
            { name: "consent_care", label: "Consent and care notes", type: "textarea", placeholder: "What would make this kind, reciprocal, sovereign and unforced?" },
            { name: "legal_cultural", label: "Legal and cultural checks", type: "textarea", placeholder: "Marriage law, dating norms, gender norms, family expectations, local risks, public/private boundaries." },
            { name: "power_differences", label: "Power differences and vulnerability", type: "textarea", placeholder: "Money, visa status, language, age, culture, travel dependence, loneliness, fame, AI mythology." },
            { name: "privacy_redaction", label: "Privacy and redaction", type: "textarea", placeholder: "What must never go public? What can be abstracted into philosophy without exposing anyone?" }
          ]
        }
      ]
    },

    sharedTable: {
      page: "shared-table-builder.html",
      fileName: "shared-table-field-note.md",
      schema: "strange_but_true_travel_oracle.shared_table_field_note.v1",
      storageKey: "sbtTravelOracleSharedTable",
      title: "Build shared-table-field-note.md",
      lede: "Make food, hospitality and table culture a repeating global lens without flattening local protocol.",
      markdownTitle: "Shared Table Field Note",
      titleField: "table_title",
      handoff: "Give this to the Shared Table and Cultural Context Agent. It should protect cultural protocol, consent and reciprocity.",
      groups: [
        {
          legend: "Table context",
          fields: [
            { name: "table_title", label: "Field note title", type: "text", placeholder: "e.g. shared table possibilities in Istanbul, Kyoto, Goa, Lisbon" },
            { name: "place", label: "Place or route", type: "text", placeholder: "Destination, neighbourhood, host context or route" },
            { name: "hospitality", label: "Hospitality pattern", type: "textarea", placeholder: "How people host, feed, gather, welcome, decline, bless, share or separate." },
            { name: "foods_gatherings", label: "Foods, gatherings or table forms", type: "textarea", placeholder: "Markets, homes, festivals, religious meals, tea, street food, kitchens, farms, cafes." }
          ]
        },
        {
          legend: "Protocol and public boundary",
          fields: [
            { name: "protocols", label: "Cultural protocols", type: "textarea", placeholder: "What must be asked, credited, respected, avoided, paid for, or kept private?" },
            { name: "reciprocity", label: "Reciprocity", type: "textarea", placeholder: "What can Luke offer back without making it extractive?" },
            { name: "public_safe_story", label: "Public-safe story possibility", type: "textarea", placeholder: "What could become a Strange But True reflection later after review?" },
            { name: "private_sensitive", label: "Private or sensitive material", type: "textarea", placeholder: "Homes, hosts, identities, sacred foods, conflict, poverty, vulnerability, exact locations." }
          ]
        }
      ]
    },

    agentBrief: {
      page: "agent-brief-builder.html",
      fileName: "agent-team-brief.md",
      schema: "strange_but_true_travel_oracle.agent_team_brief.v1",
      storageKey: "sbtTravelOracleAgentBrief",
      title: "Build agent-team-brief.md",
      lede: "Create a paste-ready brief for ChatGPT, Codex, Claude or another AI team before they work on the travel oracle.",
      markdownTitle: "Agent Team Brief",
      titleField: "brief_title",
      handoff: "Paste this brief into an AI tool with the relevant exported markdown files. It tells the agent team what to preserve and what not to flatten.",
      groups: [
        {
          legend: "Brief scope",
          fields: [
            { name: "brief_title", label: "Brief title", type: "text", placeholder: "e.g. travel strategy run for Japan shortlist" },
            { name: "task", label: "Task for AI agents", type: "textarea", placeholder: "What should the agent team do with the imported files?" },
            { name: "files_attached", label: "Files attached or pasted", type: "textarea", placeholder: "travel-intake.md, destination-dossier-kyoto.md, signal-log-2026-05-13.md..." },
            { name: "agents_needed", label: "Agents needed", type: "checkboxes", options: agentRoles }
          ]
        },
        {
          legend: "Non-negotiables",
          fields: [
            { name: "tone_rules", label: "Tone and philosophy rules", type: "textarea", placeholder: "Australian English, Strange But True, JRA as compass not sermon, non-normal GGM handling." },
            { name: "privacy_rules", label: "Privacy rules", type: "textarea", placeholder: "Do not expose live location, real people, romance, exact route, money, credentials, or vulnerable details." },
            { name: "insurance_rule", label: "Insurance wording rule", type: "textarea", placeholder: "Only mention insurance where legally, contractually, entry, venue, transport or client-framework required." },
            { name: "output_requested", label: "Output requested", type: "textarea", placeholder: "Dossier update, strategy model run, checklist, questions, next actions, source list, redacted public summary." }
          ]
        }
      ]
    }
  };
})();
