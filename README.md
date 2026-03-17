# Claude Code Career Agent

An AI career agent that lives in your terminal. Built on [Claude Code](https://docs.anthropic.com/en/docs/claude-code), it combines deep knowledge of your professional background with a modular set of tools to help you find, evaluate, and apply to jobs — or just think through your next career move.

You build a profile through conversation. The agent learns your experience, skills, preferences, and goals. From there, every capability it has is grounded in who you actually are — not keyword matching, not generic templates.

## What You Can Do

### Evaluate Jobs Intelligently

Give the agent a job posting URL (or a batch of them) and it will tell you whether each one is a real fit — based on your actual skills, experience level, career goals, and preferences. It reads the full job description, weighs requirements flexibility, considers visa implications, and flags things worth discussing.

```
Here, check this out: https://example.com/jobs/senior-devops-engineer
```

```
I found these 5 jobs, scan them for me:
https://...
https://...
```

This is the `/scan-jobs` skill — usable standalone anytime, and also the core of the automated pipeline.

### Build and Customize Resumes

The agent maintains your base resume(s) as structured data and generates tailored versions for specific roles. It knows which of your experiences to emphasize, how to frame your skills for the role, and renders a polished PDF.

```
/customize-resume
```

You can iterate on the draft through conversation — adjust emphasis, reword bullets, change what's highlighted — until it's right.

### Apply to Jobs in Bulk

Found 10 relevant jobs? The agent can process them all autonomously — customizing a resume for each, generating PDFs, and sending the drafts to your WhatsApp for review. You wake up to a set of ready-to-submit applications.

```
/quick-apply
```

### Fetch Jobs from Multiple Sources

The agent can pull job listings from LinkedIn (via browser automation), WhatsApp groups, RSS feeds, job board APIs, and any Chrome-accessible job site. Sources are modular — use what's relevant, disable what's not, add your own.

Built-in sources:

| Source | Method | Coverage |
|--------|--------|----------|
| LinkedIn | Chrome automation | Any keyword/location search you configure |
| WhatsApp groups | Optional [WhatsApp skill](https://github.com/roysahar11/claude-code-whatsapp) | Tech job groups you're in |
| [Secret Tel Aviv Jobs](https://jobs.secrettelaviv.com/) | RSS | Israeli tech startup ecosystem |
| [Arbeitnow](https://www.arbeitnow.com/) | REST API | European tech, DACH focus |
| [SimplifyJobs](https://github.com/SimplifyJobs/New-Grad-Positions) | GitHub JSON | US new-grad and entry-level |

### Run the Full Daily Pipeline

Connect all of the above into an automated end-to-end flow: fetch from all sources, merge and deduplicate, evaluate relevance, generate a report, draft applications, and notify you.

```
/daily-job-fetch
```

This is where the individual capabilities come together. The pipeline is configurable — you choose which sources to enable, how aggressively to filter, and whether to auto-draft applications or just report.

<details>
<summary>Pipeline architecture</summary>

```
┌─────────────────────────────────────────────────┐
│                  /daily-job-fetch                │
│              (orchestrator skill)                │
├─────────┬──────────┬──────────┬─────────────────┤
│LinkedIn │ WhatsApp  │ Scrapers │ Chrome Sources   │
│ (Chrome)│(optional)│  (HTTP)  │ (AllJobs, etc.) │
└────┬────┴────┬─────┴────┬────┴────────┬────────┘
     └─────────┴──────────┴─────────────┘
                     │
              merge-pipeline.js
              (normalize + dedup)
                     │
           job-description-fetcher
           (WebFetch + Chrome fallback)
                     │
                scan-jobs
           (relevance analysis)
                     │
          ┌──────────┴──────────┐
          │   quick-apply       │
          │  (batch resume      │
          │   drafting)         │
          └─────────────────────┘
```

**Steps:**

1. **Fetch** — Collect jobs from LinkedIn (via Chrome), WhatsApp groups (if configured), and web scrapers
2. **Merge** — Normalize all jobs to a standard schema, derive location cities, deduplicate
3. **Pre-filter** — Review titles and remove obviously irrelevant postings
4. **Fetch descriptions** — Retrieve full job descriptions (WebFetch first, Chrome fallback)
5. **Scan** — Evaluate each job against your profile, skills, and preferences
6. **Report** — Generate a structured report: relevant, worth discussing, and skip categories
7. **Quick-apply** — Draft tailored resumes for relevant jobs in parallel
8. **Notify** — Send WhatsApp summaries with draft PDFs for review (if configured)

</details>

### Beyond the Built-In Tools

The agent has your full professional context — your story, skills, experience, goals, strengths, and lessons learned. That makes it useful for things that aren't explicitly programmed:

- **Career strategy** — "What types of roles should I be targeting?" / "Is this career pivot realistic?"
- **Interview preparation** — "Help me prepare for a system design interview at this company" / "What questions should I expect for this role?"
- **Professional writing** — Cover letters, LinkedIn messages to recruiters, follow-up emails
- **Self-assessment** — "What are my strongest selling points for DevOps roles?" / "Where are my gaps?"

It's Claude Code — it's a conversation. Ask it anything about your career and it'll use everything it knows about you to help.

## Make It Yours

This repo is a starting point, not a finished product. It's built as a set of **instructions** (skills, agents, profile data) on top of Claude Code — which means you can extend it in any direction through conversation:

- Add new job sources — write a scraper, point the agent at a new site
- Create new skills — a networking outreach workflow, a salary negotiation prep skill, anything
- Customize existing tools — change how resumes are formatted, adjust evaluation criteria, modify the pipeline
- Build entirely new capabilities — the agent has your context and Claude Code's full toolset

The skills and agents in this repo are markdown files with instructions. You can read them, modify them, or ask Claude Code to create new ones. There's no framework to learn — just describe what you want.

## Getting Started

### Prerequisites

- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** — the AI coding assistant that powers everything
- **Node.js** (v18+) — for scripts and resume rendering
- **[Puppeteer](https://pptr.dev/)** — for HTML-to-PDF resume conversion
- **[Claude in Chrome](https://chromewebstore.google.com/detail/claude-in-chrome/)** (optional) — browser extension for LinkedIn and Chrome-based job boards
- **WhatsApp skill** (optional) — for scanning job groups and receiving notifications. See [claude-code-whatsapp](https://github.com/roysahar11/claude-code-whatsapp) for a WAHA-based implementation

### 1. Create your repo and install

Click **"Use this template"** on GitHub to create your own copy, then:

```bash
git clone https://github.com/YOUR_USERNAME/claude-code-career-agent.git
cd claude-code-career-agent
npm install
```

### 2. Set up your profile

Open Claude Code in the project directory and run:

```
/setup
```

The agent will guide you through a conversation to build your profile, create your base resume(s), and configure job search parameters. It can import from your existing resume or LinkedIn profile to speed things up.

You can come back to `/setup` anytime to expand or update your profile.

<details>
<summary>Manual setup (alternative)</summary>

If you prefer to set up manually, copy the example files and fill in your details:

```bash
cp profile/context.example.md profile/context.md
cp profile/experience.example.md profile/experience.md
cp profile/preferences.example.md profile/preferences.md
cp profile/coaching-notes.example.md profile/coaching-notes.md
cp profile/evaluation-criteria.example.md profile/evaluation-criteria.md
cp profile/resume-preferences.example.md profile/resume-preferences.md
cp config/user.example.md config/user.md
cp config/search.example.md config/search.md
```

Edit each file following the placeholder instructions inside. Then create your base resume JSON in `Resumes/` (see `Resumes/README.md` for the schema).

</details>

### 3. Start using it

You can use any capability independently:

```
/customize-resume    — tailor a resume for a specific job
/scan-jobs           — evaluate job postings for relevance
/quick-apply         — draft applications for multiple jobs
/daily-job-fetch     — run the full pipeline end-to-end
```

Or just talk to it — paste a job URL, ask for career advice, discuss your resume strategy. It's a conversation.

### Scheduling (optional)

To automate `/daily-job-fetch` on a schedule, create a scheduled job that launches Claude Code:

```bash
claude \
  --permission-mode dontAsk \
  --allowedTools "Read,Glob,Grep,Task,WebFetch,WebSearch,Write,Edit,Bash,mcp__claude-in-chrome__*" \
  "Run /daily-job-fetch and quick-apply to relevant jobs. Work autonomously."
```

Wrap this in a shell script and trigger it with `launchd`, `cron`, or any scheduler.

## How It's Built

The system is a set of **skills** (workflow instructions), **agents** (specialized workers), and **scripts** (data processing) orchestrated by Claude Code.

### Skills

| Skill | What it does |
|-------|-------------|
| `/setup` | Guided onboarding — builds your profile, resumes, and config through conversation |
| `/daily-job-fetch` | Orchestrates the full pipeline: fetch → merge → scan → report → apply |
| `/customize-resume` | Creates tailored resumes for specific job postings |
| `/quick-apply` | Autonomous batch application drafting with WhatsApp notifications |
| `/scan-jobs` | Evaluates job relevance against your profile and preferences |
| `/linkedin-job-fetch` | Extracts job listings from LinkedIn via Chrome automation |
| `/personal-note` | Writes cover letters and personal notes for applications |

### Agents

| Agent | Role |
|-------|------|
| `job-fetcher` | Fetches jobs from LinkedIn, WhatsApp, and Chrome sources |
| `job-description-fetcher` | Retrieves full job descriptions with WebFetch + Chrome fallback |
| `scan-jobs` | Analyzes job postings for relevance |
| `quick-apply-batch` | Processes batches of applications autonomously |

### Scripts

| Script | Purpose |
|--------|---------|
| `merge-pipeline.js` | Merges jobs from all sources, normalizes, deduplicates |
| `create-quick-apply-batches.js` | Splits relevant jobs into batches for parallel processing |
| `filter-by-urls.js` | Marks pipeline entries as filtered by matching URLs |
| `scrapers/fetch-all.js` | Runs web scrapers (individually configurable) |

## File Structure

```
claude-code-career-agent/
├── .claude/
│   ├── agents/           # Agent definitions (specialized workers)
│   ├── skills/           # Skill definitions (workflow instructions)
│   └── settings.json     # Permission rules
├── config/               # Personal config (created by /setup)
│   ├── user.md           # Your contact info and identity
│   └── search.md         # Keywords, locations, sources, scraper params
├── profile/              # Your professional profile (created by /setup)
│   ├── context.md        # Your story, career goals, positioning
│   ├── experience.md     # Skills, work history, projects
│   ├── preferences.md    # Location, salary, boundaries, dream industries
│   ├── evaluation-criteria.md  # Rules for how scan-jobs evaluates relevance
│   ├── resume-preferences.md   # Resume customization rules
│   └── coaching-notes.md       # Interview lessons (grows over time)
├── scripts/
│   ├── merge-pipeline.js
│   ├── create-quick-apply-batches.js
│   └── scrapers/                 # Web scraper modules
├── templates/            # Report templates
├── Resumes/              # Base resume JSON files (created by /setup)
├── Applications/         # Per-job application directories (auto-created)
├── CLAUDE.md             # Project instructions for Claude Code
├── COMPLIANCE.md         # Terms of service notes
└── package.json
```

Each `config/` and `profile/` file has an `.example` template showing the expected structure.

## Roadmap

- **`/update` skill** — Pull updates from the template repo into your fork without overwriting personal files

## Compliance & Disclaimer

This project includes instructions that tell Claude Code to browse certain job platforms using the Claude in Chrome extension. Some platforms may restrict automated access in their Terms of Service. These instructions are published for educational and personal use purposes. By using this project, you accept full responsibility for ensuring your use complies with all applicable laws and platform Terms of Service. See [COMPLIANCE.md](COMPLIANCE.md) for details.

## License

[MIT](LICENSE)
