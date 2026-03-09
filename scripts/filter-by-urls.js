#!/usr/bin/env node
/**
 * filter-by-urls.js
 *
 * Marks pipeline entries as filtered by matching URLs from a file.
 *
 * Usage:
 *   node scripts/filter-by-urls.js --pipeline /tmp/pipeline-il-DATE.json --urls /tmp/title-filter-urls.txt
 *
 * --urls file: one URL per line
 * --status: status value to set (default: TITLE_FILTERED)
 * --reason: filterReason value (default: "title pre-filter")
 *
 * Modifies the pipeline JSON in place.
 */

const fs = require('fs');

const args = process.argv.slice(2);
let pipelinePath, urlsPath, status = 'TITLE_FILTERED', reason = 'title pre-filter';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--pipeline' && args[i + 1]) pipelinePath = args[++i];
  else if (args[i] === '--urls' && args[i + 1]) urlsPath = args[++i];
  else if (args[i] === '--status' && args[i + 1]) status = args[++i];
  else if (args[i] === '--reason' && args[i + 1]) reason = args[++i];
}

if (!pipelinePath || !urlsPath) {
  console.error('Usage: node scripts/filter-by-urls.js --pipeline <file> --urls <file>');
  process.exit(1);
}

const skip = new Set(
  fs.readFileSync(urlsPath, 'utf8').trim().split('\n').map(u => u.trim()).filter(Boolean)
);

const data = JSON.parse(fs.readFileSync(pipelinePath, 'utf8'));
let filtered = 0;

for (const entry of data) {
  if (skip.has(entry.url)) {
    entry.status = status;
    entry.filterReason = reason;
    filtered++;
  }
}

fs.writeFileSync(pipelinePath, JSON.stringify(data, null, 2));
console.log(JSON.stringify({ filtered, total: data.length, remaining: data.length - filtered }));
