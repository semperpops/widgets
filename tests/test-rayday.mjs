/**
 * Unit tests for Rayday / leap-year logic.
 * Mirrors the calendar math used in index.html.
 */

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

function daysInYear(y) {
  return isLeapYear(y) ? 366 : 365;
}

function dayOfYear(year, month, day) {
  const start = Date.UTC(year, 0, 1);
  const cur = Date.UTC(year, month - 1, day);
  return Math.floor((cur - start) / 86400000) + 1;
}

function rayday(year, month, day) {
  return { doy: dayOfYear(year, month, day), total: daysInYear(year) };
}

const cases = [
  { name: "2026-01-01", y: 2026, m: 1, d: 1, expectDoy: 1, expectTotal: 365 },
  { name: "2026-12-31", y: 2026, m: 12, d: 31, expectDoy: 365, expectTotal: 365 },
  { name: "2026-11-09", y: 2026, m: 11, d: 9, expectDoy: 313, expectTotal: 365 },
  { name: "2028-02-29", y: 2028, m: 2, d: 29, expectDoy: 60, expectTotal: 366 },
  { name: "2028-12-31", y: 2028, m: 12, d: 31, expectDoy: 366, expectTotal: 366 },
  // Extra sanity: century non-leap and 400-leap
  { name: "1900-03-01", y: 1900, m: 3, d: 1, expectDoy: 60, expectTotal: 365 },
  { name: "2000-03-01", y: 2000, m: 3, d: 1, expectDoy: 61, expectTotal: 366 },
];

let failed = 0;
for (const c of cases) {
  const r = rayday(c.y, c.m, c.d);
  const ok = r.doy === c.expectDoy && r.total === c.expectTotal;
  const status = ok ? "PASS" : "FAIL";
  console.log(`${status}  ${c.name}  got ${r.doy}/${r.total}  expected ${c.expectDoy}/${c.expectTotal}`);
  if (!ok) failed++;
}

// Also verify Eastern zone date for "now" isn't needed; verify Intl path for a fixed UTC instant.
function ymdInZone(date, timeZone) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const map = {};
  for (const p of fmt.formatToParts(date)) {
    if (p.type !== "literal") map[p.type] = p.value;
  }
  return { year: +map.year, month: +map.month, day: +map.day };
}

// 2026-11-09 12:00 America/New_York = 2026-11-09 17:00 UTC
const fixed = new Date(Date.UTC(2026, 10, 9, 17, 0, 0));
const eastern = ymdInZone(fixed, "America/New_York");
const okinawa = ymdInZone(fixed, "Asia/Tokyo");
const hawaii = ymdInZone(fixed, "Pacific/Honolulu");
console.log(`INFO  fixed UTC 2026-11-09T17:00Z → Eastern ${eastern.year}-${eastern.month}-${eastern.day}`);
console.log(`INFO  same instant → Okinawa ${okinawa.year}-${okinawa.month}-${okinawa.day}`);
console.log(`INFO  same instant → Hawaii  ${hawaii.year}-${hawaii.month}-${hawaii.day}`);

const rdEastern = rayday(eastern.year, eastern.month, eastern.day);
const okEastern = rdEastern.doy === 313 && rdEastern.total === 365;
console.log(`${okEastern ? "PASS" : "FAIL"}  Eastern Rayday from Intl for fixed instant: ${rdEastern.doy}/${rdEastern.total}`);
if (!okEastern) failed++;

if (failed) {
  console.log(`\n${failed} test(s) failed`);
  process.exit(1);
} else {
  console.log(`\nAll ${cases.length + 1} Rayday checks passed`);
}
