// United States national statistics — every figure below is a published official
// figure with its year and source. Nothing here is estimated by this site.
// Figures the data pack could not verify (federal debt, trade balance) are
// deliberately absent: a missing figure is better than an invented one.

export const META = {
  country: 'United States',
  updated: 'November 2026',
  note: 'Independent visualisation of public official statistics. Not affiliated with the BEA, the Census Bureau or the BLS.',
};

export const KPI = [
  { id: 'gdp', label: 'Nominal GDP', value: '$30.86T', year: '2025', change: '+$1.48T on 2024', source: 'BEA, NIPA Table 1.1.5' },
  { id: 'gdp-pc', label: 'GDP per capita', value: '$90,027', year: '2025', change: 'World Bank WDI basis', source: 'World Bank WDI / BEA' },
  { id: 'pop', label: 'Total population', value: '340.1m', year: '1 Jul 2024', change: '+3.3m (+0.98%) on 2023', source: 'Census Bureau, Vintage 2024' },
  { id: 'unemp', label: 'Unemployment rate', value: '4.1%', year: 'Oct 2026', change: 'Sep 2026: 4.2%', source: 'BLS Employment Situation' },
  { id: 'income', label: 'Median household income', value: '$81,604', year: '2024', change: '+2% in real terms', source: 'Census Bureau, ACS 1-year' },
  { id: 'poverty', label: 'Poverty rate', value: '10.6%', year: '2024', change: 'Uninsured rate: 8.0%', source: 'Census Bureau, CPS ASEC' },
];

// Nominal GDP, current dollars, BEA 2026 annual revision (released 30 Sep 2026).
export const GDP_YEARS = [
  { year: 2022, nominal: 26.06, realGrowth: null },
  { year: 2023, nominal: 27.83, realGrowth: null },
  { year: 2024, nominal: 29.38, realGrowth: 3.0 },
  { year: 2025, nominal: 30.86, realGrowth: 2.3 },
];

// Q3 2026 is a quarterly annualised figure, never an annual GDP. Kept separate.
export const GDP_Q3_2026 = { nominalAnnualised: 33.01, realGrowthAnnualised: 4.3 };

export const POPULATION = [
  { year: 2023, total: 336.8 },
  { year: 2024, total: 340.1 },
];

export const POPULATION_STORY = {
  growth: 3.3,
  growthPct: 0.98,
  netMigration: 2.8,
  migrationShare: 84,
  note: 'Fastest annual growth since 2001. Net international migration (+2.8m) supplied 84% of the increase; the rest is natural increase. The 2024 vintage counts humanitarian arrivals under a new method.',
};

// Ten largest states, Census Bureau Vintage 2024 estimates, 1 Jul 2024.
export const STATES = [
  { rank: 1, state: 'California', pop: 39431263 },
  { rank: 2, state: 'Texas', pop: 31290831 },
  { rank: 3, state: 'Florida', pop: 23372215 },
  { rank: 4, state: 'New York', pop: 19867248 },
  { rank: 5, state: 'Pennsylvania', pop: 13078751 },
  { rank: 6, state: 'Illinois', pop: 12710158 },
  { rank: 7, state: 'Ohio', pop: 11883304 },
  { rank: 8, state: 'Georgia', pop: 11180878 },
  { rank: 9, state: 'North Carolina', pop: 11046024 },
  { rank: 10, state: 'Michigan', pop: 10140459 },
];

export const JOBS = {
  unemployment: [
    { month: 'Sep 2026', rate: 4.2 },
    { month: 'Oct 2026', rate: 4.1 },
  ],
  nonfarm: 165000,
  nonfarmLabel: '+165,000 nonfarm payroll jobs in October 2026',
  cpi: { mom: 0.4, coreMom: 0.3, month: 'October 2026' },
  cpiNote:
    'No year-on-year CPI figure is published for October 2026: the October 2025 federal shutdown left the BLS without enough collected prices, so no 12-month change was released. This site shows the monthly change instead of inventing one.',
};

export const INCOME = {
  median: 81604,
  medianYear: 2024,
  survey: 'American Community Survey (ACS), 1-year estimates',
  distribution: [
    { band: 'Under $50,000', share: 30.6 },
    { band: '$50,000 – $100,000', share: 28.2, derived: true },
    { band: 'Over $100,000', share: 41.2 },
  ],
  highest: { state: 'Massachusetts', value: 104800 },
  lowest: { state: 'Mississippi', value: 59100 },
  poverty: 10.6,
  uninsured: 8.0,
  surveyNote:
    'The CPS ASEC survey puts median household income at $83,730 for 2024 — a different survey with a different method from the ACS figure above. This site uses the ACS figure throughout and never mixes the two.',
};

export const SOURCES = [
  { figure: 'Nominal GDP 2022–2025', value: '$26.06T – $30.86T', source: 'Bureau of Economic Analysis (BEA)', detail: 'NIPA Table 1.1.5, 2026 annual revision, released 30 Sep 2026' },
  { figure: 'Real GDP growth', value: '2024 +3.0%, 2025 +2.3%', source: 'Bureau of Economic Analysis (BEA)', detail: 'NIPA Table 1.1.5, 2026 annual revision' },
  { figure: 'GDP per capita 2025', value: '$90,027', source: 'World Bank', detail: 'World Development Indicators, BEA-basis GDP divided by population' },
  { figure: 'Total population', value: '340.1m at 1 Jul 2024', source: 'U.S. Census Bureau', detail: 'Vintage 2024 population estimates; 2023: 336.8m' },
  { figure: 'Largest states', value: 'California 39.43m – Michigan 10.14m', source: 'U.S. Census Bureau', detail: 'Vintage 2024 state estimates, 1 Jul 2024' },
  { figure: 'Unemployment rate', value: '4.1% in Oct 2026', source: 'Bureau of Labor Statistics (BLS)', detail: 'Employment Situation, released 6 Nov 2026; Sep 2026: 4.2%' },
  { figure: 'Nonfarm payrolls', value: '+165,000 in Oct 2026', source: 'Bureau of Labor Statistics (BLS)', detail: 'Employment Situation, released 6 Nov 2026' },
  { figure: 'Consumer prices', value: '+0.4% MoM, core +0.3%', source: 'Bureau of Labor Statistics (BLS)', detail: 'CPI release, 10 Nov 2026; no year-on-year figure published' },
  { figure: 'Median household income', value: '$81,604 in 2024', source: 'U.S. Census Bureau', detail: 'American Community Survey, 1-year estimates' },
  { figure: 'Poverty & uninsured rates', value: '10.6% and 8.0% in 2024', source: 'U.S. Census Bureau', detail: 'Current Population Survey, Annual Social and Economic Supplement' },
];

export function stateShare(pop) {
  return (pop / 340100000) * 100;
}

export function fmtPop(pop) {
  return (pop / 1000000).toFixed(2) + 'm';
}

export function csvText() {
  const lines = ['United States national statistics — sources: BEA, Census Bureau, BLS, World Bank'];
  lines.push('', 'Nominal GDP ($ trillion), BEA NIPA Table 1.1.5');
  lines.push('year,nominal_gdp_trillion,real_growth_pct');
  for (const g of GDP_YEARS) lines.push(`${g.year},${g.nominal.toFixed(2)},${g.realGrowth === null ? '' : g.realGrowth.toFixed(1)}`);
  lines.push('', 'Population (million), Census Vintage 2024');
  lines.push('year,population_million');
  for (const p of POPULATION) lines.push(`${p.year},${p.total.toFixed(1)}`);
  lines.push('', 'Largest states, Census Vintage 2024, 1 Jul 2024');
  lines.push('rank,state,population');
  for (const s of STATES) lines.push(`${s.rank},${s.state},${s.pop}`);
  return lines.join('\n') + '\n';
}
