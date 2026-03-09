# Daily Job Report - {DATE} {HH:MM}

## Summary
- Mode: {Automated | Manual}
- Sources: {list all sources that ran}
- Time window: {SECONDS}s (~{hours}h since last run)
- Israeli: Total X | Relevant: X | Discuss: X | Skipped: X
- International: Total X | Relevant: X | Discuss: X | Skipped: X {omit if international disabled}

---

## Israeli Opportunities

### Relevant Jobs (Apply)

#### 1. {Role} @ {Company}
- **Source**: {LinkedIn | WhatsApp group | Secret Tel Aviv | etc.}
- **URL**: {direct link to job posting}
- **Location**: {location}
- **Why relevant**: {reasoning from scan-jobs}
- **Best resume**: {bestResume} ({resumeScore}/100)

### Jobs to Discuss

#### 1. {Role} @ {Company}
- **Source**: {source}
- **URL**: {direct link}
- **Location**: {location}
- **Question**: {reasoning from scan-jobs}

### Skipped
#### {Role} @ {Company}
- **URL**: {direct link}
{reasoning}

---

## International Opportunities {omit entire section if international disabled in config}

### Relevant Jobs (Apply)

#### 1. {Role} @ {Company}
- **Source**: {Arbeitnow | SimplifyJobs | LinkedIn Intl | etc.}
- **URL**: {direct link to job posting}
- **Location**: {location}
- **Visa/relocation**: {EU citizenship = no sponsorship needed | Visa sponsorship offered | etc.}
- **Why relevant**: {reasoning from scan-jobs}
- **Best resume**: {bestResume} ({resumeScore}/100)

### Jobs to Discuss

#### 1. {Role} @ {Company}
- **Source**: {source}
- **URL**: {direct link}
- **Location**: {location}
- **Question**: {reasoning from scan-jobs}

### Skipped
#### {Role} @ {Company}
- **URL**: {direct link}
{reasoning}

---

## Pre-filtered by Title (if any)
{titles that were filtered in Step 1.5, with reasons}

## Foreign Language — Skipped (if any)
Jobs posted in a language other than English or Hebrew. These were not scanned for relevance.
- {Role} @ {Company} — {language} ({source})

## Could Not Fetch (if any)
Jobs where description fetching failed. Every failure must appear here.
- {Role} @ {Company} - {fetchError from master JSON}

## Manual-Check Reminder
Check these sources manually (not automated):
- AllJobs email alerts
- Drushim Smart Agent
- Goozali (en.goozali.com)
- Built In Israel (builtin.com/jobs/mena/israel) — if not in manual mode
- Wellfound Israel (wellfound.com/location/israel) — if not in manual mode

## Other Errors (if any)
- {source}: {error description}
