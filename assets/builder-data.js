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

  const journeyScale = [
    ["single_opening", "One invitation or occasional adventure"],
    ["short_loop", "Short trip or route loop"],
    ["season", "Seasonal experiment"],
    ["year", "Year of travel and learning"],
    ["multi_year", "Multi-year world path"],
    ["decade_earth", "Decade-long Earth navigation"],
    ["every_country_territory", "Every country and territory ambition"],
    ["spectrum", "Everything in between / still forming"]
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
      title: "Map travel-intake.md",
      lede: "Start by asking how the viewer(s) want to navigate a life of travel before any destination, route or agent gets a vote.",
      markdownTitle: "Self-Sovereign Travel Intake",
      titleField: "working_title",
      handoff: "Give this file to the Intake Agent first. It should preserve the traveller's self-authored compass before later destination, strategy-run, relationship, serendipity and privacy files add detail.",
      groups: [
        {
          legend: "Where you are choosing from",
          fields: [
            { name: "working_title", label: "What is this travel-life map called?", type: "text", placeholder: "e.g. 2026 travel sovereignty reset, first world loop, island-year possibility" },
            { name: "current_base", label: "Where are you choosing from right now?", type: "text", placeholder: "Country, city, home base, temporary base, no fixed base, or unknown" },
            { name: "timeframe", label: "What time horizon feels alive?", type: "text", placeholder: "Next month, this season, next year, 10-year world path, open-ended" },
            { name: "journey_scale", label: "Where on the travel spectrum is this?", type: "select", options: journeyScale, help: "This can be one occasional adventure, every country and territory over a decade, or anything between. The form should scale to the life actually being chosen." },
            { name: "current_energy", label: "What is your body, energy and recovery asking for?", type: "textarea", placeholder: "Capacity, health, rest, overstimulation, courage, fear, appetite, loneliness, resilience, limits." },
            { name: "cashflow", label: "What does money make possible or impossible right now?", type: "textarea", placeholder: "Cash runway, income timing, debt pressure, cheap options, work possibilities, gifts, delays, survival truth." }
          ]
        },
        {
          legend: "Sovereignty, hope and compass",
          fields: [
            { name: "why_now", label: "Why does movement matter now?", type: "textarea", placeholder: "The real motive, hunger, restlessness, need, calling, escape risk, invitation or hope. No polished public version required." },
            { name: "jra_direction", label: "Where might joyful responsible abundance be catalysed?", type: "textarea", placeholder: "What direction feels more alive, generous, grounded or possible without pretending abundance is already solved?" },
            { name: "must_keep", label: "What must stay sovereign or protected?", type: "textarea", placeholder: "Privacy, money, time, health, dignity, consent, family, friendships, creative work, legal status, spiritual autonomy." },
            { name: "focus_lanes", label: "Which life-navigation lanes should this map hold?", type: "checkboxes", options: lanes }
          ]
        },
        {
          legend: "What can be shared, held or transformed",
          fields: [
            { name: "public_safe", label: "What might become public only after review?", type: "textarea", placeholder: "SBT writing, service patterns, music notes, public-safe reflections, cultural observations or useful travel intelligence later." },
            { name: "private_only", label: "What belongs only to you or trusted agents?", type: "textarea", placeholder: "Live location, romance, route, money, contacts, vulnerability, intimate, spiritual, identity or legal details." },
            { name: "agent_questions", label: "What should the AI team ask back before helping?", type: "textarea", placeholder: "Questions that protect sovereignty, clarify relativity, invite serendipity, test assumptions or map next choices." }
          ]
        }
      ]
    },

    destination: {
      page: "dossiers.html",
      fileName: "destination-dossier-{slug}.md",
      schema: "strange_but_true_travel_oracle.destination_dossier.v1",
      storageKey: "sbtTravelOracleDestination",
      title: "Map destination-dossier.md",
      lede: "Explore one place as a possible life field: official friction, lived fit, romance, culture, shared tables, pattern notes and your own desire to be there.",
      markdownTitle: "Destination Life-Field Dossier",
      titleField: "destination_name",
      handoff: "Give this to the Synthesis Agent after specialist agents have added checks. It should help the traveller decide how they want to relate to this place, not treat the place as a product.",
      groups: [
        {
          legend: "Place as possibility",
          fields: [
            { name: "destination_name", label: "What place, route or cultural field is calling attention?", type: "text", placeholder: "City, region, country, island, route, invitation web, cultural field or cluster" },
            { name: "country_region", label: "What broader region or jurisdiction holds it?", type: "text", placeholder: "e.g. Japan / Kansai, India / Goa, Europe rail loop, Pacific islands, Caribbean route" },
            { name: "status", label: "What is your current relationship to this place?", type: "select", options: [["draft", "Just noticing"], ["watch", "Watching"], ["candidate", "Possible"], ["shortlist", "Calling strongly"], ["active_plan", "Actively planning"], ["archive", "Not now / archive"]] },
            { name: "last_checked", label: "When did you last check the reality layer?", type: "date" },
            { name: "evidence_level", label: "What kind of knowing is present so far?", type: "select", options: evidenceLevels }
          ]
        },
        {
          legend: "Rules, friction and practical ground",
          fields: [
            { name: "visa_entry", label: "What entry or movement reality needs checking?", type: "textarea", placeholder: "Visa, stay length, onward ticket, passport, border, island permit or official source uncertainty." },
            { name: "safety_health", label: "What does your body and the official risk layer need to know?", type: "textarea", placeholder: "Official travel advice, health requirements, local risks, recovery needs, climate, medication, energy, rest." },
            { name: "legal_insurance", label: "Insurance only where legally or contractually required", type: "textarea", placeholder: "Only mention entry, visa, venue, transport or client-framework requirements. No peace-of-mind framing." },
            { name: "route_budget", label: "What route, budget and survival path feels possible?", type: "textarea", placeholder: "Flights, trains, buses, accommodation, arrival plan, survival costs, cheap paths, timing, delay options." }
          ]
        },
        {
          legend: "Life field and meaning",
          fields: [
            { name: "serendipity", label: "What serendipity or spontaneous opening is alive here?", type: "textarea", placeholder: "Invitations, cheap routes, local events, chance meetings, timing patterns, smallest safe yes." },
            { name: "relationships", label: "What romance or intercultural relationship field needs respect?", type: "textarea", placeholder: "Consent, law, norms, family, language, privacy, power differences, attraction, real people before theory." },
            { name: "shared_table", label: "What shared-table or hospitality wisdom belongs here?", type: "textarea", placeholder: "Food, hospitality, reciprocity, protocols, hosts, sensitive or sacred material, who already feeds community here." },
            { name: "musicverse", label: "What Musicverse or creative signal is present?", type: "textarea", placeholder: "Songs, field recording ideas, lyric threads, performance, soundscape, silence or reflection possibilities." },
            { name: "sbt_fit", label: "How could Strange But True be useful here without extracting?", type: "textarea", placeholder: "Service, writing, AI help, learning, local usefulness, public-safe output later, or no public output at all." }
          ]
        },
        {
          legend: "Choice gates",
          fields: [
            { name: "risks", label: "What could make this wrong, unsafe, unaffordable, disrespectful or too exposed?", type: "textarea", placeholder: "Name the actual blocker, not a generic travel warning." },
            { name: "open_questions", label: "What questions should stay open?", type: "textarea", placeholder: "Official links to check, people to ask, dates to confirm, facts still missing, feelings not yet understood." },
            { name: "next_actions", label: "What is the next sovereign move?", type: "textarea", placeholder: "Small practical step, pause, message, source check, rest, budget check, invitation test or no-action decision." }
          ]
        }
      ]
    },

    legalBridge: {
      page: "legal-bridge.html",
      fileName: "legal-bridge-{slug}.md",
      schema: "strange_but_true_travel_oracle.legal_bridge.v1",
      storageKey: "sbtTravelOracleLegalBridge",
      title: "Map legal-bridge.md",
      lede: "Turn fine print, rule clues and unknowns into a self-sovereign map between the traveller's home rule layers and the country, island, territory or route being considered.",
      markdownTitle: "Legal Bridge",
      titleField: "map_title",
      handoff: "Give this to the Legal Memory / Travel Law Mapping Agent before a strategy run becomes action. This preserves choice by making rule layers visible; it is legal information preparation only, not legal advice.",
      groups: [
        {
          legend: "Start with one thing",
          fields: [
            { name: "map_title", label: "What is this legal bridge note called?", type: "text", placeholder: "Short title", help: "Example: Queensland to Japan entry bridge; Australia to French Polynesia route check; Pacific island legal nuance map." },
            { name: "focus_subject", label: "What choice, clue or constraint is in front of you?", type: "textarea", placeholder: "Name the rule, clue, invitation or situation.", help: "A visa condition, embassy page, airline rule, invitation, relationship question, work offer, venue condition, border route, permit, device/data concern, or unknown phrase." },
            { name: "fine_print", label: "Paste the fine print, wording, source clue or situation", type: "textarea", placeholder: "Paste exact wording here.", help: "Use direct wording from an official page, airline condition, airport notice, baggage rule, transfer rule, form, email, visa condition, contract, permit, event rule or local source. If there is no source yet, write the situation plainly." },
            { name: "current_understanding", label: "What do you think it means right now?", type: "textarea", placeholder: "Plain first reading.", help: "This can be rough. The point is to show the agent your starting assumption so it can test it instead of guessing." },
            { name: "clarity_wanted", label: "What do you want more clarity or awareness about?", type: "textarea", placeholder: "Questions, fears, unknowns.", help: "Ask for source layers, missing facts, official checks, airline or airport fine print, baggage limits, transfer rules, local custom, consent boundaries, travel action gates or words that need explaining." },
            { name: "first_ai_help", label: "What should the agent help with first?", type: "select", options: [["", "Choose one if useful"], ["not_sure", "Not sure yet"], ["airline_airport_fine_print", "Untangle airline, airport, baggage or transfer fine print"], ["explain_words", "Explain confusing words"], ["find_rule_layers", "Find rule layers"], ["list_missing_facts", "List missing facts"], ["build_source_checklist", "Make a source checklist"], ["compare_home_destination", "Compare home and destination"], ["write_better_questions", "Turn this into better questions"], ["escalate", "Decide who to ask next"]] }
          ]
        },
        {
          legend: "Home and destination rule layers",
          fields: [
            { name: "home_base", label: "What is the traveller's home legal base for this note?", type: "text", placeholder: "Short home base", help: "Usually Australian citizen / Queensland base / local council or community context, but write the real layer for this question." },
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
            { name: "home_rules_follow", label: "Which home rules might follow the traveller overseas?", type: "textarea", placeholder: "Home obligations.", help: "Australian passport duties, tax residency, online conduct, business obligations, evidence duties, privacy, family/legal memory issues, or local Queensland context." },
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
      title: "Map strategy-run.md",
      lede: "Create a dated model of the current travel-life spectrum: one adventure, a route loop, a decade-long Earth journey, every country and territory, or anything in between.",
      markdownTitle: "Travel-Life Strategy Run",
      titleField: "question",
      handoff: "This is not the oracle. It is one structured dataset for modelling mixed preferences, personal values, plans, constraints, strategy, serendipity and what would change the answer.",
      groups: [
        {
          legend: "Life-navigation question",
          fields: [
            { name: "run_date", label: "Run date", type: "date" },
            { name: "question", label: "What life-of-travel question is being modelled?", type: "textarea", placeholder: "A single adventure, a season, a route, a relationship field, a work/recovery pattern, a 10-year country-and-territory path, or something between." },
            { name: "journey_scale", label: "What scale is this strategy run holding?", type: "select", options: journeyScale },
            { name: "candidate_destinations", label: "What places, routes, cultures or territories are candidates?", type: "textarea", placeholder: "One per line, with short notes if helpful. Include countries, territories, islands, route loops, invitations or cultural fields." },
            { name: "decision_band", label: "Current choice band", type: "select", options: decisionBands }
          ]
        },
        {
          legend: "Inputs without flattening the person",
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
          legend: "Catalyst oracle life layers",
          fields: [
            { name: "survival_safety", label: "Survival, safety and sustainability layer", type: "textarea", placeholder: "Cash runway, health, official risk, legal entry, recovery reality, burnout, rest, hard no-go triggers." },
            { name: "love_connection", label: "Love, connection and intercultural learning layer", type: "textarea", placeholder: "Intercultural openness, romance reality, consent, local norms, friendship, kinship, GGM / Love U.N. signal without projecting onto people." },
            { name: "mission_multiplier", label: "Mission, learning and abundance layer", type: "textarea", placeholder: "SBT, Aura, AI, peace, Shared Table, Musicverse, service, learning, empathy, partnership or local usefulness." },
            { name: "lrs_notes", label: "Place-readiness notes", type: "textarea", placeholder: "Accessibility, stability, opportunity, timing, values fit, and what would raise or lower readiness." }
          ]
        },
        {
          legend: "Relative model and change signals",
          fields: [
            { name: "score_summary", label: "Relative model summary", type: "textarea", placeholder: "Plain summary of the preference mix, values, constraints, strategy, serendipity and current weighting." },
            { name: "reason", label: "Why this model feels true for now", type: "textarea", placeholder: "The current strategy in plain English, with uncertainty allowed." },
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
      title: "Map signal-log.md",
      lede: "Record dreams, intuition, coincidences and future-memory style notes as attention signals, not commandments or official evidence.",
      markdownTitle: "Travel Signal Log",
      titleField: "signal_title",
      handoff: "Give this to the Precognition and Planning Agent. It may influence attention and timing, but it must not override official checks, consent, budget, self-sovereignty or safety.",
      groups: [
        {
          legend: "Signal record",
          fields: [
            { name: "signal_title", label: "What signal or pattern is asking for attention?", type: "text", placeholder: "e.g. the table by the sea, repeated blue trains, dream of crossing" },
            { name: "signal_date", label: "Date noticed", type: "date" },
            { name: "signal_type", label: "Signal type", type: "checkboxes", options: [["dream", "Dream"], ["body", "Body signal"], ["coincidence", "Coincidence"], ["repeated_symbol", "Repeated symbol"], ["conversation", "Conversation"], ["creative", "Song / lyric / image"], ["future_memory", "Future-memory style note"]] },
            { name: "related_places", label: "What places, routes, cultures or people might this touch?", type: "textarea", placeholder: "Places, cultures, routes, events or people this might point toward without forcing meaning." }
          ]
        },
        {
          legend: "Interpretation with boundaries",
          fields: [
            { name: "raw_note", label: "What happened before interpretation?", type: "textarea", placeholder: "Write it plainly before interpreting it." },
            { name: "possible_meanings", label: "What meanings are possible?", type: "textarea", placeholder: "Multiple readings. No false certainty. Let relativity stay visible." },
            { name: "practical_check", label: "What reality check does it invite?", type: "textarea", placeholder: "What should be checked in reality because of this signal?" },
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
      title: "Map serendipity-map.md",
      lede: "Map useful surprise, spontaneous openings and the smallest sovereign yes across the travel spectrum.",
      markdownTitle: "Serendipity And Spontaneity Map",
      titleField: "serendipity_title",
      handoff: "Give this to the Serendipity and Spontaneity Agent before a destination, route or decade-scale mission is flattened into logistics.",
      groups: [
        {
          legend: "Openings and invitations",
          fields: [
            { name: "serendipity_title", label: "What is this opening called?", type: "text", placeholder: "e.g. Japan rail openings, Europe invitation web, India return signals" },
            { name: "invitations", label: "What invitations, coincidences or openings are alive?", type: "textarea", placeholder: "People, places, events, routes, cheap offers, cultural openings, odd chances, timing echoes." },
            { name: "small_yes", label: "What is the smallest sovereign yes?", type: "textarea", placeholder: "A tiny action that explores the path without overcommitting or giving away choice." },
            { name: "small_no", label: "What is the smallest respectful no?", type: "textarea", placeholder: "A clean refusal, delay or boundary if the opening is not right." }
          ]
        },
        {
          legend: "Spontaneity gates and relativity",
          fields: [
            { name: "hard_boundaries", label: "What boundaries keep spontaneity sovereign?", type: "textarea", placeholder: "Law, consent, safety, money, privacy, route, health, recovery." },
            { name: "recklessness_test", label: "What would make it reckless?", type: "textarea", placeholder: "Name the point where spontaneity becomes avoidance, exposure or harm." },
            { name: "what_planning_misses", label: "What over-planning might miss", type: "textarea", placeholder: "People, food, music, weather, local rhythm, love, coincidence, rest." },
            { name: "follow_up", label: "What tiny follow-up keeps the door alive?", type: "textarea", placeholder: "Who to message, what to price, what to check, what to leave open, what to let breathe." }
          ]
        }
      ]
    },

    relationship: {
      page: "relationships.html",
      fileName: "relationship-field.md",
      schema: "strange_but_true_travel_oracle.relationship_field.v1",
      storageKey: "sbtTravelOracleRelationship",
      title: "Map relationship-field.md",
      lede: "Hold romance, intercultural relationships and Global Group Marriages context as a self-sovereign relational field, not a generic dating checklist.",
      markdownTitle: "Relationship Field",
      titleField: "relationship_title",
      handoff: "Give this to the Romance and Intercultural Relationships Agent. Keep real people private, keep consent primary, and do not force theory onto lived relationships.",
      groups: [
        {
          legend: "Relational frame",
          fields: [
            { name: "relationship_title", label: "What relational field is being noticed?", type: "text", placeholder: "e.g. relational possibilities in a destination, private GGM reflection" },
            { name: "places_cultures", label: "What places, cultures or communities shape this field?", type: "textarea", placeholder: "Where does this field belong? What cultures, languages or norms may be involved?" },
            { name: "possibilities", label: "What possibilities are honestly present?", type: "textarea", placeholder: "Romance, friendship, kinship, collaboration, family, marriage thought, or no real possibility yet." },
            { name: "ggm_context", label: "Global Group Marriages / Love U.N. context", type: "textarea", placeholder: "Philosophy, governance, consent, kinship, world-family notes. Keep it private and non-normal." }
          ]
        },
        {
          legend: "Consent, law and care",
          fields: [
            { name: "consent_care", label: "What would make this kind, reciprocal, sovereign and unforced?", type: "textarea", placeholder: "Consent, pacing, power, mutual desire, privacy, refusal, context and care." },
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
      title: "Map shared-table-field-note.md",
      lede: "Make food, hospitality and table culture a repeating global lens for empathetic adventure without flattening local protocol.",
      markdownTitle: "Shared Table Field Note",
      titleField: "table_title",
      handoff: "Give this to the Shared Table and Cultural Context Agent. It should protect cultural protocol, consent and reciprocity.",
      groups: [
        {
          legend: "Table context",
          fields: [
            { name: "table_title", label: "What shared-table field is being noticed?", type: "text", placeholder: "e.g. shared table possibilities in Istanbul, Kyoto, Goa, Lisbon" },
            { name: "place", label: "What place, route or host context is involved?", type: "text", placeholder: "Destination, neighbourhood, host context, event, island, route or cultural field" },
            { name: "hospitality", label: "How do people host, feed, welcome or separate here?", type: "textarea", placeholder: "How people host, feed, gather, welcome, decline, bless, share or separate." },
            { name: "foods_gatherings", label: "What foods, gatherings or table forms teach the local rhythm?", type: "textarea", placeholder: "Markets, homes, festivals, religious meals, tea, street food, kitchens, farms, cafes." }
          ]
        },
        {
          legend: "Protocol and public boundary",
          fields: [
            { name: "protocols", label: "Cultural protocols", type: "textarea", placeholder: "What must be asked, credited, respected, avoided, paid for, or kept private?" },
            { name: "reciprocity", label: "What can the traveller offer back without making it extractive?", type: "textarea", placeholder: "Time, help, money, listening, writing, technical support, respect, silence, privacy or simply not taking." },
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
      title: "Map agent-team-brief.md",
      lede: "Create a paste-ready brief so an AI team helps the traveller think, not so the AI team takes over the traveller's life.",
      markdownTitle: "Self-Sovereign Agent Team Brief",
      titleField: "brief_title",
      handoff: "Paste this brief into an AI tool with the relevant exported markdown files. It tells the agent team how to preserve self-sovereignty, values, relativity and serendipity.",
      groups: [
        {
          legend: "Brief scope and traveller authority",
          fields: [
            { name: "brief_title", label: "What should this AI handoff be called?", type: "text", placeholder: "e.g. Japan shortlist as sovereignty check, decade path source audit" },
            { name: "task", label: "What should the AI team help with without taking over?", type: "textarea", placeholder: "Ask better questions, map sources, compare paths, protect values, hold serendipity, find contradictions, propose next checks." },
            { name: "files_attached", label: "Files attached or pasted", type: "textarea", placeholder: "travel-intake.md, destination-dossier-kyoto.md, signal-log-2026-05-13.md..." },
            { name: "agents_needed", label: "Which agents should be invited into the room?", type: "checkboxes", options: agentRoles }
          ]
        },
        {
          legend: "Non-negotiables and values",
          fields: [
            { name: "tone_rules", label: "What tone and philosophy must be preserved?", type: "textarea", placeholder: "Australian English, Strange But True, JRA as compass not sermon, non-normal GGM handling, self-sovereignty." },
            { name: "privacy_rules", label: "What privacy boundaries protect the traveller and real people?", type: "textarea", placeholder: "Do not expose live location, real people, romance, exact route, money, credentials, or vulnerable details." },
            { name: "insurance_rule", label: "Insurance wording rule", type: "textarea", placeholder: "Only mention insurance where legally, contractually, entry, venue, transport or client-framework required." },
            { name: "output_requested", label: "What output would actually help the traveller choose?", type: "textarea", placeholder: "Better questions, next checks, source list, values conflict map, strategy model run, redacted public summary, pause recommendation." }
          ]
        }
      ]
    },

    privacyRedaction: {
      page: "privacy.html",
      fileName: "privacy-redaction-review.md",
      schema: "strange_but_true_travel_oracle.privacy_redaction_review.v1",
      storageKey: "sbtTravelOraclePrivacy",
      title: "Map privacy-redaction-review.md",
      lede: "Review one travel file, page or agent output through self-sovereignty before anything leaves the private workspace.",
      markdownTitle: "Privacy Redaction Review",
      titleField: "review_title",
      handoff: "Give this to the Privacy and Redaction Agent before sharing, publishing, pushing, exporting or pasting sensitive material into another tool.",
      groups: [
        {
          legend: "Review target",
          fields: [
            { name: "review_title", label: "What privacy review is this?", type: "text", placeholder: "e.g. Kyoto dossier redaction pass, relationship field before agent share" },
            { name: "target_file", label: "What file, page or output is being reviewed?", type: "text", placeholder: "Filename, page URL, pasted output, or folder path" },
            { name: "sharing_context", label: "Where might this go and who would gain access?", type: "textarea", placeholder: "Private AI chat, GitHub repo, public site, friend, client, collaborator, archived only." },
            { name: "current_decision", label: "What is the current sharing decision?", type: "select", options: [["private_only", "Private only"], ["agent_only", "Agent only"], ["redact_first", "Redact first"], ["public_safe_after_review", "Public-safe after review"], ["do_not_share", "Do not share"]] }
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
            { name: "keep_private_reason", label: "Why does keeping it private protect sovereignty?", type: "textarea", placeholder: "Plain reason the private boundary matters here." },
            { name: "next_action", label: "What is the next privacy-respecting action?", type: "textarea", placeholder: "Redact, ask permission, split file, keep local only, share with named agent, archive." }
          ]
        }
      ]
    },

    styleReview: {
      page: "style-guide.html",
      fileName: "style-review.md",
      schema: "strange_but_true_travel_oracle.style_review.v1",
      storageKey: "sbtTravelOracleStyleReview",
      title: "Map style-review.md",
      lede: "Create a practical review note for navigation, alignment, wording, builder usability and philosophical fit.",
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
            { name: "main_problem", label: "What is breaking the self-sovereign travel frame?", type: "textarea", placeholder: "Confusing, ugly, wasteful, misaligned, hidden, too standardised, too vague, too preachy or too generic." }
          ]
        },
        {
          legend: "Functional checks",
          fields: [
            { name: "builder_visibility", label: "Builder visibility", type: "textarea", placeholder: "Can the traveller immediately make or download the markdown file? If not, where is it hidden?" },
            { name: "navigation_clarity", label: "Navigation clarity", type: "textarea", placeholder: "Can the viewer tell where they are, go back, and move to the next useful page?" },
            { name: "alignment_spacing", label: "Alignment and spacing", type: "textarea", placeholder: "Which boxes, buttons, panels, headings or controls are off rhythm?" },
            { name: "language_to_cut", label: "What language should be cut or reframed?", type: "textarea", placeholder: "Travel-agent tone, generic advice, vague filler, preachy claims, space-wasting copy, flattened traveller assumptions." }
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
