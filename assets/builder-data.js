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
    ["legal_bridge", "Legal Memory and Travel Law Mapping Agent"],
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
      page: "dossiers.html",
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

    legalBridge: {
      page: "legal-bridge.html",
      fileName: "legal-bridge-{slug}.md",
      schema: "strange_but_true_travel_oracle.legal_bridge.v1",
      storageKey: "sbtTravelOracleLegalBridge",
      title: "Build legal-bridge.md",
      lede: "Turn fine print, rule clues and unknowns into an agent-ready map between Luke's home rule layers and the country, island or territory being considered.",
      markdownTitle: "Legal Bridge",
      titleField: "map_title",
      handoff: "Give this to the Legal Memory / Travel Law Mapping Agent before a strategy run becomes action. This is legal information preparation only, not legal advice.",
      groups: [
        {
          legend: "Start with one thing",
          fields: [
            { name: "map_title", label: "What is this legal bridge note called?", type: "text", placeholder: "Short title", help: "Example: Queensland to Japan entry bridge; Australia to French Polynesia route check; Pacific island legal nuance map." },
            { name: "focus_subject", label: "What exact thing is in front of you?", type: "textarea", placeholder: "Name the rule, clue or situation.", help: "A visa condition, embassy page, airline rule, invitation, relationship question, work offer, venue condition, border route, permit, device/data concern, or unknown phrase." },
            { name: "fine_print", label: "Paste the fine print, wording, source clue or situation", type: "textarea", placeholder: "Paste exact wording here.", help: "Use direct wording from an official page, airline condition, airport notice, baggage rule, transfer rule, form, email, visa condition, contract, permit, event rule or local source. If there is no source yet, write the situation plainly." },
            { name: "current_understanding", label: "What do you think it means right now?", type: "textarea", placeholder: "Plain first reading.", help: "This can be rough. The point is to show the agent your starting assumption so it can test it instead of guessing." },
            { name: "clarity_wanted", label: "What do you want more clarity or awareness about?", type: "textarea", placeholder: "Questions, fears, unknowns.", help: "Ask for source layers, missing facts, official checks, airline or airport fine print, baggage limits, transfer rules, local custom, consent boundaries, travel action gates or words that need explaining." },
            { name: "first_ai_help", label: "What should the agent help with first?", type: "select", options: [["", "Choose one if useful"], ["not_sure", "Not sure yet"], ["airline_airport_fine_print", "Untangle airline, airport, baggage or transfer fine print"], ["explain_words", "Explain confusing words"], ["find_rule_layers", "Find rule layers"], ["list_missing_facts", "List missing facts"], ["build_source_checklist", "Build source checklist"], ["compare_home_destination", "Compare home and destination"], ["write_better_questions", "Turn this into better questions"], ["escalate", "Decide who to ask next"]] }
          ]
        },
        {
          legend: "Home and destination rule layers",
          fields: [
            { name: "home_base", label: "What is Luke's home legal base for this note?", type: "text", placeholder: "Short home base", help: "Usually Australian citizen / Queensland base / local council or community context, but write the real layer for this question." },
            { name: "home_layers", label: "Which local tri-jurisdictional layers might matter?", type: "textarea", placeholder: "Australia, Queensland, local.", help: "Think Commonwealth / Australia, Queensland, council or local community. Add any Legal Memory Workbench files that should follow the travel note." },
            { name: "target_place", label: "Which country, island, territory or route is being checked?", type: "text", placeholder: "Destination or route", help: "Name the place as specifically as possible, including island group, overseas territory, disputed region, cruise stop, border crossing, or route cluster if relevant." },
            { name: "target_status", label: "Target status", type: "select", options: [["country", "Country"], ["island_or_territory", "Island or territory"], ["overseas_territory", "Overseas territory"], ["disputed_or_partial", "Disputed or partially recognised"], ["regional_route", "Regional route"], ["unknown", "Unknown"]] },
            { name: "route_places", label: "What route places or crossings could pull in extra rules?", type: "textarea", placeholder: "Transit, airports, borders.", help: "Airports, airline transfers, self-transfer gaps, ferries, disputed borders, stopovers, overseas territories, local provinces, special zones, islands, or visa-run paths can all change the legal map." },
            { name: "travel_role", label: "Which roles might you be travelling under?", type: "checkboxes", options: [["tourist", "Tourist"], ["business", "Business"], ["remote_work", "Remote work"], ["research", "Research"], ["artist_writer", "Artist / writer"], ["speaker", "Speaker"], ["volunteer", "Volunteer"], ["relationship", "Relationship / courtship / family"], ["shared_table", "Shared Table"], ["ai_blockchain", "AI / blockchain"], ["spiritual_cultural", "Spiritual / cultural learning"], ["other", "Other"]], help: "Do not assume one role. A trip can blend tourism, writing, relationship, research, business, cultural learning and public story layers." }
          ]
        },
        {
          legend: "Rule surfaces to scan",
          fields: [
            { name: "rule_surfaces", label: "Where could rules, permissions or local limits appear?", type: "checkboxes", options: [["entry_stay", "Entry, stay and exit"], ["airline_airport", "Airline and airport rules"], ["baggage_security", "Baggage, liquids and security"], ["transfer_stopover", "Transfers, stopovers and self-transfer"], ["border_movement", "Borders, islands and restricted regions"], ["work_business_money", "Work, business, money and tax"], ["remote_work", "Remote work and online income"], ["romance_family", "Romance, marriage and family"], ["consent_power", "Consent, age, power and vulnerability"], ["speech_media", "Speech, media and reputation"], ["photography_filming", "Photography, filming and sacred sites"], ["data_devices_ai", "Data, devices, AI and encryption"], ["crypto_blockchain", "Crypto, blockchain and tokens"], ["health_medicine", "Health, medicine and prescriptions"], ["customs_biosecurity", "Customs and biosecurity"], ["transport_driving", "Transport, driving and boats"], ["accommodation_tenancy", "Accommodation and tenancy"], ["insurance_compliance", "Insurance compliance only"], ["police_embassy", "Police, embassy or emergency path"], ["other", "Other"]], help: "Tick broad surfaces first. The agent can split them into official sources, airline/airport conditions, local custom, contract terms, venue rules and human-risk notes later." },
            { name: "entry_stay", label: "What entry, stay, exit or movement wording needs checking?", type: "textarea", placeholder: "Visa and border notes.", help: "Visa-free days, onward ticket, registration, passport validity, exit fees, border crossings, restricted regions, local permits, island permits, airport transit rules or special administrative zones." },
            { name: "airline_airport_fine_print", label: "What airport, airline, baggage or transfer fine print could catch you out?", type: "textarea", placeholder: "Airport and airline fine print.", help: "Baggage weight and dimensions, carry-on/personal-item limits, liquids, batteries, medicines, musical or tech gear, checked-bag transfer rules, self-transfer risk, minimum connection times, airport changes, overnight transits, denied-boarding clauses, no-show rules, fare class rules, name/passport matching, refunds, rebooking, missed connections and airline-specific conditions." },
            { name: "relationships_family", label: "What romance, intercultural relationship, family or GGM-adjacent questions need respect?", type: "textarea", placeholder: "Real people private.", help: "Consent, age, family expectations, public affection, local gender norms, marriage rules, non-standard relationship assumptions, power differences and privacy. Do not force theory onto people." },
            { name: "work_business_money", label: "What work, business, money or tax clues are involved?", type: "textarea", placeholder: "Work/income clues.", help: "Business meetings, paid work, remote work, speaking, grants, gifts, fundraising, crypto, banking, customs, income timing or Australian tax residency questions." },
            { name: "data_ai_crypto", label: "What data, device, AI or blockchain issues might be present?", type: "textarea", placeholder: "Device/data clues.", help: "Device searches, encryption, drones, biometrics, AI demos, datasets, privacy law, online conduct, crypto/token restrictions or public claims." },
            { name: "insurance_compliance", label: "Does insurance appear only as a legal or contractual requirement?", type: "textarea", placeholder: "Compliance only.", help: "Only record entry, visa, venue, transport, client, event, contract or law requirements. No peace-of-mind framing, no market-economics sermon." },
            { name: "plain_uncertainty_notes", label: "What feels uncertain in plain English?", type: "textarea", placeholder: "Write the friction.", help: "What could go wrong, what feels ambiguous, what you are tempted to assume, or what should be paused until the source trail is stronger." }
          ]
        },
        {
          legend: "Source trail and clue quality",
          fields: [
            { name: "official_sources", label: "Which official sources have you already found or need to check?", type: "textarea", placeholder: "Official source trail.", help: "Embassy, consulate, immigration, police, customs, tax, health, court, tribunal, regulator, local government, airline baggage page, airline fare rules, airport transit page, ferry, venue, or Smartraveller-style source." },
            { name: "source_confidence", label: "How confident are you that the source trail is official enough?", type: "select", options: [["not_checked", "Not checked yet"], ["official_found", "Official source found"], ["mixed_sources", "Mixed official and secondary sources"], ["secondary_only", "Secondary explainers only"], ["unknown", "Unknown source quality"], ["outdated", "May be outdated"]] },
            { name: "date_checked", label: "Date the source trail was checked", type: "date", help: "Rules drift. This date tells the agent whether the source trail is stale before the trip becomes action." },
            { name: "agencies_to_search", label: "Which agencies, regulators or departments should be searched next?", type: "textarea", placeholder: "Search targets.", help: "If you do not know the agency name, write the topic and place. Example: immigration office, local police, island council, health ministry, tax office, embassy, tourism board." },
            { name: "help_paths", label: "What help, complaint, review or escalation paths are visible?", type: "textarea", placeholder: "Help paths.", help: "Embassy contact, regulator help page, tribunal, ombudsman, legal aid, official enquiry form, local lawyer, community organisation, host, hotel, airline or event organiser." },
            { name: "unknown_words", label: "Which words, rule names or agencies do you not understand yet?", type: "textarea", placeholder: "Exact confusing words.", help: "Copy the words exactly as found. The agent should explain them before it builds strategy around them." }
          ]
        },
        {
          legend: "Home and destination comparison",
          fields: [
            { name: "home_rules_follow", label: "Which home rules might follow Luke overseas?", type: "textarea", placeholder: "Home obligations.", help: "Australian passport duties, tax residency, online conduct, business obligations, evidence duties, privacy, family/legal memory issues, or local Queensland context." },
            { name: "destination_overrides", label: "Which destination rules might override Australian assumptions?", type: "textarea", placeholder: "Local overrides.", help: "Local law, custom, police power, visa condition, contract, platform rule, venue rule, sacred-site protocol, family expectation, or public/private boundary." },
            { name: "shared_table_cultural_rules", label: "What Shared Table or cultural-host rules could matter?", type: "textarea", placeholder: "Hospitality and protocol.", help: "Food, gifts, hosts, reciprocity, alcohol, religious boundaries, gendered spaces, ceremonial rules, family tables, guest duties and what should never become public content." },
            { name: "conflict_points", label: "Where could the home and destination layers clash?", type: "textarea", placeholder: "Friction points.", help: "A thing may be legal at home and awkward, illegal or unsafe elsewhere. Or local custom may expect behaviour that conflicts with your privacy, consent, money or ethics." },
            { name: "what_not_to_do", label: "What should not happen until this is checked?", type: "textarea", placeholder: "Pause list.", help: "Actions, posts, claims, relationship moves, business moves, border crossings, bookings, baggage purchases, airport transfers, payments, documents, public story threads or AI outputs that should wait." }
          ]
        },
        {
          legend: "Agent handoff",
          fields: [
            { name: "legal_status", label: "Current legal-readiness band", type: "select", options: [["info_only", "Information only"], ["needs_source_check", "Needs official source check"], ["ask_embassy", "Ask embassy / consulate"], ["ask_local_lawyer", "Ask local lawyer or clinic"], ["do_not_act", "Do not act yet"], ["cleared_for_strategy", "Cleared for strategy run"]] },
            { name: "legal_memory_links", label: "Which Legal Memory Workbench files or notes should be imported?", type: "textarea", placeholder: "Workbench files.", help: "jurisdiction-map.md, legal-sources.md, risk-map.md, evidence-checklist.md, agent-instructions.md, or specific local legal-memory notes." },
            { name: "next_questions", label: "What exact questions should agents answer next?", type: "textarea", placeholder: "Question list.", help: "Write concrete questions for an AI agent first. High-risk or unclear questions can then be escalated to an official source, embassy, consulate, lawyer or local help path." },
            { name: "escalation_rule", label: "When must this stop being an AI-only question?", type: "textarea", placeholder: "Escalation trigger.", help: "Examples: before applying for a visa, before earning money, before crossing a border, before publishing personal material, before relationship commitment, before signing anything, before medical or legal exposure." }
          ]
        }
      ]
    },

    strategyRun: {
      page: "planning.html",
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
            { name: "legal_bridge_output", label: "Legal bridge output", type: "textarea", placeholder: "Home/destination rule-layer notes, legal-readiness band, official sources still needed, actions paused until checked." },
            { name: "serendipity_output", label: "Serendipity and spontaneity output", type: "textarea", placeholder: "Useful surprise, invitations, cheap paths, chance openings, smallest safe yes." },
            { name: "relationship_output", label: "Romance and intercultural relationship output", type: "textarea", placeholder: "Relational possibilities, consent, law, local norms, privacy, power differences." },
            { name: "shared_table_output", label: "Shared Table output", type: "textarea", placeholder: "Hospitality, food, reciprocity, cultural protocols, public/private story boundaries." },
            { name: "pattern_output", label: "Pattern and precognition output", type: "textarea", placeholder: "Dreams, repeated symbols, intuitive signals, pre-mortems, kept separate from evidence." }
          ]
        },
        {
          legend: "Catalyst oracle layers",
          fields: [
            { name: "survival_safety", label: "Survival and safety layer", type: "textarea", placeholder: "Cash runway, health, Smartraveller-style risk, legal entry, recovery reality, hard no-go triggers." },
            { name: "love_connection", label: "Love and connection layer", type: "textarea", placeholder: "Intercultural openness, romance reality, consent, local norms, GGM / Love U.N. signal without projecting onto people." },
            { name: "mission_multiplier", label: "Mission multiplier layer", type: "textarea", placeholder: "SBT, Aura, AI, peace, Shared Table, Musicverse, service, learning or partnership opportunities." },
            { name: "lrs_notes", label: "Location Readiness Score notes", type: "textarea", placeholder: "Accessibility, stability, opportunity, and what would raise or lower the readiness score." }
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
      page: "serendipity.html",
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
      page: "relationships.html",
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
      page: "shared-table.html",
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
      page: "agents.html",
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
    },

    privacyRedaction: {
      page: "privacy.html",
      fileName: "privacy-redaction-review.md",
      schema: "strange_but_true_travel_oracle.privacy_redaction_review.v1",
      storageKey: "sbtTravelOraclePrivacy",
      title: "Build privacy-redaction-review.md",
      lede: "Review one travel file, page or agent output before anything leaves the private workspace.",
      markdownTitle: "Privacy Redaction Review",
      titleField: "review_title",
      handoff: "Give this to the Privacy and Redaction Agent before sharing, publishing, pushing, exporting or pasting sensitive material into another tool.",
      groups: [
        {
          legend: "Review target",
          fields: [
            { name: "review_title", label: "Review title", type: "text", placeholder: "e.g. Kyoto dossier redaction pass, relationship field before agent share" },
            { name: "target_file", label: "File, page or output being reviewed", type: "text", placeholder: "Filename, page URL, pasted output, or folder path" },
            { name: "sharing_context", label: "Where might this go?", type: "textarea", placeholder: "Private AI chat, GitHub repo, public site, friend, client, collaborator, archived only." },
            { name: "current_decision", label: "Current sharing decision", type: "select", options: [["private_only", "Private only"], ["agent_only", "Agent only"], ["redact_first", "Redact first"], ["public_safe_after_review", "Public-safe after review"], ["do_not_share", "Do not share"]] }
          ]
        },
        {
          legend: "Sensitive material",
          fields: [
            { name: "identity_access", label: "Identity, credentials or access risks", type: "textarea", placeholder: "Passport, account, payment, recovery, booking, exact address, active route, or other access material." },
            { name: "live_movement", label: "Live location or movement risks", type: "textarea", placeholder: "Current location, dates, accommodation, travel timing, transport, routes, vulnerabilities." },
            { name: "relationships", label: "Relationship and real-person privacy", type: "textarea", placeholder: "Names, attraction, romance, intimacy, GGM reflections, power differences, private contacts." },
            { name: "financial_vulnerability", label: "Money and vulnerability", type: "textarea", placeholder: "Debt, cashflow, health, family, recovery, loneliness, dependency, conflict, legal status." }
          ]
        },
        {
          legend: "Redaction action",
          fields: [
            { name: "remove", label: "Remove completely", type: "textarea", placeholder: "Lines, fields, names, links, places or claims that should not leave private context." },
            { name: "generalise", label: "Generalise or abstract", type: "textarea", placeholder: "What can become public-safe philosophy, pattern, style, or non-identifying context?" },
            { name: "keep_private_reason", label: "Why keep it private?", type: "textarea", placeholder: "Plain reason the private boundary matters here." },
            { name: "next_action", label: "Next action", type: "textarea", placeholder: "Redact, ask permission, split file, keep local only, share with named agent, archive." }
          ]
        }
      ]
    },

    styleReview: {
      page: "style-guide.html",
      fileName: "style-review.md",
      schema: "strange_but_true_travel_oracle.style_review.v1",
      storageKey: "sbtTravelOracleStyleReview",
      title: "Build style-review.md",
      lede: "Create a practical review note for navigation, alignment, wording and builder usability.",
      markdownTitle: "Style Review",
      titleField: "review_title",
      handoff: "Give this to Codex or another implementation agent when the site feels confusing, wasteful, misaligned or too generic.",
      groups: [
        {
          legend: "Surface being reviewed",
          fields: [
            { name: "review_title", label: "Review title", type: "text", placeholder: "e.g. travel oracle navigation cleanup" },
            { name: "page_or_component", label: "Page or component", type: "text", placeholder: "Home, builders, planning page, relationship builder, nav, mobile layout" },
            { name: "screen_size", label: "Screen size or device", type: "text", placeholder: "Desktop, laptop, mobile, browser screenshot size" },
            { name: "main_problem", label: "Main problem", type: "textarea", placeholder: "What is confusing, ugly, wasteful, misaligned, hidden, too vague, or too generic?" }
          ]
        },
        {
          legend: "Functional checks",
          fields: [
            { name: "builder_visibility", label: "Builder visibility", type: "textarea", placeholder: "Can the user immediately make or download the markdown file? If not, where is it hidden?" },
            { name: "navigation_clarity", label: "Navigation clarity", type: "textarea", placeholder: "Can the user tell where they are, go back, and move to the next useful page?" },
            { name: "alignment_spacing", label: "Alignment and spacing", type: "textarea", placeholder: "Which boxes, buttons, panels, headings or controls are off rhythm?" },
            { name: "language_to_cut", label: "Language to cut", type: "textarea", placeholder: "Non-functional, vague, preachy or space-wasting text to remove." }
          ]
        },
        {
          legend: "Fix request",
          fields: [
            { name: "desired_change", label: "Desired change", type: "textarea", placeholder: "What should the page do instead?" },
            { name: "keep", label: "Keep intact", type: "textarea", placeholder: "Tone, private boundary, SBT style, Australian English, specific concepts, links." },
            { name: "proof_needed", label: "Proof needed", type: "textarea", placeholder: "Screenshot, browser check, mobile check, export test, git push verification." }
          ]
        }
      ]
    }
  };
})();
