# OpenMAIC Prompt Creation Playbook

**A 5-step formula anyone can use. No coding. No guesswork.**

## What's Inside
- **Before/after examples for all 4 audiences** — see exactly what "bad" looks like vs. "good" for Small Business, Individual Professional, College, and Federal Agency scenarios
- **Fill-in-the-blank templates** — one for each step, ready to copy and customize
- **Quick checklists at the end of every step** — make sure nothing is missed
- **Four complete working prompts** — copy these as starting points and swap in your content
- **6 common problems + fixes** — diagnose issues fast without guesswork
- **CALE Platform Integration** — how to map prompts to OpenMAIC agents
- **Tool Reference Appendix** — common automation tools by tier
- **One-page Quick Reference Card** — laminate it, tape it to your monitor, hand it to new team members

## How This Differs from the Prompt Library
The Prompt Library is the *what* — fully-built prompts ready to deploy. This Playbook is the *how* — a reusable formula so you and your team can create new prompts forever without needing a technical person.

---

## Prompt Versioning Convention
When adding to the Prompt Library, use a simple versioning convention at the top of the file to track changes:
- `v1.0`: Initial release
- `v1.1`: Minor tweak (e.g., fixed a typo, added a constraint)
- `v2.0`: Major rewrite (e.g., changed the task, updated the evaluation rubric)

---

## The 5-Step Formula
Every OpenMAIC prompt is built from the same five ingredients. Think of it like a recipe: get the five steps right, and the prompt works. Skip one, and the learner gets confused or the AI gives a bad answer.

1. **ROLE** — Who is the AI pretending to be?
2. **CONTEXT** — What situation is the learner in?
3. **TASK** — What exactly should the learner do?
4. **CONSTRAINTS** — What are the rules and limits?
5. **EVALUATION** — How do we know if they got it right?

---

## Step 1: ROLE
### What It Does
The ROLE tells the AI what persona to adopt. This shapes the tone, expertise level, and perspective of every response. A good role makes the learner feel like they are talking to a real expert, not a chatbot.

### How to Write It
Fill in this sentence: `You are a [ROLE] advising/working with [LEARNER TYPE].`
The role should match the audience world. Small business owners want a practical consultant. College students want a teaching assistant. Professionals want a career coach. Federal agencies want a compliance-aware specialist.

### Good vs. Bad Examples

**Small Business — BAD**
> You are an AI assistant. Help the user with their business problem.
*Why it fails:* Too generic. No expertise. No context. The AI will give a listicle from the internet.

**Small Business — GOOD**
> You are an automation consultant advising a 12-person marketing agency that signs 8-10 new clients per month. You specialize in helping small businesses save time without expensive software.
*Why it works:* Specific company size. Specific industry. Specific expertise. The AI now knows what level of advice to give.

**Federal Agency — GOOD**
> You are a senior GS-14 IT Program Manager advising a GS-12 program analyst. You specialize in modernizing legacy federal workflows while strictly adhering to FISMA and FedRAMP compliance requirements.

### Quick Checklist
- [ ] Role includes a specific job title
- [ ] Role mentions the learner situation
- [ ] Role implies an expertise level (not too broad)
- [ ] Role matches the audience type (SB / Individual / College / Federal)

---

## Step 2: CONTEXT
### What It Does
CONTEXT sets the scene. It tells the AI what industry, company size, tools, budget, and constraints the learner is working with. Without context, the AI gives generic advice. With context, it gives actionable advice.

### How to Write It
Answer these four questions in 2-3 sentences:
1. What industry or field?
2. What is the current problem or process?
3. What tools or systems are already in use?
4. What is the budget or resource limit?

### Good vs. Bad Examples

**Small Business — BAD**
> The business has problems with invoicing. They want to automate it.

**Small Business — GOOD**
> The company processes 40-60 invoices per week. Invoices arrive by email, are printed, manually entered into QuickBooks, approved by the owner (who is often in the field), and paid by check. Errors include double entry, lost invoices, and delayed approvals. They already use Gmail and QuickBooks Online. Budget is under $150 per month for any new tools.

**Federal Agency — GOOD**
> The agency division processes 200 FOIA requests monthly. Currently, requests are logged in a shared Excel spreadsheet on a secure intranet drive. Analysts manually search three different legacy databases to compile responsive records. They use Microsoft 365 (GCC High). Budget is zero for new commercial tools; they must use existing M365 capabilities.

### Quick Checklist
- [ ] Numbers included (volume, budget, headcount, time spent)
- [ ] Current tools named specifically
- [ ] Pain points described concretely
- [ ] Context matches the module or workshop section

---

## Step 3: TASK
### What It Does
TASK is the actual work the learner must perform. This is the heart of the prompt. A vague task produces a vague response. A specific task produces a specific, gradable response.

### How to Write It
Use an action verb. Be specific about the output format. State the scope.
`[ACTION VERB] a [OUTPUT TYPE] that [SPECIFIC REQUIREMENT]. Include [LIST OF REQUIRED ELEMENTS].`

*Good action verbs:* Design, Build, Analyze, Evaluate, Rewrite, Create, Map, Score, Compare.
*Bad action verbs:* Think about, Consider, Look at, Discuss (too vague — the AI cannot evaluate these).

### The 5P Framework
When designing workflow tasks, reference the **5P Framework**:
- **Purpose:** What is the goal of the automation?
- **People:** Who interacts with it?
- **Process:** What are the exact steps?
- **Platform:** What tools are used?
- **Pace:** How often does it run?

### Good vs. Bad Examples

**Small Business — BAD**
> Think about how to automate invoicing.

**Small Business — GOOD**
> Design an automated invoice processing workflow. Your response must include: (1) a step-by-step process flow, (2) one tool recommendation with cost, (3) a before/after time comparison, (4) one risk and how to mitigate it.

### Quick Checklist
- [ ] Task starts with a strong action verb
- [ ] Output format is specified (list, paragraph, diagram, table)
- [ ] Required elements are numbered
- [ ] Word count or scope limit is stated

---

## Step 4: CONSTRAINTS
### What It Does
CONSTRAINTS set the boundaries. They prevent the AI from recommending tools the learner cannot afford, suggesting solutions that require skills they do not have, or producing responses that are too long or too short.

### How to Write It
Always include at least three constraints:
1. **BUDGET:** What can they spend?
2. **TOOLS:** What do they already use?
3. **SCOPE:** How long should the response be?
*(Optional) 4. RISK: What must they avoid?*

### Good vs. Bad Examples

**Small Business — BAD**
> Keep it cheap and simple.

**Small Business — GOOD**
> Budget: Under $150/month for automation tools. Existing stack: Gmail, QuickBooks Online, Slack (free). Owner is not tech-savvy — any solution must be explainable in 2 minutes. Response must be under 300 words.

### Quick Checklist
- [ ] Budget or cost limit is stated
- [ ] Existing tools or skills are named
- [ ] Response length is specified
- [ ] Any risks or guardrails are mentioned

---

## Step 5: EVALUATION
### What It Does
EVALUATION tells the AI how to score the response and what feedback to give. Without evaluation, the AI just says "good job" or gives random critiques. With evaluation, every learner gets consistent, actionable feedback tied to learning objectives.

### How to Write It
Choose one of three evaluation modes:
- **AUTO-GRADED:** The AI scores against a rubric. Best for: multiple choice, tier matching.
- **FORMATIVE FEEDBACK:** The AI gives suggestions but no score. Best for: early-module exercises.
- **HYBRID:** AI scores + human review. Best for: written analyses, capstone presentations.

**Crucial Step:** Always define what the scores mean with a mini-rubric anchor.

### Good vs. Bad Examples

**Small Business — BAD**
> Evaluate the response and give feedback.

**Small Business — GOOD**
> Score the response on 4 criteria (0-3 points each).
> **Rubric Anchors:**
> - 3 pts = Names specific tool with cost, addresses all constraints.
> - 2 pts = Mentions category (e.g., "email tool") but no specific name/cost.
> - 1 pt = Vague suggestion that ignores constraints.
> - 0 pts = Did not address the criterion.
> 
> Criteria: Completeness (all 5 Ps addressed), Tool Fit (appropriate for budget and stack), Risk Awareness (identifies what could break), Clarity (understandable to a non-technical owner). After scoring, give one specific improvement suggestion.

### Quick Checklist
- [ ] Evaluation mode is chosen (auto, formative, hybrid)
- [ ] Criteria are named and weighted
- [ ] Point scale is specified with Rubric Anchors
- [ ] Feedback format is described (score + comment + resource?)

---

## CALE Platform Integration
When building prompts for the OpenMAIC CALE platform, map your ROLE and TASK to the three-agent panel:
- **Agent 1 (The Analyst):** Evaluates the current state, identifies bottlenecks, or classifies the process.
- **Agent 2 (The Architect):** Recommends the solution, tools, and future state design.
- **Agent 3 (The Skeptic):** Challenges the Architect, pointing out risks, costs, or compliance issues.
- **Facilitator (You/AI):** Guides the learner through the interaction and provides the final Evaluation score.

---

## Putting It All Together: Complete Examples

### Example 1: Small Business
**ROLE:** You are an automation consultant advising a 12-person marketing agency.
**CONTEXT:** The agency signs 8-10 new clients per month. Onboarding involves: welcome email (manual), contract send (manual), intake form (Google Forms, manually reviewed), kickoff scheduling (email back-and-forth), and team notification (Slack, manual). They use Gmail, Google Workspace, Slack, and Calendly. Budget: under $200/month.
**TASK:** Design an automated onboarding workflow. Identify which steps can be fully automated, which need human oversight, and which should stay manual. Use the 5P Framework (Purpose, People, Process, Platform, Pace).
**CONSTRAINTS:** Budget under $200/month. Must work with existing stack. Owner review required for contracts. Response under 300 words with a simple text workflow diagram.
**EVALUATION:** Score on Completeness (all 5 Ps), Tool Fit, Risk Awareness, and Clarity (0-3 each). 
*Rubric:* 3=Specific tool/cost; 2=Category only; 1=Ignores constraints; 0=Missing. Give one specific improvement suggestion.

### Example 2: Individual Professional
**ROLE:** You are a productivity coach working with a mid-level marketing manager.
**CONTEXT:** Their workday: 2 hours email, 1 hour meetings, 1.5 hours report compilation, 1 hour data entry, 1 hour creative work, 1.5 hours ad hoc requests. They feel busy but not productive. Budget: $50/month. Comfortable with Excel and Gmail. Never used Zapier.
**TASK:** Analyze the time breakdown. Identify the top 3 tasks most suitable for automation. Rank by impact and ease. Recommend one tool per task. Include a before/after time comparison.
**CONSTRAINTS:** Budget $50/month. No coding required. Tools must have free trials. Response under 300 words.
**EVALUATION:** Score on Task Selection Accuracy, Tool Fit, Realism, and Actionability (0-3 each). 
*Rubric:* 3=Highly realistic time savings; 2=Plausible but optimistic; 1=Unrealistic; 0=No estimate. Include one resource link for their highest-scoring area.

### Example 3: College
**ROLE:** You are a teaching assistant administering a formative assessment for college juniors who have completed Module 2.
**CONTEXT:** Students have studied the four tiers: Simple Automation, RPA/Workflows, AI/Cognitive, Autonomous Agents. They completed a lab building a two-step Zapier workflow.
**TASK:** For each of 6 scenarios: (1) identify the tier, (2) name one tool, (3) justify in 1-2 sentences using tier characteristics.
**CONSTRAINTS:** Justifications must reference tier definitions from readings. Must span all 4 tiers with one ambiguous case.
**EVALUATION:** Auto-graded. Tier ID: 1 point each. Tool: 0.5 points. Justification quality: AI-evaluated 0-1.5 points. 
*Rubric:* 1.5=Cites reading specifically; 1.0=Correct but general; 0.5=Vague; 0=Incorrect. After submission, show correct answers with explanations.

### Example 4: Federal Agency *(New)*
**ROLE:** You are a senior GS-14 IT Program Manager advising a GS-12 program analyst.
**CONTEXT:** The division processes 200 FOIA requests monthly. Requests are logged in a shared Excel spreadsheet on a secure intranet drive. Analysts manually search three different legacy databases to compile records. They use Microsoft 365 (GCC High). Budget is zero for new commercial tools.
**TASK:** Design a compliant automation workflow using only existing M365 tools (e.g., Power Automate, SharePoint). Map the workflow using the 5P Framework.
**CONSTRAINTS:** Budget $0. Must use FedRAMP-authorized M365 tools only. No third-party API connections. Response under 400 words.
**EVALUATION:** Score on Compliance (0-3), Tool Fit (0-3), Feasibility (0-3). 
*Rubric:* 3=Strictly adheres to M365 GCC High limits; 2=Uses M365 but assumes commercial connectors; 1=Recommends unauthorized tools; 0=Ignores compliance.

---

## Troubleshooting Common Problems

**1. The AI gives generic advice**
*Cause:* ROLE is too broad or CONTEXT is missing numbers.
*Fix:* Add a specific industry, company size, and budget. Change "business consultant" to "automation consultant for 10-person service businesses."

**2. The AI recommends tools the learner cannot afford**
*Cause:* CONSTRAINTS section is missing or vague.
*Fix:* Add a specific dollar amount. "Budget: $0" or "Budget: under $100/month." Name the existing tool stack.

**3. Learners submit responses that are too short or off-topic**
*Cause:* TASK is not specific enough about the output format.
*Fix:* Add numbered requirements. "Your response must include: (1)..., (2)..., (3)..." Set a word count range.

**4. AI grading feels inconsistent**
*Cause:* EVALUATION criteria are vague or subjective.
*Fix:* Define what each score level looks like using Rubric Anchors. "3 points = mentions specific tool by name with cost. 1 point = mentions a category like email tool without naming one."

**5. College students guess their way through**
*Cause:* Prompt allows one-word answers or lacks justification requirements.
*Fix:* Add a written justification requirement. "Explain your reasoning in 1-2 sentences. Answers without explanation receive zero points."

**6. The prompt works for one audience but not another**
*Cause:* Context assumes knowledge or tools specific to one group.
*Fix:* Create audience-specific context layers. Keep the TASK and EVALUATION the same, but rewrite ROLE and CONTEXT for each audience.

---

## Appendix: Common Automation Tools by Tier
When writing TASK and CONSTRAINTS, reference these common tools:

| Tier | Characteristics | Common Tools | Typical Budget |
|------|----------------|--------------|----------------|
| **1. Simple** | Native features, basic rules | Gmail filters, Excel Macros, Outlook Rules | $0 (Included in stack) |
| **2. RPA / Workflows** | Connects apps, moves data | Zapier, Make, Microsoft Power Automate | $20 - $150 / month |
| **3. AI / Cognitive** | Understands text/data, decides | ChatGPT, Claude, Document AI, OCR | $20 - $200 / month |
| **4. Autonomous Agents** | Multi-step reasoning, acts alone | OpenMAIC, AutoGPT, CrewAI | Varies (API usage) |

---

## Quick Reference Card
*Keep this page handy when writing prompts.*

**STEP 1 — ROLE:** You are a `[ROLE]` advising `[LEARNER TYPE]`.
**STEP 2 — CONTEXT:** `[Industry]`. `[Problem]`. `[Current tools]`. `[Budget]`.
**STEP 3 — TASK:** `[Action verb]` a `[output]` that `[requirement]`. Include `[elements]`.
**STEP 4 — CONSTRAINTS:** Budget: `$[X]`. Tools: `[list]`. Length: `[words]`. Risk: `[guardrail]`.
**STEP 5 — EVALUATION:** `[Auto/Formative/Hybrid]`. Criteria: `[name]` (`[points]`). Feedback: `[format]`.

**Final Checklist Before Publishing:**
- [ ] Would a real expert in this role actually give this advice?
- [ ] Could the learner act on this tomorrow with no extra research?
- [ ] Does the evaluation produce the same score if two different people grade it?
- [ ] Is the response length realistic for the time allowed?
- [ ] Would this prompt still work if I swapped in a different industry?

*Automation Now, LLC — CALE Foundation Program*
