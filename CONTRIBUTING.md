# Contributing

Thanks for considering contributing to the Claude Code Career Agent! This project gets better as more people build on it — new job sources, smarter skills, better workflows.

## Ways to Contribute

### New Job Sources

Add places where the agent can find opportunities. There are several ways to do this:

- **Chrome source instructions** — Teach the agent to navigate and extract listings from a job board using browser automation. This is just adding instructions to `config/search.md` describing how to navigate the site and what to extract.
- **Scrapers** — Write a Node.js module for a job board API or RSS feed. Scrapers live in `scripts/scrapers/`, export a `fetch(options)` function, and return jobs in the standard schema (see `scripts/scrapers/lib/types.js`). Make sure you comply with the platform's Terms of Service.
- **New strategies** — Not all job opportunities come from job boards. Company career pages, GitHub repos, Slack/Discord communities, newsletters, conference job boards — if you've found a way to surface opportunities that others could use, contribute it.

### New Skills

Skills are markdown instruction files in `.claude/skills/`. If you've built a workflow that helps your job search — interview prep, networking outreach, salary research, application follow-ups — it can become a skill others can use.

A skill is a `SKILL.md` file that describes a workflow step by step. Claude Code reads it and follows the instructions. No code required (though skills can reference scripts when needed).

### Improvements to Existing Components

Bug fixes, better evaluation logic, resume template improvements, pipeline optimizations — all welcome. If you've been using the system and found something that could work better, chances are others hit the same thing.

### Documentation

Better examples, clearer setup instructions, usage guides, translations.

## How to Contribute

1. **Fork** the repo and create a branch for your change
2. **Make your changes** — keep them focused on one thing
3. **Test locally** — make sure your change works with the existing pipeline
4. **Open a PR** with a clear description of what you're adding and why

## Guidelines

- **No personal data** — Double-check that your contribution doesn't include names, contact info, API keys, or anything from your `profile/`, `config/`, or `Applications/` directories. These are all gitignored, but be careful with copy-paste.
- **Keep it modular** — New scrapers, skills, and agents should work independently. Don't create dependencies between unrelated components.
- **Match existing patterns** — Look at how existing scrapers, skills, and agents are structured and follow the same conventions.
- **Standard job schema** — Scrapers must output jobs using `makeJob()` from `scripts/scrapers/lib/types.js`. This keeps the merge pipeline working.

## Questions?

Open an issue if you're unsure whether something would be a good contribution, or if you need help getting started.
