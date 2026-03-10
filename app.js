// =============================================
// KKS Available Studios — App Logic
// =============================================

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let allStudios = [];
let activeLocation = 'all';

// ---- DOM refs ----
const loadingEl   = document.getElementById('loading');
const errorEl     = document.getElementById('error-state');
const gridEl      = document.getElementById('studios-grid');
const noVacEl     = document.getElementById('no-vacancies');
const tabs        = document.querySelectorAll('.tab');

// ---- Tab switching ----
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeLocation = tab.dataset.location;
    renderStudios();
  });
});

// ---- Fetch from Supabase ----
async function fetchStudios() {
  try {
    const { data, error } = await db
      .from('studios')
      .select('*')
      .eq('status', 'vacant')
      .order('location')
      .order('id');

    if (error) throw error;

    allStudios = data || [];
    loadingEl.style.display = 'none';
    gridEl.style.display = 'grid';
    renderStudios();
  } catch (err) {
    console.error('Supabase error:', err);
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
  }
}

// ---- Render ----
function renderStudios() {
  const filtered = activeLocation === 'all'
    ? allStudios
    : allStudios.filter(s => s.location === activeLocation);

  gridEl.innerHTML = '';

  if (filtered.length === 0) {
    gridEl.style.display = 'none';
    noVacEl.style.display = 'block';
    return;
  }

  gridEl.style.display = 'grid';
  noVacEl.style.display = 'none';

  filtered.forEach(studio => {
    const card = document.createElement('div');
    card.className = 'studio-card';
    card.innerHTML = `
      <span class="vacant-badge">Available</span>
      <div class="studio-label">Studio</div>
      <div class="studio-id">${escHtml(studio.id)}</div>
      <div class="studio-location">${escHtml(studio.location)}</div>
      ${studio.sqft
        ? `<div class="studio-sqft">${studio.sqft} sq ft</div>`
        : ''}
      ${studio.dims
        ? `<div class="studio-dims">${escHtml(studio.dims)}</div>`
        : ''}
      ${studio.rent
        ? `<div class="studio-rent">$${studio.rent.toLocaleString()}<span>/ month</span></div>`
        : `<div class="studio-rent" style="color:var(--text-dim);font-size:0.85rem">Rent on request</div>`}
      ${studio.notes
        ? `<div class="studio-notes">${escHtml(studio.notes)}</div>`
        : ''}
    `;
    gridEl.appendChild(card);
  });
}

// ---- Utility ----
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- Init ----
fetchStudios();
