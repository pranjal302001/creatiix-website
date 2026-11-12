// Search, filters and enquiry form for the Urban Nest demo site.
const state = { deal: 'Buy', area: '', type: '', budget: 0 };
const $ = (id) => document.getElementById(id);
const areas = [...new Set(LISTINGS.map((l) => l.area))].sort();

const BUDGETS = {
  Buy: [[0, 'Any budget'], [10000000, '₹1 Cr'], [15000000, '₹1.5 Cr'], [25000000, '₹2.5 Cr'], [40000000, '₹4 Cr'], [70000000, '₹7 Cr']],
  Rent: [[0, 'Any budget'], [50000, '₹50,000'], [100000, '₹1 Lakh'], [150000, '₹1.5 Lakh'], [200000, '₹2 Lakh']],
};

function fillBudget() {
  $('f-budget').innerHTML = BUDGETS[state.deal].map(([v, t]) => `<option value="${v}">${t}</option>`).join('');
  state.budget = 0;
}

function matches(l) {
  if (l.deal !== state.deal) return false;
  if (state.area && l.area !== state.area) return false;
  if (state.type && String(l.bhk || l.type) !== state.type) return false;
  if (state.budget && l.price > state.budget) return false;
  return true;
}

function render() {
  const list = LISTINGS.filter(matches);
  $('count').textContent = `${list.length} ${list.length === 1 ? 'property' : 'properties'} to ${state.deal.toLowerCase()}`;
  $('grid').innerHTML = list.length ? list.map((l) => `
    <a class="card" href="property.html?id=${l.id}">
      <div class="ph"><img src="${l.img}" alt="" loading="lazy"><span class="badge ${l.deal === 'Rent' ? 'rent' : ''}">For ${l.deal === 'Buy' ? 'sale' : 'rent'}</span></div>
      <div class="body">
        <span class="price">${formatPrice(l)}</span>
        <h3>${l.title}</h3>
        <span class="meta">${l.area} · ${sizeLabel(l)} · ${l.sqft} sq ft carpet</span>
        <div class="tags">${l.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </div>
    </a>`).join('') : '<p class="empty">No properties match these filters yet. Try another area or a higher budget.</p>';
}

$('f-area').insertAdjacentHTML('beforeend', areas.map((a) => `<option>${a}</option>`).join(''));
$('area-chips').innerHTML = areas.map((a) => `<button type="button" data-area="${a}">${a}</button>`).join('');

document.querySelectorAll('[data-deal]').forEach((b) => b.addEventListener('click', () => {
  state.deal = b.dataset.deal;
  document.querySelectorAll('[data-deal]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  fillBudget();
  render();
}));
$('f-area').addEventListener('change', (e) => { state.area = e.target.value; render(); });
$('f-type').addEventListener('change', (e) => { state.type = e.target.value; render(); });
$('f-budget').addEventListener('change', (e) => { state.budget = Number(e.target.value); render(); });

// Area chips show every deal type for that area, so the filter never looks empty.
$('area-chips').addEventListener('click', (e) => {
  const area = e.target.dataset.area;
  if (!area) return;
  state.area = area;
  $('f-area').value = area;
  if (!LISTINGS.some((l) => l.area === area && l.deal === state.deal)) {
    document.querySelector(`[data-deal="${state.deal === 'Buy' ? 'Rent' : 'Buy'}"]`).click();
  } else render();
  $('listings').scrollIntoView();
});

$('enquiry').addEventListener('submit', (e) => {
  e.preventDefault();
  $('ok').hidden = false;
  e.target.reset();
});

fillBudget();
render();
