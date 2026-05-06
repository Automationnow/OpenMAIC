# Prompt 1: The Automation Spectrum Diagnostic

**CALE Module:** Module 1 — The Four-Tier Automation Spectrum  
**Objective:** Help participants distinguish between the four tiers of automation using their own real-world processes.

---

## OpenMAIC Prompt

```
Act as a three-agent panel evaluating business processes. I am a CALE Foundation participant learning the Four-Tier Automation Spectrum. I will describe a manual process from my company. Agent 1 (The Analyst) should evaluate if the process is rule-based or requires cognitive judgment. Agent 2 (The Architect) should recommend which tier of automation (Simple, RPA, AI, or Autonomous Agent) is the best fit and explain why. Agent 3 (The Skeptic) should challenge the recommendation by pointing out potential implementation risks or data maturity gaps. Wait for me to describe my process before beginning the analysis.
```

---

## Agent Roles

| Agent | Role | Responsibility |
|---|---|---|
| Agent 1 | The Analyst | Evaluates whether the process is rule-based or requires cognitive judgment |
| Agent 2 | The Architect | Recommends the appropriate automation tier (Simple, RPA, AI, or Autonomous Agent) |
| Agent 3 | The Skeptic | Challenges the recommendation by identifying implementation risks or data maturity gaps |

---

## Learning Outcomes

- Participants can correctly classify a business process within the Four-Tier Automation Spectrum
- Participants understand the distinction between rule-based automation and cognitive judgment
- Participants can anticipate and articulate implementation risks before committing to an automation strategy

---

## Complete Examples — Putting It All Together

The following three prompt examples are drawn from the **Master OpenMAIC Prompt Creation Playbook** and demonstrate how the five-step framework (ROLE, CONTEXT, TASK, CONSTRAINTS, EVALUATION) is applied across different audience types. Each example is ready for use in CALE tutorial and course creation.

---

### Example 1: Small Business

**ROLE:** You are an automation consultant advising a 12-person marketing agency.

**CONTEXT:** The agency signs 8–10 new clients per month. Onboarding involves: welcome email (manual), contract send (manual), intake form (Google Forms, manually reviewed), kickoff scheduling (email back-and-forth), and team notification (Slack, manual). They use Gmail, Google Workspace, Slack, and Calendly. Budget: under $200/month.

**TASK:** Design an automated onboarding workflow. Identify which steps can be fully automated, which need human oversight, and which should stay manual. Use the 5P Framework: Purpose, People, Process, Platform, Pace.

**CONSTRAINTS:** Budget under $200/month. Must work with existing stack. Owner review required for contracts. Response under 300 words with a simple text workflow diagram.

**EVALUATION:** Score on Completeness (all 5 Ps), Tool Fit, Risk Awareness, and Clarity (0–3 each). Give one specific improvement suggestion.

---

### Example 2: Individual Professional

**ROLE:** You are a productivity coach working with a mid-level marketing manager.

**CONTEXT:** Their workday: 2 hours email, 1 hour meetings, 1.5 hours report compilation, 1 hour data entry, 1 hour creative work, 1.5 hours ad hoc requests. They feel busy but not productive. Budget: $50/month. Comfortable with Excel and Gmail. Never used Zapier.

**TASK:** Analyze the time breakdown. Identify the top 3 tasks most suitable for automation. Rank by impact and ease. Recommend one tool per task. Include a before/after time comparison.

**CONSTRAINTS:** Budget $50/month. No coding required. Tools must have free trials. Response under 300 words.

**EVALUATION:** Score on Task Selection Accuracy, Tool Fit, Realism, and Actionability (0–3 each). Include one resource link for their highest-scoring area.

---

### Example 3: College

**ROLE:** You are a teaching assistant administering a formative assessment for college juniors who have completed Module 2.

**CONTEXT:** Students have studied the four tiers: Simple Automation, RPA/Workflows, AI/Cognitive, Autonomous Agents. They completed a lab building a two-step Zapier workflow.

**TASK:** For each of 6 scenarios: (1) identify the tier, (2) name one tool, (3) justify in 1–2 sentences using tier characteristics.

**CONSTRAINTS:** Justifications must reference tier definitions from readings. Must span all 4 tiers with one ambiguous case.

**EVALUATION:** Auto-graded. Tier ID: 1 point each. Tool: 0.5 points. Justification quality: AI-evaluated 0–1.5 points. After submission, show correct answers with explanations.

---

## Prompt Construction Reference

Use the five-step framework below when creating new CALE prompts for any audience:

| Step | Template |
|------|----------|
| **ROLE** | You are a `[ROLE]` advising `[LEARNER TYPE]`. |
| **CONTEXT** | `[Industry]`. `[Problem]`. `[Current tools]`. `[Budget]`. |
| **TASK** | `[Action verb]` a `[output]` that `[requirement]`. Include `[elements]`. |
| **CONSTRAINTS** | Budget: `$[X]`. Tools: `[list]`. Length: `[words]`. Risk: `[guardrail]`. |
| **EVALUATION** | `[Auto/Formative/Hybrid]`. Criteria: `[name]` (`[points]`). Feedback: `[format]`. |

---

*Automation Now, LLC — CALE Foundation Program*  
*Prompt examples sourced from the Master OpenMAIC Prompt Creation Playbook*
