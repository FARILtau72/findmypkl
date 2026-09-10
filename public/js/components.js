// UI Components & Helpers for Find My PKL
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(title, desc = '', type = 'success', duration = 3500) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${desc ? `<div class="toast-desc">${desc}</div>` : ''}
      </div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

const Modal = {
  backdrop: null,

  init() {
    this.backdrop = document.getElementById('global-modal-backdrop');
  },

  open(contentHtml, title = '', size = '', options = {}) {
    this.init();
    if (!this.backdrop) return;

    const dialog = this.backdrop.querySelector('.modal-dialog');
    dialog.classList.remove('modal-lg', 'modal-md', 'modal-loker');
    if (size === 'lg') {
      dialog.classList.add('modal-lg');
    } else if (size === 'md') {
      dialog.classList.add('modal-md');
    } else if (size === 'loker') {
      dialog.classList.add('modal-loker');
    }

    const headerEl = this.backdrop.querySelector('.modal-header');
    const titleEl = this.backdrop.querySelector('#modal-title');
    const bodyEl = this.backdrop.querySelector('#modal-body-content');

    if (options.hideHeader || size === 'loker') {
      if (headerEl) headerEl.style.display = 'none';
    } else {
      if (headerEl) headerEl.style.display = '';
    }

    if (titleEl) titleEl.textContent = title || '';
    bodyEl.innerHTML = contentHtml;
    bodyEl.scrollTop = 0;

    this.backdrop.classList.add('active');
    if (document.body) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
    if (document.documentElement) {
      document.documentElement.classList.add('modal-open');
      document.documentElement.style.overflow = 'hidden';
    }
    if (typeof window !== 'undefined' && window.lenis) {
      try { window.lenis.stop(); } catch (e) {}
    }
  },

  close() {
    this.init();
    if (!this.backdrop) return;
    this.backdrop.classList.remove('active');

    const headerEl = this.backdrop.querySelector('.modal-header');
    if (headerEl) headerEl.style.display = '';

    if (document.body) {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
    if (document.documentElement) {
      document.documentElement.classList.remove('modal-open');
      document.documentElement.style.overflow = '';
    }
    if (typeof window !== 'undefined' && window.lenis) {
      try {
        window.lenis.start();
        window.lenis.resize();
      } catch (e) {}
    }
  }
};

// Global ESC key listener to safely dismiss modals and restore scroll
if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      Modal.close();
      if (window.App && typeof window.App.closeMobileFilterSheet === 'function') {
        window.App.closeMobileFilterSheet();
      }
      if (window.App && typeof window.App.closeSidebar === 'function') {
        window.App.closeSidebar();
      }
    }
  });
}

const Dialog = {
  confirm(title, message, confirmText = 'Lanjutkan', onConfirm) {
    const html = `
      <div style="text-align: center; padding: 12px 0;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background-color: var(--amber-50); color: var(--amber-600); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--slate-900); margin-bottom: 8px;">${title}</h4>
        <p style="font-size: 14px; color: var(--slate-600); margin-bottom: 24px;">${message}</p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-secondary" onclick="Modal.close()">Batal</button>
          <button class="btn btn-primary" id="dialog-confirm-btn">${confirmText}</button>
        </div>
      </div>
    `;

    Modal.open(html, 'Konfirmasi Tindakan');
    document.getElementById('dialog-confirm-btn').addEventListener('click', () => {
      Modal.close();
      if (typeof onConfirm === 'function') onConfirm();
    });
  }
};

function renderBadge(status) {
  let color = 'slate';
  if (['Terverifikasi', 'Diterima Perusahaan', 'Aktif', 'Disetujui Pembimbing', 'Selesai'].includes(status)) {
    color = 'emerald';
  } else if (['Menunggu Verifikasi', 'Menunggu Verifikasi HUBIN', 'Disetujui HUBIN', 'Menunggu Review'].includes(status)) {
    color = 'amber';
  } else if (['Perlu Perbaikan', 'Revisi'].includes(status)) {
    color = 'orange';
  } else if (['Ditolak', 'Ditolak HUBIN', 'Tidak Diterima Perusahaan', 'Dibatalkan'].includes(status)) {
    color = 'rose';
  } else if (['Buka'].includes(status)) {
    color = 'blue';
  }

  return `<span class="badge badge-${color}"><span class="badge-dot"></span>${status}</span>`;
}

function renderEmptyState(title, message, iconSvg = '', buttonHtml = '') {
  return `
    <div class="empty-state card">
      <div class="empty-state-icon">
        ${iconSvg || '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'}
      </div>
      <h3>${title}</h3>
      <p>${message}</p>
      ${buttonHtml}
    </div>
  `;
}

// Authentic Corporate Logos Resolver & Renderer
function getCompanyLogoUrl(item) {
  if (!item) return '/images/logos/default-company.svg';
  if (typeof item === 'string') {
    const name = item.toLowerCase();
    if (name.includes('telkom')) return '/images/logos/telkom.svg';
    if (name.includes('goto') || name.includes('gojek') || name.includes('tokopedia')) return '/images/logos/goto.svg';
    if (name.includes('honda') || name.includes('ahm')) return '/images/logos/ahm.svg';
    if (name.includes('mandiri')) return '/images/logos/mandiri.svg';
    if (name.includes('kumata')) return '/images/logos/kumata.svg';
    if (name.includes('dirgantara') || name.includes('ptdi')) return '/images/logos/ptdi.svg';
    if (name.includes('paragon') || name.includes('wardah')) return '/images/logos/paragon.svg';
    if (name.includes('len')) return '/images/logos/len.svg';
    if (name.includes('kreatif digital')) return '/images/logos/kreatif-digital.svg';
    if (name.includes('astra')) return '/images/logos/astra.svg';
    if (name.includes('glow')) return '/images/logos/glow-design.svg';
    if (name.includes('solusi data')) return '/images/logos/solusi-data.svg';
    if (name.includes('ruang media')) return '/images/logos/ruang-media.svg';
    return '/images/logos/default-company.svg';
  }

  if (item.logo_url) return item.logo_url;
  const name = (item.company_nama || item.nama || '').toLowerCase();
  const initials = (item.logo_initials || '').toUpperCase();

  if (name.includes('telkom') || initials === 'TLK' || initials === 'TLKM') return '/images/logos/telkom.svg';
  if (name.includes('goto') || name.includes('gojek') || name.includes('tokopedia') || initials === 'GOTO') return '/images/logos/goto.svg';
  if (name.includes('honda') || name.includes('ahm') || initials === 'AHM') return '/images/logos/ahm.svg';
  if (name.includes('mandiri') || initials === 'BMRI') return '/images/logos/mandiri.svg';
  if (name.includes('kumata') || initials === 'KMT') return '/images/logos/kumata.svg';
  if (name.includes('dirgantara') || name.includes('ptdi') || initials === 'PTDI') return '/images/logos/ptdi.svg';
  if (name.includes('paragon') || name.includes('wardah') || initials === 'PTI') return '/images/logos/paragon.svg';
  if (name.includes('len') || initials === 'LEN') return '/images/logos/len.svg';
  if (name.includes('kreatif digital') || initials === 'KD') return '/images/logos/kreatif-digital.svg';
  if (name.includes('astra') || initials === 'ASTRA') return '/images/logos/astra.svg';
  if (name.includes('glow') || initials === 'GD') return '/images/logos/glow-design.svg';
  if (name.includes('solusi data') || initials === 'SDI') return '/images/logos/solusi-data.svg';
  if (name.includes('ruang media') || initials === 'RMK') return '/images/logos/ruang-media.svg';
  return '/images/logos/default-company.svg';
}

function renderCompanyLogo(item, options = {}) {
  const url = getCompanyLogoUrl(item);
  const size = options.size || 44;
  const alt = (item && (item.company_nama || item.nama)) || 'Logo Perusahaan';
  const className = options.className || 'company-logo-img';
  return `<img src="${url}" alt="${alt}" class="${className}" style="width: ${size}px; height: ${size}px; object-fit: contain; border-radius: 12px; display: block; flex-shrink: 0;" onerror="this.onerror=null; this.src='/images/logos/default-company.svg';" />`;
}

function renderPklJobCard(j, options = {}) {
  if (!j) return '';

  const isBookmarked = options.isBookmarked !== undefined 
    ? Boolean(options.isBookmarked) 
    : (window.App && window.App.bookmarkedJobs ? window.App.bookmarkedJobs.has(j.id) : false);

  const isPaid = (window.App && typeof window.App.isJobPaid === 'function') 
    ? window.App.isJobPaid(j) 
    : Boolean(j.is_paid || (j.uang_saku && j.uang_saku !== 'Unpaid' && j.uang_saku !== 'Tidak'));

  // Realistic distance & location matching screenshot (e.g. 10km · Duren Sawit)
  const distNum = ((j.id * 1.7) % 8 + 1.2).toFixed(1);
  const rawLoc = j.lokasi_kota || 'Bandung';
  const cleanLoc = rawLoc.split(',')[0].replace(/Kota\s*/i, '').trim();
  const distLocText = `${distNum}km · ${cleanLoc}`;

  // Build tag chips matching the reference screenshot:
  // "1-3 thn", "S1", "Jenjang Karir", "Pelatihan/Sertifikasi", "Makan Gratis"
  const chips = [];
  
  // 1. Durasi
  const durasiBulan = j.durasi_bulan || (j.durasi ? parseInt(j.durasi) : 6) || 6;
  chips.push(`${durasiBulan} bln`);

  // 2. Tingkat (SMK)
  chips.push('SMK');

  // 3. Jurusan / Specialization
  let majorBadge = '';
  if (j.major_code) {
    majorBadge = j.major_code;
  } else if (j.jurusan_target) {
    majorBadge = j.jurusan_target.split(',')[0].replace(/\(.*?\)/g, '').trim();
  }
  if (majorBadge && !chips.includes(majorBadge)) {
    chips.push(majorBadge);
  }

  // 4. Benefit/Perk 1
  const ben = (j.benefit || '') + ' ' + (Array.isArray(j.perks) ? j.perks.join(' ') : '');
  const benLower = ben.toLowerCase();
  if (benLower.includes('makan')) {
    chips.push('Makan Gratis');
  }

  // 5. Benefit/Perk 2
  if (benLower.includes('pelatihan') || benLower.includes('sertifikat')) {
    chips.push('Pelatihan/Sertifikasi');
  } else if (benLower.includes('laptop')) {
    chips.push('Fasilitas Laptop');
  } else {
    chips.push('Jenjang Karir');
  }

  // Company group if applicable
  let compGroup = '';
  if (j.company_nama && !j.company_nama.includes('(')) {
    const compLower = j.company_nama.toLowerCase();
    if (compLower.includes('astra')) compGroup = ' (Astra Group)';
    else if (compLower.includes('goto')) compGroup = ' (GoTo Group)';
    else if (compLower.includes('mandiri')) compGroup = ' (Mandiri Group)';
    else if (compLower.includes('telkom')) compGroup = ' (Telkom Group)';
    else if (compLower.includes('paragon')) compGroup = ' (PTI Group)';
  }

  const cardClass = options.className || 'pkl-job-card';
  const cardId = options.id ? `id="${options.id}"` : '';
  const actionText = options.actionText || 'Daftar';
  const actionCallback = options.actionCallback || `App.showJobDetailModal(${j.id})`;
  const bookmarkCallback = options.bookmarkCallback || `App.toggleBookmark(${j.id})`;

  return `
    <div class="${cardClass}" ${cardId} onclick="App.showJobDetailModal(${j.id})">
      <div class="job-card-top-content">
        <!-- Row 1: Title & Salary / Compensation Status -->
        <div class="job-card-header-row">
          <h3 class="job-card-title" title="${j.judul}">${j.judul}</h3>
          <div class="job-card-salary-box">
            <span class="job-card-salary-text ${isPaid ? 'paid' : 'unpaid'}">
              ${isPaid ? 'Paid' : 'Unpaid'}
            </span>
            <button type="button" class="job-card-bookmark-btn ${isBookmarked ? 'saved active' : ''}" 
              onclick="${bookmarkCallback}; event.stopPropagation();" 
              title="${isBookmarked ? 'Hapus Simpanan' : 'Simpan Lowongan'}">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="${isBookmarked ? '#059669' : 'none'}" stroke="${isBookmarked ? '#059669' : '#94a3b8'}" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Row 2: Verified Icon + Company Name & Distance / Location -->
        <div class="job-card-subhead-row">
          <div class="job-card-comp-verified">
            <span class="job-card-verified-icon" title="Mitra DUDI Terverifikasi">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#059669"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </span>
            <span class="job-card-comp-name" title="${j.company_nama}">${j.company_nama}</span>
          </div>
          <div class="job-card-dist-loc">
            ${distLocText}
          </div>
        </div>

        <!-- Row 3: Tag Chips / Pills -->
        <div class="job-card-chips-row">
          ${chips.map(chip => `<span class="job-tag-pill">${chip}</span>`).join('')}
        </div>
      </div>

      <!-- Row 4: Bottom Company Bar -->
      <div class="job-card-footer-row">
        <div class="job-card-footer-company">
          <div class="job-card-circle-logo">
            ${renderCompanyLogo(j, { size: 30, className: 'job-card-logo-img' })}
          </div>
          <div class="job-card-company-text">
            <div class="job-card-company-fullname" title="${j.company_nama}">
              ${j.company_nama}${compGroup}
            </div>
          </div>
        </div>

        <div class="job-card-action-box">
          <button type="button" class="btn-job-card-daftar" onclick="${actionCallback}; event.stopPropagation();">
            ${actionText}
          </button>
        </div>
      </div>
    </div>
  `;

}

function renderModernReviewCard(r, options = {}) {
  if (!r) return '';

  // 1. Alumni Label & Jurusan Tag
  let alumniLabel = r.alumni_label;
  if (!alumniLabel) {
    let majorCode = 'SMK';
    const text = (r.student_jurusan || r.student_kelas || '').toUpperCase();
    if (text.includes('RPL')) majorCode = 'RPL';
    else if (text.includes('TAV')) majorCode = 'TAV';
    else if (text.includes('TITL')) majorCode = 'TITL';
    else if (text.includes('TKRO')) majorCode = 'TKRO';
    const year = r.created_at ? new Date(r.created_at).getFullYear() : 2025;
    alumniLabel = `Alumni ${majorCode} ${year}`;
  }

  // 2. Completion Period & Status
  let completionPeriod = r.completion_period;
  if (!completionPeriod) {
    const d = r.created_at ? new Date(r.created_at) : new Date();
    const month = d.toLocaleDateString('id-ID', { month: 'short' });
    const year = d.getFullYear();
    completionPeriod = `Selesai ${month} ${year}`;
  }

  // 3. Avatar
  let avatarHtml = '';
  if (r.avatar_url) {
    avatarHtml = `<img src="${r.avatar_url}" alt="${r.student_nama || 'Alumni'}" class="review-modern-avatar-img" onerror="this.onerror=null; this.src='/images/avatars/student-2.svg';" />`;
  } else {
    const initials = (r.student_nama || 'SW').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    avatarHtml = `<div class="review-modern-avatar-fallback">${initials}</div>`;
  }

  // 4. Rating & Role
  const ratingNum = typeof r.rating === 'number' ? r.rating.toFixed(1) : Number(r.rating || 5.0).toFixed(1);
  const roleText = r.posisi || 'Siswa Magang Industri';
  const companyName = r.company_nama || 'Mitra Industri DUDI';

  // Optional footer elements
  const showUpvote = options.showUpvote !== false;
  const cardId = options.id ? `id="${options.id}"` : '';
  const extraClass = options.className || '';

  return `
    <div class="review-card-modern ${extraClass}" ${cardId}>
      <!-- Top Profile Header -->
      <div class="review-modern-header">
        <div class="review-modern-avatar-wrap">
          ${avatarHtml}
        </div>
        <div class="review-modern-author-info">
          <div class="review-modern-name-row">
            <span class="review-modern-name">${r.student_nama || 'Alumni Taruna Bangsa'}</span>
            <span class="review-modern-separator">—</span>
            <span class="review-modern-alumni">${alumniLabel}</span>
          </div>
          <div class="review-modern-company" title="${companyName}">${companyName}</div>
          <div class="review-modern-status-row">
            <span class="review-modern-status-period">${completionPeriod}</span>
            <span class="review-modern-status-bullet">&bull;</span>
            <span class="review-modern-status-verified">Terverifikasi</span>
          </div>
        </div>
      </div>

      <!-- Rating & Role Row -->
      <div class="review-modern-meta-row">
        <span class="review-modern-rating-badge">${ratingNum} / 5.0</span>
        <span class="review-modern-meta-divider">|</span>
        <span class="review-modern-role">${roleText}</span>
      </div>

      <!-- Quote Box -->
      <div class="review-modern-quote-box">
        <p class="review-modern-quote-text">
          ${r.review_text || 'Pengalaman magang yang sangat berharga dalam mengasah keterampilan teknis kejuruan dan etos kerja industri.'}
        </p>
      </div>

      ${(options.showProsCons && (r.pros || r.cons)) ? `
        <div class="review-modern-pros-cons">
          ${r.pros ? `<div class="review-pill-pro"><strong>👍 Kelebihan:</strong> ${r.pros}</div>` : ''}
          ${r.cons ? `<div class="review-pill-con"><strong>💡 Catatan:</strong> ${r.cons}</div>` : ''}
        </div>
      ` : ''}

      ${showUpvote && r.id ? `
        <div class="review-modern-footer">
          <span class="review-modern-date">
            📅 ${new Date(r.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <button type="button" class="btn-review-upvote" id="btn-upvote-${r.id}" onclick="App.handleUpvoteReview(${r.id})">
            <span>👍</span> Membantu (<span id="upvote-count-${r.id}">${r.helpful_count || 0}</span>)
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

window.getCompanyLogoUrl = getCompanyLogoUrl;
window.renderCompanyLogo = renderCompanyLogo;
window.renderPklJobCard = renderPklJobCard;
window.renderModernReviewCard = renderModernReviewCard;
if (window.App) {
  window.App.renderModernReviewCard = renderModernReviewCard;
}


