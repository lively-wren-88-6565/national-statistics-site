// United States national statistics — every figure below is a published official
// figure with its year and source. Nothing here is estimated by this site.
// Figures the author could not verify (federal debt, trade balance, state
// median incomes beyond the two published extremes) are deliberately absent:
// a missing figure is better than an invented one.
//
// Series and their publishers: GDP is the BEA's (FRED republishes it as
// GDPA); unemployment and CPI are the BLS's (FRED: UNRATE, CPIAUCSL);
// population is the Census Bureau's Vintage 2024 estimates (table
// NST-EST2024-POP). Where FRED republishes a series, the publisher named
// here is the agency that produced it.

export const META = {
  country: 'United States',
  updated: 'November 2026',
  note: 'Independent visualisation of public official statistics. Not affiliated with the BEA, the Census Bureau or the BLS.',
};

export const KPI = [
  { id: 'gdp', label: 'Nominal GDP', value: '$30.86T', year: '2025', change: '+$1.48T on 2024', source: 'BEA, NIPA Table 1.1.5' },
  { id: 'gdp-pc', label: 'GDP per capita', value: '$90,027', year: '2025', change: 'World Bank WDI basis', source: 'World Bank WDI / BEA' },
  { id: 'pop', label: 'Total population', value: '340.1m', year: '1 Jul 2024', change: '+3.3m (+0.98%) on 2023', source: 'Census Bureau, Vintage 2024' },
  { id: 'unemp', label: 'Unemployment rate', value: '4.1%', year: 'Oct 2026', change: 'Under 4.5% since Jan 2024', source: 'BLS Employment Situation' },
  { id: 'income', label: 'Median household income', value: '$81,604', year: '2024', change: '+2% in real terms', source: 'Census Bureau, ACS 1-year' },
  { id: 'poverty', label: 'Poverty rate', value: '10.6%', year: '2024', change: 'Uninsured rate: 8.0%', source: 'Census Bureau, CPS ASEC' },
];

// Nominal GDP, current dollars, $ trillion. BEA NIPA Table 1.1.5, 2026
// annual revision (released 30 Sep 2026), via FRED GDPA.
export const GDP_YEARS = [
  { year: 2015, nominal: 18.3, realGrowth: null },
  { year: 2016, nominal: 18.8, realGrowth: null },
  { year: 2017, nominal: 19.61, realGrowth: null },
  { year: 2018, nominal: 20.66, realGrowth: null },
  { year: 2019, nominal: 21.54, realGrowth: null },
  { year: 2020, nominal: 21.38, realGrowth: null },
  { year: 2021, nominal: 23.75, realGrowth: null },
  { year: 2022, nominal: 26.06, realGrowth: null },
  { year: 2023, nominal: 27.83, realGrowth: null },
  { year: 2024, nominal: 29.38, realGrowth: 3.0 },
  { year: 2025, nominal: 30.86, realGrowth: 2.3 },
];

// Q3 2026 is a quarterly annualised figure, never an annual GDP. Kept separate.
export const GDP_Q3_2026 = { nominalAnnualised: 33.01, realGrowthAnnualised: 4.3 };

// Resident population, 1 July, millions. Census Bureau Vintage 2024
// (NST-EST2024-POP): 2020 331.6, 2021 332.1, 2022 334.0, 2023 336.8, 2024 340.1.
export const POPULATION = [
  { year: 2020, total: 331.6 },
  { year: 2021, total: 332.1 },
  { year: 2022, total: 334.0 },
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

// All 50 states plus the District of Columbia, ranked by 1 July 2024
// population. Census Bureau Vintage 2024 (NST-EST2024-POP). The 51 rows sum
// exactly to the national total, 340,110,988. Puerto Rico (3,203,295 in
// 2024, a territory, not a state) is not ranked with the states.
export const STATES = [
  { rank: 1, state: 'California', pop2023: 39198693, pop2024: 39431263 },
  { rank: 2, state: 'Texas', pop2023: 30727890, pop2024: 31290831 },
  { rank: 3, state: 'Florida', pop2023: 22904868, pop2024: 23372215 },
  { rank: 4, state: 'New York', pop2023: 19737367, pop2024: 19867248 },
  { rank: 5, state: 'Pennsylvania', pop2023: 13017721, pop2024: 13078751 },
  { rank: 6, state: 'Illinois', pop2023: 12642259, pop2024: 12710158 },
  { rank: 7, state: 'Ohio', pop2023: 11824034, pop2024: 11883304 },
  { rank: 8, state: 'Georgia', pop2023: 11064432, pop2024: 11180878 },
  { rank: 9, state: 'North Carolina', pop2023: 10881189, pop2024: 11046024 },
  { rank: 10, state: 'Michigan', pop2023: 10083356, pop2024: 10140459 },
  { rank: 11, state: 'New Jersey', pop2023: 9379642, pop2024: 9500851 },
  { rank: 12, state: 'Virginia', pop2023: 8734685, pop2024: 8811195 },
  { rank: 13, state: 'Washington', pop2023: 7857320, pop2024: 7958180 },
  { rank: 14, state: 'Arizona', pop2023: 7473027, pop2024: 7582384 },
  { rank: 15, state: 'Tennessee', pop2023: 7148304, pop2024: 7227750 },
  { rank: 16, state: 'Massachusetts', pop2023: 7066568, pop2024: 7136171 },
  { rank: 17, state: 'Indiana', pop2023: 6880131, pop2024: 6924275 },
  { rank: 18, state: 'Maryland', pop2023: 6217062, pop2024: 6263220 },
  { rank: 19, state: 'Missouri', pop2023: 6208038, pop2024: 6245466 },
  { rank: 20, state: 'Wisconsin', pop2023: 5930405, pop2024: 5960975 },
  { rank: 21, state: 'Colorado', pop2023: 5901339, pop2024: 5957493 },
  { rank: 22, state: 'Minnesota', pop2023: 5753048, pop2024: 5793151 },
  { rank: 23, state: 'South Carolina', pop2023: 5387830, pop2024: 5478831 },
  { rank: 24, state: 'Alabama', pop2023: 5117673, pop2024: 5157699 },
  { rank: 25, state: 'Louisiana', pop2023: 4588071, pop2024: 4597740 },
  { rank: 26, state: 'Kentucky', pop2023: 4550595, pop2024: 4588372 },
  { rank: 27, state: 'Oregon', pop2023: 4253653, pop2024: 4272371 },
  { rank: 28, state: 'Oklahoma', pop2023: 4063882, pop2024: 4095393 },
  { rank: 29, state: 'Connecticut', pop2023: 3643023, pop2024: 3675069 },
  { rank: 30, state: 'Utah', pop2023: 3443222, pop2024: 3503613 },
  { rank: 31, state: 'Nevada', pop2023: 3214363, pop2024: 3267467 },
  { rank: 32, state: 'Iowa', pop2023: 3218414, pop2024: 3241488 },
  { rank: 33, state: 'Arkansas', pop2023: 3069463, pop2024: 3088354 },
  { rank: 34, state: 'Kansas', pop2023: 2951500, pop2024: 2970606 },
  { rank: 35, state: 'Mississippi', pop2023: 2943172, pop2024: 2943045 },
  { rank: 36, state: 'New Mexico', pop2023: 2121164, pop2024: 2130256 },
  { rank: 37, state: 'Nebraska', pop2023: 1987864, pop2024: 2005465 },
  { rank: 38, state: 'Idaho', pop2023: 1971122, pop2024: 2001619 },
  { rank: 39, state: 'West Virginia', pop2023: 1770495, pop2024: 1769979 },
  { rank: 40, state: 'Hawaii', pop2023: 1441387, pop2024: 1446146 },
  { rank: 41, state: 'New Hampshire', pop2023: 1402199, pop2024: 1409032 },
  { rank: 42, state: 'Maine', pop2023: 1399646, pop2024: 1405012 },
  { rank: 43, state: 'Montana', pop2023: 1131302, pop2024: 1137233 },
  { rank: 44, state: 'Rhode Island', pop2023: 1103429, pop2024: 1112308 },
  { rank: 45, state: 'Delaware', pop2023: 1036423, pop2024: 1051917 },
  { rank: 46, state: 'South Dakota', pop2023: 918305, pop2024: 924669 },
  { rank: 47, state: 'North Dakota', pop2023: 789047, pop2024: 796568 },
  { rank: 48, state: 'Alaska', pop2023: 736510, pop2024: 740133 },
  { rank: 49, state: 'District of Columbia', pop2023: 687324, pop2024: 702250 },
  { rank: 50, state: 'Vermont', pop2023: 648708, pop2024: 648493 },
  { rank: 51, state: 'Wyoming', pop2023: 585067, pop2024: 587618 },
];

// Unemployment rate, %, monthly, seasonally adjusted. BLS via FRED UNRATE.
// October 2025 has no value: the federal shutdown stopped collection that
// month, so the series has a one-month gap — shown as a break, not a zero.
export const UNEMPLOYMENT = [
  { m: 'Jan 24', rate: 3.7 }, { m: 'Feb 24', rate: 3.9 }, { m: 'Mar 24', rate: 3.9 },
  { m: 'Apr 24', rate: 3.9 }, { m: 'May 24', rate: 3.9 }, { m: 'Jun 24', rate: 4.1 },
  { m: 'Jul 24', rate: 4.2 }, { m: 'Aug 24', rate: 4.2 }, { m: 'Sep 24', rate: 4.1 },
  { m: 'Oct 24', rate: 4.1 }, { m: 'Nov 24', rate: 4.2 }, { m: 'Dec 24', rate: 4.1 },
  { m: 'Jan 25', rate: 4.0 }, { m: 'Feb 25', rate: 4.2 }, { m: 'Mar 25', rate: 4.2 },
  { m: 'Apr 25', rate: 4.2 }, { m: 'May 25', rate: 4.3 }, { m: 'Jun 25', rate: 4.1 },
  { m: 'Jul 25', rate: 4.3 }, { m: 'Aug 25', rate: 4.3 }, { m: 'Sep 25', rate: 4.4 },
  { m: 'Oct 25', rate: null }, { m: 'Nov 25', rate: 4.5 }, { m: 'Dec 25', rate: 4.4 },
  { m: 'Jan 26', rate: 4.3 }, { m: 'Feb 26', rate: 4.4 }, { m: 'Mar 26', rate: 4.3 },
  { m: 'Apr 26', rate: 4.3 }, { m: 'May 26', rate: 4.3 }, { m: 'Jun 26', rate: 4.2 },
  { m: 'Jul 26', rate: 4.1 }, { m: 'Aug 26', rate: 4.1 }, { m: 'Sep 26', rate: 4.2 },
  { m: 'Oct 26', rate: 4.1 },
];

// CPI month-on-month change, %, computed from the BLS CPI index (CPIAUCSL:
// Dec 2025 326.031, then 2026: 326.588, 327.460, 330.293, 332.407, 333.979,
// 332.568, 332.813, 334.131, 336.298, 337.476). October 2026 +0.35% rounds
// to the +0.4% the BLS release reports.
export const CPI_MOM = [
  { m: 'Dec 25', mom: 0.3 }, { m: 'Jan 26', mom: 0.17 }, { m: 'Feb 26', mom: 0.27 },
  { m: 'Mar 26', mom: 0.87 }, { m: 'Apr 26', mom: 0.64 }, { m: 'May 26', mom: 0.47 },
  { m: 'Jun 26', mom: -0.42 }, { m: 'Jul 26', mom: 0.07 }, { m: 'Aug 26', mom: 0.4 },
  { m: 'Sep 26', mom: 0.65 }, { m: 'Oct 26', mom: 0.35 },
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

// Findings the data supports, each checkable from the tables on this site.
export const FINDINGS = [
  { head: 'Three states hold 27.7% of the country', body: 'California (39.4m), Texas (31.3m) and Florida (23.4m) together are 94.1 million people — more than the 30 smallest states combined.' },
  { head: 'Texas added the most people', body: 'Texas grew by 562,941 in the year to July 2024. Florida grew fastest among large states (+2.04%); the District of Columbia grew fastest overall (+2.17%).' },
  { head: 'The economy shrank in only one year since 2015', body: 'Nominal GDP rose from $18.30T in 2015 to $30.86T in 2025. The single down year was 2020, $21.54T to $21.38T in the pandemic.' },
  { head: 'Unemployment never topped 4.5%', body: 'From January 2024 to October 2026 the rate stayed between 3.7% and 4.5% — 34 months, with one missing month (October 2025, shutdown).' },
];

export const SOURCES = [
  { figure: 'Nominal GDP 2015–2025', value: '$18.30T – $30.86T', source: 'Bureau of Economic Analysis (BEA)', detail: 'NIPA Table 1.1.5, 2026 annual revision, released 30 Sep 2026' },
  { figure: 'Real GDP growth', value: '2024 +3.0%, 2025 +2.3%', source: 'Bureau of Economic Analysis (BEA)', detail: 'NIPA Table 1.1.5, 2026 annual revision' },
  { figure: 'GDP per capita 2025', value: '$90,027', source: 'World Bank', detail: 'World Development Indicators, BEA-basis GDP divided by population' },
  { figure: 'Total population', value: '340.1m at 1 Jul 2024', source: 'U.S. Census Bureau', detail: 'Vintage 2024 population estimates (NST-EST2024-POP); 2020: 331.6m' },
  { figure: 'States, 50 + DC', value: 'California 39.43m – Wyoming 0.59m', source: 'U.S. Census Bureau', detail: 'Vintage 2024 state estimates (NST-EST2024-POP), 1 Jul 2024; rows sum to the national total' },
  { figure: 'Unemployment rate, monthly', value: '3.7% – 4.5%, Jan 2024 – Oct 2026', source: 'Bureau of Labor Statistics (BLS)', detail: 'Employment Situation / UNRATE, seasonally adjusted; Oct 2025 missing (shutdown)' },
  { figure: 'Nonfarm payrolls', value: '+165,000 in Oct 2026', source: 'Bureau of Labor Statistics (BLS)', detail: 'Employment Situation, released 6 Nov 2026' },
  { figure: 'Consumer prices', value: '+0.4% MoM, core +0.3%', source: 'Bureau of Labor Statistics (BLS)', detail: 'CPI release, 10 Nov 2026; monthly changes computed from the CPI index (CPIAUCSL); no year-on-year figure published' },
  { figure: 'Median household income', value: '$81,604 in 2024', source: 'U.S. Census Bureau', detail: 'American Community Survey, 1-year estimates' },
  { figure: 'Poverty & uninsured rates', value: '10.6% and 8.0% in 2024', source: 'U.S. Census Bureau', detail: 'Current Population Survey, Annual Social and Economic Supplement' },
];

export function stateShare(pop) {
  return (pop / 340110988) * 100;
}

export function stateGrowth(s) {
  return 100 * (s.pop2024 - s.pop2023) / s.pop2023;
}

export function fmtPop(pop) {
  return (pop / 1000000).toFixed(2) + 'm';
}

export function csvText() {
  const lines = ['United States national statistics — sources: BEA, Census Bureau, BLS, World Bank'];
  lines.push('', 'Nominal GDP ($ trillion), BEA NIPA Table 1.1.5');
  lines.push('year,nominal_gdp_trillion,real_growth_pct');
  for (const g of GDP_YEARS) lines.push(`${g.year},${g.nominal.toFixed(2)},${g.realGrowth === null ? '' : g.realGrowth.toFixed(1)}`);
  lines.push('', 'Population (million), Census Vintage 2024, 1 July');
  lines.push('year,population_million');
  for (const p of POPULATION) lines.push(`${p.year},${p.total.toFixed(1)}`);
  lines.push('', 'States and DC, Census Vintage 2024, 1 July');
  lines.push('rank,state,population_2023,population_2024');
  for (const s of STATES) lines.push(`${s.rank},${s.state},${s.pop2023},${s.pop2024}`);
  lines.push('', 'Unemployment rate (%), BLS, seasonally adjusted');
  lines.push('month,rate_pct');
  for (const u of UNEMPLOYMENT) lines.push(`${u.m},${u.rate === null ? '' : u.rate.toFixed(1)}`);
  return lines.join('\n') + '\n';
}
