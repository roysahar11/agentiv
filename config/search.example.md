# Job Search Configuration

## Scope

Controls which pipelines run during `/daily-job-fetch`:
- **International**: true | false — set to `false` to skip all international sources (LinkedIn Intl, international scrapers)

## Scrapers

Enable or disable individual web scrapers. Disabled scrapers are skipped by `fetch-all.js`.

| Scraper | Scope | Enabled | Description |
|---------|-------|---------|-------------|
| secret-tel-aviv | israeli | true | Israeli tech jobs via RSS from Secret Tel Aviv |
| arbeitnow | international | true | European jobs (DACH focus) via Arbeitnow API |
| simplify-jobs | international | true | US new-grad/entry-level positions from SimplifyJobs GitHub repo |

## LinkedIn Searches

### Primary Location
- **geoId**: [Your location's LinkedIn geoId — find it in the URL when searching LinkedIn Jobs for your area]
- **Keywords**: [Job titles to search, e.g., DevOps Engineer, Full Stack Developer, Junior Software Engineer]
- **Experience levels**: 1,2

### International
- **Locations**: [Regions to search, e.g., European Union, Germany, Remote]
- **Keywords**: [Same or different keywords for international search]
- **Experience levels**: 1,2

## Chrome Sources (manual-mode only)

<!-- Add job board URLs you want the agent to browse via Chrome automation.
Each source needs: base URL, search keywords, and any position codes. -->

### AllJobs
- **URL template**: [URL with position code placeholders]
- **Position codes**: [Site-specific codes for your target roles]
- **Keywords**: [Search terms]

### Built In Israel
- **URL base**: [https://builtin.com/jobs/mena/israel or your region's Built In URL]
- **Keywords**: [Search terms]

### Wellfound
- **URL base**: [https://wellfound.com/location/your-location]
- **Keywords**: [Search terms]

## Web Scrapers

### SimplifyJobs
- **Relevant categories**: [e.g., Software, AI/ML/Data — see SimplifyJobs GitHub for available categories]

## WhatsApp Groups

<!-- Add WhatsApp groups where job postings are shared.
Get group IDs from WAHA API or WhatsApp Web. -->

| Name | Group ID |
|------|----------|
| [Group Name] | [group-id@g.us] |

To find group IDs, use the WhatsApp skill to list your groups.

## Schedule
- **Fetch triggers**: [e.g., 08:00, 14:00, 20:00]
- **Short day** (day number, 1=Mon): [e.g., 5 for Friday]
- **Day off** (day number): [e.g., 6 for Saturday]

## Filtering
- **Max applicants**: [e.g., 30 — skip LinkedIn jobs with more applicants than this]
