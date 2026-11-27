// Router and interactions. Hash routes, no network: every page is rendered
// from the data already in this site.
//
//   #/              overview        #/jobs     jobs & prices
//   #/economy       economy         #/income   income
//   #/population    population      #/sources  sources & method
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { overview, economy, population, jobs, income, sources, missing } from './views.js';
import { STATES, csvText, fmtPop, stateShare } from './data.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-route]')];
let econMode = 'level';
let popSort = 'pop';

function setActive(route) {
  for (const a of navLinks) a.classList.toggle('active', a.getAttribute('href') === '#/' + route);
  document.querySelector('header .brand').classList.toggle('active', route === '');
}

function downloadCsv() {
  const blob = new Blob([csvText()], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'us-national-statistics.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function wireOverview() {
  const q = document.getElementById('q');
  if (!q) return;
  const cards = [...document.querySelectorAll('.kpi')];
  const count = document.getElementById('q-count');
  const none = document.getElementById('no-match');
  q.addEventListener('input', () => {
    const needle = q.value.trim().toLowerCase();
    let shown = 0;
    for (const c of cards) {
      const hit = !needle || c.dataset.kpi.includes(needle);
      c.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    }
    count.textContent = needle ? `${shown} of ${cards.length} indicators` : '';
    none.hidden = shown !== 0;
  });
}

function wireEconomy() {
  for (const b of document.querySelectorAll('[data-mode]')) {
    b.addEventListener('click', () => {
      econMode = b.dataset.mode;
      render();
    });
  }
  const dl = document.getElementById('dl-csv');
  if (dl) dl.addEventListener('click', downloadCsv);
}

function wirePopulation() {
  const q = document.getElementById('state-q');
  if (q) {
    // Filter rows in place: re-rendering here would rebuild the input and
    // steal focus on every keystroke.
    q.addEventListener('input', () => {
      const needle = q.value.trim().toLowerCase();
      let shown = 0;
      for (const row of document.querySelectorAll('tr[data-state]')) {
        const hit = !needle || row.dataset.state.toLowerCase().includes(needle);
        row.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      }
      const body = document.querySelector('.tbl tbody');
      let empty = document.getElementById('state-empty');
      if (shown === 0 && !empty) {
        empty = document.createElement('tr');
        empty.id = 'state-empty';
        empty.innerHTML = `<td colspan="4">No state matches that search. Try part of a name, e.g. “York”.</td>`;
        body.appendChild(empty);
      } else if (shown > 0 && empty) {
        empty.remove();
      }
    });
  }
  for (const b of document.querySelectorAll('[data-sort]')) {
    b.addEventListener('click', () => {
      popSort = b.dataset.sort;
      // Sorting re-renders the table, so any in-place search text is dropped
      // with it rather than silently filtering the fresh rows.
      location.hash = '#/population?sort=' + popSort;
    });
  }
  const detail = document.getElementById('state-detail');
  for (const row of document.querySelectorAll('tr[data-state]')) {
    row.addEventListener('click', () => {
      const pop = Number(row.dataset.pop);
      detail.textContent = `${row.dataset.state}: ${fmtPop(pop)} people — ${stateShare(pop).toFixed(2)}% of the United States.`;
    });
  }
  const out = document.getElementById('cmp-out');
  const aSel = document.getElementById('cmp-a');
  const bSel = document.getElementById('cmp-b');
  const updateCmp = () => {
    if (!out || !aSel || !bSel) return;
    const a = STATES.find((s) => s.pop2024 === Number(aSel.value));
    const b = STATES.find((s) => s.pop2024 === Number(bSel.value));
    if (!a || !b) return;
    if (a.state === b.state) {
      out.textContent = 'Pick two different states to compare them.';
      return;
    }
    const bigger = a.pop2024 > b.pop2024 ? a : b;
    const smaller = a.pop2024 > b.pop2024 ? b : a;
    const diff = fmtPop(bigger.pop2024 - smaller.pop2024);
    out.textContent = `${bigger.state} (${fmtPop(bigger.pop2024)}) is larger than ${smaller.state} (${fmtPop(smaller.pop2024)}) by ${diff} — ${stateShare(bigger.pop2024).toFixed(1)}% of the US vs ${stateShare(smaller.pop2024).toFixed(1)}%.`;
  };
  if (aSel) aSel.addEventListener('change', updateCmp);
  if (bSel) bSel.addEventListener('change', updateCmp);
  updateCmp();
}

function wireSources() {
  const dl = document.getElementById('dl-csv');
  if (dl) dl.addEventListener('click', downloadCsv);
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const [, path = '', queryString = ''] = hash.match(/^#\/([^?]*)(?:\?(.*))?$/) || [];
  const params = new URLSearchParams(queryString);
  let html;
  let title;
  if (path === '' || path === undefined) {
    html = overview();
    title = 'America by the Numbers — US National Statistics';
  } else if (path === 'economy') {
    html = economy(econMode);
    title = 'Economy — America by the Numbers';
  } else if (path === 'population') {
    popSort = params.get('sort') || popSort;
    html = population(popSort, params.get('q') || '');
    title = 'Population — America by the Numbers';
  } else if (path === 'jobs') {
    html = jobs();
    title = 'Jobs & Prices — America by the Numbers';
  } else if (path === 'income') {
    html = income();
    title = 'Income — America by the Numbers';
  } else if (path === 'sources') {
    html = sources();
    title = 'Sources & Method — America by the Numbers';
  } else {
    html = missing();
    title = 'Not found — America by the Numbers';
  }
  document.title = title;
  app.innerHTML = html;
  setActive(path === '' ? '' : path);
  if (path === '' || path === undefined) wireOverview();
  if (path === 'economy') wireEconomy();
  if (path === 'population') wirePopulation();
  if (path === 'sources') wireSources();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
