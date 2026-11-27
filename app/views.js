// Page templates. Every route is a real page with real figures; no page is a
// stub. Charts come from charts.js, numbers from data.js.

import { KPI, GDP_YEARS, GDP_Q3_2026, POPULATION, POPULATION_STORY, STATES, UNEMPLOYMENT, CPI_MOM, JOBS, INCOME, SOURCES, FINDINGS, stateShare, stateGrowth, fmtPop } from './data.js';
import { barChart, hbarChart, slopeChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function kpiCard(k) {
  return `<article class="kpi" data-kpi="${esc(k.label.toLowerCase())} ${esc(k.id)}">
    <p class="kpi-label">${esc(k.label)}</p>
    <p class="kpi-value">${esc(k.value)}</p>
    <p class="kpi-meta">${esc(k.year)} · ${esc(k.change)}</p>
    <p class="kpi-src">Source: ${esc(k.source)}</p>
  </article>`;
}

function sourceLine(text) {
  return `<p class="src">Source: ${esc(text)}</p>`;
}

export function overview() {
  const gdpBars = GDP_YEARS.map((g) => ({ label: String(g.year).slice(2), value: g.nominal, display: '$' + g.nominal.toFixed(1) + 'T' }));
  const popPoints = POPULATION.map((p) => ({ label: String(p.year), value: p.total, display: p.total.toFixed(1) + 'm' }));
  const top5 = STATES.slice(0, 5)
    .map((s) => `<tr><td>${s.rank}</td><td><a href="#/population">${esc(s.state)}</a></td><td class="num">${fmtPop(s.pop2024)}</td><td class="num">${stateShare(s.pop2024).toFixed(1)}%</td></tr>`)
    .join('');
  const findings = FINDINGS.map((f) => `<article class="finding"><h3>${esc(f.head)}</h3><p>${esc(f.body)}</p></article>`).join('');
  return `
  <section class="hero">
    <p class="eyebrow">United States · Official statistics, visualised</p>
    <h1>America by the numbers</h1>
    <p class="lede">The economy, the population, jobs, prices and household income — each figure with its year and its official source. Updated November 2026.</p>
    <div class="search-row">
      <label for="q">Find an indicator</label>
      <input id="q" type="search" placeholder="Try “jobs”, “income” or “GDP”…" autocomplete="off">
      <span id="q-count" class="muted"></span>
    </div>
  </section>
  <section class="kpis" id="kpis">${KPI.map(kpiCard).join('')}</section>
  <p id="no-match" class="muted" hidden>No indicator matches that search. Try “GDP”, “jobs”, “income” or “population”.</p>
  <section class="findings">${findings}</section>
  <section class="grid2">
    <article class="card">
      <h2><a href="#/economy">Economy — GDP, 2015–2025</a></h2>
      ${barChart(gdpBars, { height: 190, unit: 'Nominal GDP in trillions of dollars' })}
      ${sourceLine('BEA, NIPA Table 1.1.5, 2026 annual revision. Eleven years, one down year: 2020.')}
      <p><a class="btn" href="#/economy">Open the economy page →</a></p>
    </article>
    <article class="card">
      <h2><a href="#/population">Population — 2020–2024</a></h2>
      ${slopeChart(popPoints, { height: 190 })}
      ${sourceLine('Census Bureau, Vintage 2024 estimates. Fastest annual growth since 2001.')}
      <p><a class="btn" href="#/population">See all 50 states + DC →</a></p>
    </article>
  </section>
  <section class="grid2">
    <article class="card">
      <h2><a href="#/jobs">Jobs &amp; prices</a></h2>
      <p class="big">Unemployment <strong>4.1%</strong> <span class="muted">(Oct 2026)</span> — never above 4.5% since Jan 2024.</p>
      <p>Nonfarm payrolls added 165,000 jobs in October. Consumer prices rose 0.4% on the month; the core rate rose 0.3%.</p>
      <p><a class="btn" href="#/jobs">34 months of jobs &amp; prices →</a></p>
    </article>
    <article class="card">
      <h2><a href="#/income">Income</a></h2>
      <p class="big">Median household income <strong>$81,604</strong> <span class="muted">(2024)</span></p>
      <p>41.2% of households earn over $100,000; 30.6% earn under $50,000. Massachusetts tops the states at $104,800.</p>
      <p><a class="btn" href="#/income">Income in detail →</a></p>
    </article>
  </section>
  <section class="card">
    <h2>Largest states</h2>
    <table class="tbl"><thead><tr><th>#</th><th>State</th><th class="num">Population</th><th class="num">Share of US</th></tr></thead><tbody>${top5}</tbody></table>
    <p><a class="btn" href="#/population">Full table: 50 states + DC, sortable &amp; searchable →</a></p>
  </section>`;
}

export function economy(mode) {
  const rows = GDP_YEARS.map((g) => {
    const prev = GDP_YEARS.find((x) => x.year === g.year - 1);
    const delta = prev ? (g.nominal - prev.nominal).toFixed(2) : '—';
    return `<tr><td>${g.year}</td><td class="num">$${g.nominal.toFixed(2)}T</td><td class="num">${g.realGrowth === null ? '—' : '+' + g.realGrowth.toFixed(1) + '%'}</td><td class="num">${delta === '—' ? '—' : '+$' + delta + 'T'}</td></tr>`;
  }).join('');
  const chartValues = mode === 'change'
    ? GDP_YEARS.slice(1).map((g) => {
        const prev = GDP_YEARS.find((x) => x.year === g.year - 1);
        return { label: String(g.year).slice(2), value: +(g.nominal - prev.nominal).toFixed(2), display: '+$' + (g.nominal - prev.nominal).toFixed(2) + 'T' };
      })
    : GDP_YEARS.map((g) => ({ label: String(g.year).slice(2), value: g.nominal, display: '$' + g.nominal.toFixed(1) + 'T' }));
  return `
  <h1>Economy</h1>
  <p class="lede">Nominal GDP reached $30.86 trillion in 2025, up from $18.30 trillion in 2015. Real growth was +2.3% in 2025 after +3.0% in 2024.</p>
  <section class="card">
    <h2>Gross domestic product, 2015–2025</h2>
    <div class="toggle" role="group" aria-label="Chart view">
      <button data-mode="level" class="${mode === 'level' ? 'on' : ''}">GDP level ($T)</button>
      <button data-mode="change" class="${mode === 'change' ? 'on' : ''}">Yearly increase ($T)</button>
    </div>
    ${barChart(chartValues, { height: 230, unit: mode === 'change' ? 'Yearly increase in nominal GDP' : 'Nominal GDP in trillions of dollars' })}
    ${sourceLine('BEA, NIPA Table 1.1.5, 2026 annual revision (released 30 Sep 2026). Years are shown as ’15–’25 on the axis.')}
  </section>
  <section class="grid2">
    <article class="card">
      <h2>Annual figures</h2>
      <table class="tbl"><thead><tr><th>Year</th><th class="num">Nominal GDP</th><th class="num">Real growth</th><th class="num">Increase</th></tr></thead><tbody>${rows}</tbody></table>
      <p class="muted">Real growth is shown only for 2024 and 2025, the years this site verified against the BEA release. The nominal series is complete for all eleven years.</p>
    </article>
    <article class="card">
      <h2>Latest quarter — read carefully</h2>
      <p class="big">Q3 2026: <strong>+${GDP_Q3_2026.realGrowthAnnualised}%</strong> <span class="muted">real, annualised</span></p>
      <p>GDP at an annualised current-dollar rate of about $33.01T in Q3 2026. That is a quarterly rate stretched to a year — it is <strong>not</strong> the 2026 annual GDP, so it never appears in the annual table above.</p>
      <p class="big">GDP per capita 2025: <strong>$90,027</strong></p>
      <p>World Bank WDI basis: BEA-basis GDP divided by population.</p>
      <p><button class="btn" id="dl-csv" type="button">Download the data as CSV</button></p>
    </article>
  </section>`;
}

export function population(sort, query) {
  const q = (query || '').toLowerCase();
  let rows = STATES.filter((s) => !q || s.state.toLowerCase().includes(q));
  const sorters = {
    pop: (a, b) => b.pop2024 - a.pop2024,
    name: (a, b) => a.state.localeCompare(b.state),
    share: (a, b) => stateShare(b.pop2024) - stateShare(a.pop2024),
    growth: (a, b) => stateGrowth(b) - stateGrowth(a),
  };
  rows = [...rows].sort(sorters[sort] || sorters.pop);
  const body = rows.length
    ? rows.map((s) => `<tr data-state="${esc(s.state)}" data-pop="${s.pop2024}"><td>${s.rank}</td><td>${esc(s.state)}</td><td class="num">${fmtPop(s.pop2024)}</td><td class="num">${stateGrowth(s) >= 0 ? '+' : ''}${stateGrowth(s).toFixed(2)}%</td><td class="num">${stateShare(s.pop2024).toFixed(2)}%</td></tr>`).join('')
    : `<tr><td colspan="5">No state matches “${esc(query)}”. Try part of a name, e.g. “York”.</td></tr>`;
  return `
  <h1>Population</h1>
  <p class="lede">340.1 million people at 1 July 2024 — up 3.3 million (+0.98%) on a year earlier, the fastest annual growth since 2001. All 50 states plus DC, below.</p>
  <section class="grid2">
    <article class="card">
      <h2>Where the growth came from</h2>
      ${hbarChart([{ label: 'Net migration', value: 84, display: '+2.8m · 84%' }, { label: 'Natural increase', value: 16, display: '+0.5m · 16%' }])}
      <p>${esc(POPULATION_STORY.note)}</p>
      ${sourceLine('Census Bureau, Vintage 2024. Natural increase is the remainder after migration.')}
    </article>
    <article class="card">
      <h2>Compare two states</h2>
      <p>Pick any two of the 50 states plus DC.</p>
      <div class="compare-row">
        <label>State A <select id="cmp-a">${STATES.map((s) => `<option value="${s.pop2024}"${s.state === 'California' ? ' selected' : ''}>${esc(s.state)}</option>`).join('')}</select></label>
        <label>State B <select id="cmp-b">${STATES.map((s) => `<option value="${s.pop2024}"${s.state === 'Texas' ? ' selected' : ''}>${esc(s.state)}</option>`).join('')}</select></label>
      </div>
      <p id="cmp-out" class="big"></p>
      <p class="muted">Shares are each state’s population divided by the national total of 340.1m.</p>
    </article>
  </section>
  <section class="card">
    <h2>All states &amp; DC — 1 July 2024</h2>
    <div class="toolbar">
      <label>Search <input id="state-q" type="search" placeholder="e.g. York" value="${esc(query || '')}"></label>
      <span class="toggle" role="group" aria-label="Sort states">
        <button data-sort="pop" class="${sort === 'pop' ? 'on' : ''}">By population</button>
        <button data-sort="growth" class="${sort === 'growth' ? 'on' : ''}">By growth</button>
        <button data-sort="name" class="${sort === 'name' ? 'on' : ''}">By name</button>
        <button data-sort="share" class="${sort === 'share' ? 'on' : ''}">By share</button>
      </span>
    </div>
    <table class="tbl"><thead><tr><th>#</th><th>State</th><th class="num">Population</th><th class="num">Growth ’23–’24</th><th class="num">Share of US</th></tr></thead><tbody>${body}</tbody></table>
    ${sourceLine('Census Bureau, Vintage 2024 state estimates (NST-EST2024-POP), 1 Jul 2024. The 51 rows sum exactly to the national total, 340,110,988. Puerto Rico (3,203,295) is a territory and is not ranked here. Tap a row to see that state’s share.')}
    <p id="state-detail" class="big" aria-live="polite"></p>
  </section>`;
}

export function jobs() {
  const unPoints = UNEMPLOYMENT.map((u) => ({ label: u.m, value: u.rate, display: u.rate === null ? '' : u.rate.toFixed(1) + '%' }));
  const cpiBars = CPI_MOM.map((c) => ({ label: c.m, value: c.mom, display: (c.mom >= 0 ? '+' : '') + c.mom.toFixed(2) + '%' }));
  return `
  <h1>Jobs &amp; prices</h1>
  <p class="lede">The labour market stayed tight for 34 months, and prices kept rising month to month — with one month missing from both series.</p>
  <section class="card">
    <h2>Unemployment rate, January 2024 – October 2026</h2>
    ${lineChart(unPoints, { unit: 'Unemployment rate, percent, monthly' })}
    <p class="big">October 2026: <strong>4.1%</strong>, down from 4.2% in September. The rate never left the 3.7%–4.5% band in this window.</p>
    <p>${esc(JOBS.nonfarmLabel)}. The October 2025 gap is real: the federal shutdown stopped collection that month, so no value exists — the line breaks rather than inventing one.</p>
    ${sourceLine('BLS, Employment Situation (UNRATE), seasonally adjusted.')}
  </section>
  <section class="grid2">
    <article class="card">
      <h2>Consumer prices — monthly change</h2>
      ${barChart(cpiBars, { height: 200, unit: 'CPI month-on-month change, percent' })}
      <p class="big">October 2026: all items <strong>+${JOBS.cpi.mom.toFixed(1)}%</strong>, core <strong>+${JOBS.cpi.coreMom.toFixed(1)}%</strong> <span class="muted">on the month</span></p>
      <p>March 2026 was the sharpest monthly rise (+0.87%); June was the only fall (−0.42%). Monthly changes are computed from the published CPI index.</p>
      ${sourceLine('BLS, CPI (CPIAUCSL) and CPI release, 10 Nov 2026.')}
    </article>
    <article class="card">
      <h2>Why no year-on-year figure?</h2>
      <p>${esc(JOBS.cpiNote)}</p>
      <p>The same shutdown also broke the unemployment series for October 2025 (see the gap in the chart above). Both gaps are shown, not smoothed over.</p>
      <h2>How to read these two pages together</h2>
      <p>Unemployment near 4% with 165,000 jobs added in a month is a strong labour market; a 0.4% monthly price rise, if it repeated all year, would be about 5% a year. The two series come from different BLS surveys, released days apart, and this page keeps their dates separate so they are never confused.</p>
    </article>
  </section>`;
}

export function income() {
  const dist = INCOME.distribution.map((d) => ({ label: d.band, value: d.share, display: d.share.toFixed(1) + '%' }));
  return `
  <h1>Income</h1>
  <p class="lede">What American households earn, who earns most, and how many live in poverty.</p>
  <section class="grid2">
    <article class="card">
      <h2>Median household income</h2>
      <p class="big"><strong>$81,604</strong> <span class="muted">(2024, +2% in real terms)</span></p>
      <p>American Community Survey, 1-year estimates. The middle household — half earn more, half earn less.</p>
      <h2>Where households sit</h2>
      ${hbarChart(dist)}
      <p class="muted">The middle band ($50,000–$100,000, 28.2%) is the remainder after the two published bands; the three shares sum to 100%.</p>
      ${sourceLine('Census Bureau, ACS 1-year estimates, 2024.')}
    </article>
    <article class="card">
      <h2>States at the extremes</h2>
      <table class="tbl"><tbody>
        <tr><td>Highest — Massachusetts</td><td class="num">$104,800</td></tr>
        <tr><td>National median</td><td class="num">$81,604</td></tr>
        <tr><td>Lowest — Mississippi</td><td class="num">$59,100</td></tr>
      </tbody></table>
      <p>The gap between the highest- and lowest-income states is $45,700 — more than half the national median.</p>
      <h2>Hardship</h2>
      <p class="big">Poverty rate <strong>${INCOME.poverty.toFixed(1)}%</strong> <span class="muted">(2024)</span></p>
      <p class="big">Without health insurance <strong>${INCOME.uninsured.toFixed(1)}%</strong> <span class="muted">(2024)</span></p>
      <p>${esc(INCOME.surveyNote)}</p>
      ${sourceLine('Census Bureau, CPS ASEC, 2024.')}
    </article>
  </section>`;
}

export function sources() {
  const rows = SOURCES.map((s) => `<tr><td>${esc(s.figure)}</td><td>${esc(s.value)}</td><td>${esc(s.source)}</td><td>${esc(s.detail)}</td></tr>`).join('');
  return `
  <h1>Sources &amp; method</h1>
  <p class="lede">Every figure on this site traces to one row below. Years and survey names are part of the figure, not footnotes.</p>
  <section class="card">
    <table class="tbl wide"><thead><tr><th>Figure</th><th>Value</th><th>Source</th><th>Publication</th></tr></thead><tbody>${rows}</tbody></table>
  </section>
  <section class="grid2">
    <article class="card">
      <h2>Method</h2>
      <p>Figures are copied from the publishing agency, never re-estimated. Shares of the US population are simple division of the published state populations by the published national total (340,110,988). The $50,000–$100,000 income band is the arithmetic remainder of the two published bands. CPI monthly changes are arithmetic from the published index values.</p>
      <p>Where a figure was not published — the year-on-year CPI change for October 2026, the October 2025 unemployment rate, real GDP growth before 2024 — this site says so instead of filling the gap.</p>
    </article>
    <article class="card">
      <h2>About this site</h2>
      <p>An original, independent visualisation. It is not affiliated with the Bureau of Economic Analysis, the U.S. Census Bureau, the Bureau of Labor Statistics or the World Bank, and it copies none of their branding.</p>
      <p>It runs entirely offline: every figure, chart and page is a file in this site. No network request is made.</p>
      <p><button class="btn" id="dl-csv" type="button">Download the data as CSV</button></p>
    </article>
  </section>`;
}

export function missing() {
  return `<h1>Not found</h1><p>There is no page at this address. <a href="#/">Back to the overview</a>.</p>`;
}
