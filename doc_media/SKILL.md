---
name: "vibe-coding"
description: "Guides AI-assisted product coding with upfront planning, modular MVP iteration, safety rules, and debugging discipline. Invoke for new app/project development."
---

# Vibe Coding

Use this skill when helping with AI-assisted development of a new product, feature, app, website, internal tool, or coding project where scope, architecture, implementation steps, quality gates, and debugging discipline matter.

## Core Principle

Do not rush into code. First define the blueprint, foundation, and working rules. During implementation, use small verifiable slices, keep modules clean, preserve context, protect secrets, and debug with evidence.

## Before Coding: 9 Preparation Steps

### Phase 1: Define The Blueprint

1. Clarify requirements.
   - Identify the user pain point, target users, usage scenarios, and core features.
   - Ask for missing requirements before implementation if the goal is ambiguous.

2. Create the PRD and acceptance criteria.
   - Turn requirements into a clear PRD or implementation brief.
   - Define acceptance criteria for each feature with observable behavior.
   - Avoid vague criteria such as "login succeeds"; specify where the user lands, what state changes, and what error message appears on failure.

3. Decide visual direction and page structure early.
   - Ask for 2-3 reference sites, or propose several visual styles for the user to choose from.
   - Confirm navigation, layout, and overall tone before building UI-heavy work.
   - Avoid repeatedly rebuilding the UI because design decisions were left open.

### Phase 2: Build The Foundation

4. Define project boundaries and non-functional requirements.
   - Clarify whether the project is private/internal or public-facing.
   - Check whether it handles user data, payment, privacy, compliance, or authentication.
   - Clarify performance, cost, and hosting constraints when relevant.

5. Lock the technical stack.
   - Prefer verifiable, mature, well-documented technologies over trendy choices.
   - Choose tools that have strong community resources and predictable AI support.
   - Optimize for stability, maintainability, and ease of testing.

6. Draft a lightweight architecture.
   - Produce directory structure, layers, core modules, and initial data models.
   - Treat the architecture as an evolving draft, not a rigid constitution.
   - Record important architecture changes and why they were made.

### Phase 3: Set The Rules

7. Persist global project context.
   - Keep three markdown files in the project root when appropriate: PRD, architecture, and current status.
   - Update these files after major requirement, architecture, or implementation changes.
   - Use them as the AI's stable global context so future work does not rely on stale assumptions.

8. Define development standards and references.
   - Establish coding rules such as TypeScript usage, component naming, folder conventions, and style rules.
   - Create a `reference` folder for approved examples of buttons, forms, dialogs, layouts, or API patterns.
   - Reuse known-good patterns instead of inventing every component from scratch.

9. Set up Git and quality gates before the first implementation slice.
   - Initialize the repository and main branch if needed.
   - Configure linting, formatting, and relevant tests.
   - Ensure each implementation slice can be checked before committing.

## During Coding: 5 Key Rules

### 1. Use Small MVP Iterations

- Do not ask AI to generate the whole product at once.
- Implement one complete, verifiable slice at a time.
- Example slices: page opens, form submits, server saves data, permission check works, list displays saved records.
- After each slice, run relevant checks, fix issues, and commit when the work is stable.

### 2. Split Modules Proactively

- Never allow large unrelated functionality to accumulate in one file.
- Break large features into independent modules, components, services, hooks, utilities, and data-access layers as appropriate.
- Prefer maintainable boundaries over one-shot code generation.

### 3. Manage Context With Status Summaries

- Before changing code, summarize the relevant context: latest requirement changes, affected files, related code paths, and current constraints.
- Follow the smallest-change principle.
- Modify only the minimum relevant code and avoid unrelated changes to logic, UI, behavior, or features.

### 4. Protect Safety Boundaries

- Never put API keys, database passwords, user secrets, service credentials, or private tokens in frontend code.
- Keep secrets in environment variables or secure server-side configuration.
- Review data privacy, authentication, authorization, and payment-related flows carefully.

### 5. Debug Scientifically

- If a fix fails twice without new evidence, stop guessing.
- Create a minimal reproduction with the smallest input that shows the problem.
- Add logs, breakpoints, or targeted diagnostics to inspect key variables and branches.
- Add a small test to lock the current behavior when helpful.
- Fix based on evidence. If needed, return to the last stable Git state after confirming with the user.

## Operating Checklist

Before starting implementation, verify:

- Requirements, users, scenarios, and core features are clear.
- PRD or implementation brief has concrete acceptance criteria.
- Visual style and page layout are decided or explicitly deferred.
- Project boundaries, data sensitivity, compliance, performance, and cost constraints are known.
- Technical stack is mature, testable, and appropriate.
- Architecture draft covers directories, layers, modules, and data models.
- Project context documents exist or are intentionally skipped for a small task.
- Development conventions and reference examples are available when useful.
- Git, linting, formatting, and tests are ready enough for iterative work.

During implementation, enforce:

- One verifiable slice at a time.
- Modular code boundaries.
- Status summaries before meaningful changes.
- No unrelated edits.
- No secrets in client code.
- Evidence-based debugging after repeated failures.

## Suggested Response Pattern

When this skill is invoked, respond with:

1. A concise understanding of the product or feature goal.
2. Missing questions only if they block safe progress.
3. A short preparation checklist tailored to the project.
4. A phased MVP plan with verifiable slices.
5. The first implementation step and quality gate.

## Example Prompt To Use With AI

```text
We are building <project>. Before coding, create a concise PRD with acceptance criteria, propose the technical stack, draft the architecture, and define the first MVP slice. Follow small-step iteration, modular design, context summaries, secret-safety rules, and evidence-based debugging.
```
