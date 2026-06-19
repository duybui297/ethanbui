// scripts/seed.mjs
// Applies every supabase/seed*.sql file against the database, in filename order.
// All seed files are idempotent (INSERT ... ON CONFLICT), so this is safe to
// re-run and does NOT wipe data the way `supabase db reset` does.
//
// Setup (one time):
//   1. npm install              # installs the `pg` dependency
//   2. Add DATABASE_URL to .env.local — copy it from Supabase:
//      Project Settings -> Database -> Connection string -> URI
//      (use the "Session pooler" or direct connection; include the password)
//
// Usage:
//   npm run db:seed
//
// Optional: pass specific files to run only those, e.g.
//   npm run db:seed -- supabase/seed_fde_self_assessment.sql

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const supabaseDir = join(root, 'supabase');

// --- Load DATABASE_URL from env or .env.local (minimal parser, no deps) ---
function loadEnvLocal() {
  const p = join(root, '.env.local');
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnvLocal();

const DATABASE_URL = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
if (!DATABASE_URL) {
  console.error(
    '\n✖ DATABASE_URL is not set.\n' +
      '  Add it to .env.local (Supabase -> Project Settings -> Database -> Connection string -> URI).\n'
  );
  process.exit(1);
}

// --- Pick which seed files to run ---
const argFiles = process.argv.slice(2);
let files;
if (argFiles.length) {
  files = argFiles.map((f) => (f.startsWith('supabase/') ? join(root, f) : join(supabaseDir, f)));
} else {
  files = readdirSync(supabaseDir)
    .filter((f) => /^seed.*\.sql$/.test(f))
    .sort() // seed.sql, seed_ai_agent_team.sql, seed_fde_self_assessment.sql ...
    .map((f) => join(supabaseDir, f));
}

if (!files.length) {
  console.error('✖ No supabase/seed*.sql files found.');
  process.exit(1);
}

const client = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  console.log(`\nSeeding ${files.length} file(s)…\n`);
  for (const file of files) {
    const sql = readFileSync(file, 'utf8');
    process.stdout.write(`  • ${file.replace(root + '/', '')} … `);
    await client.query(sql);
    console.log('done');
  }
  console.log('\n✔ All seed files applied successfully.\n');
} catch (err) {
  console.error('\n✖ Seeding failed:\n', err.message, '\n');
  process.exitCode = 1;
} finally {
  await client.end();
}
