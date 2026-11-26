// Small dependency-free SVG charts. Every chart is drawn from data.js, so the
// numbers on screen are the numbers in the data file — nothing hand-typed twice.

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// Vertical bars with value labels. values: [{label, value, display}]
export function barChart(values, { height = 220, color = '#0f2a44', accent = '#e8a33d', unit = '' } = {}) {
  const w = 560;
  const padL = 8;
  const padB = 34;
  const padT = 30;
  const max = Math.max(...values.map((v) => v.value));
  const min = Math.min(0, ...values.map((v) => v.value));
  const span = max - min || 1;
  const bw = (w - padL * 2) / values.length;
  const barW = Math.min(64, bw * 0.58);
  const y = (v) => padT + (1 - (v - min) / span) * (height - padT - padB);
  const bars = values
    .map((v, i) => {
      const x = padL + bw * i + (bw - barW) / 2;
      const top = y(Math.max(v.value, 0));
      const bottom = y(0);
      const h = Math.max(2, bottom - top);
      const fill = i === values.length - 1 ? accent : color;
      return `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="3" fill="${fill}"/>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${(top - 8).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#17222e">${esc(v.display)}</text>` +
        `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#5a6b7d">${esc(v.label)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${height}" width="100%" role="img" aria-label="Bar chart, ${esc(unit)}">${bars}` +
    `<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${w - padL}" y2="${y(0).toFixed(1)}" stroke="#c9d3dd" stroke-width="1"/></svg>`;
}

// Horizontal bars for shares (0–100). values: [{label, value, display}]
export function hbarChart(values, { height = 200 } = {}) {
  const w = 560;
  const rowH = height / values.length;
  const rows = values
    .map((v, i) => {
      const y = i * rowH + rowH / 2;
      const barW = (v.value / 100) * (w - 170);
      return `<text x="0" y="${(y + 4).toFixed(1)}" font-size="12.5" fill="#17222e">${esc(v.label)}</text>` +
        `<rect x="150" y="${(y - 9).toFixed(1)}" width="${Math.max(2, barW).toFixed(1)}" height="18" rx="3" fill="${i === 0 ? '#e8a33d' : '#0f2a44'}"/>` +
        `<text x="${(150 + Math.max(2, barW) + 8).toFixed(1)}" y="${(y + 4).toFixed(1)}" font-size="12.5" font-weight="700" fill="#17222e">${esc(v.display)}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${height}" width="100%" role="img" aria-label="Horizontal bar chart">${rows}</svg>`;
}

// Simple two-point slope chart for population.
export function slopeChart(points, { height = 200 } = {}) {
  const w = 560;
  const padL = 70;
  const padR = 70;
  const padT = 30;
  const padB = 34;
  const min = Math.min(...points.map((p) => p.value)) - 1;
  const max = Math.max(...points.map((p) => p.value)) + 1;
  const x = (i) => padL + (i * (w - padL - padR)) / (points.length - 1);
  const y = (v) => padT + (1 - (v - min) / (max - min)) * (height - padT - padB);
  const dots = points
    .map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="6" fill="#e8a33d" stroke="#0f2a44" stroke-width="2"/>` +
      `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 14).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="#17222e">${esc(p.display)}</text>` +
      `<text x="${x(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#5a6b7d">${esc(p.label)}</text>`)
    .join('');
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${height}" width="100%" role="img" aria-label="Population trend"><path d="${line}" fill="none" stroke="#0f2a44" stroke-width="3"/>${dots}</svg>`;
}
