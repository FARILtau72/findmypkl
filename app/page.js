'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (typeof window !== 'undefined' && window.App && typeof window.App.init === 'function') {
        if (!window.App._initialized) {
          window.App._initialized = true;
          window.App.init();
        }
        clearInterval(interval);
      }
      if (attempts > 60) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="app-layout">
        {/* SIDEBAR */}
        <aside id="app-sidebar" className="app-sidebar" data-lenis-prevent>
          <div className="sidebar-header">
            <div className="brand-logo">
              <div
                className="brand-icon-box"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  background: 'transparent',
                  boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)',
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="FindMyPKL Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    display: 'block',
                  }}
                />
              </div>

              <div className="brand-text">
                <h1>Find My PKL</h1>
                <span>SMK Taruna Bangsa Bekasi</span>
              </div>
            </div>

            <button
              id="sidebar-close-btn"
              className="sidebar-close-btn"
              type="button"
              aria-label="Tutup menu navigasi"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="sidebar-user-card">
            <div id="sidebar-user-avatar" className="user-avatar" aria-hidden="true">
              AF
            </div>

            <div className="user-info">
              <div id="sidebar-user-name" className="user-name">
                Ahmad Fauzi
              </div>

              <div id="sidebar-user-tag" className="user-role-tag">
                XII RPL 1
              </div>
            </div>
          </div>

          <nav id="sidebar-nav-list" className="sidebar-nav" aria-label="Navigasi utama">
            {/* Navigation links populated by JavaScript */}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-footer-title">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <strong>BKK &amp; HUBIN Taruna Bangsa</strong>
            </div>

            <p>
              Email:{' '}
              <a href="mailto:hubin@smktarunabangsa.sch.id">hubin@smktarunabangsa.sch.id</a>
              <br />
              Telp: <a href="tel:+622188951234">(021) 8895-1234</a>
              <br />
              Kota Bekasi, Jawa Barat
            </p>
          </div>
        </aside>

        <div id="sidebar-backdrop" className="sidebar-backdrop" aria-hidden="true"></div>

        {/* MAIN APPLICATION */}
        <main className="app-main">
          <header id="main-header" className="main-header">
            <div className="header-left">
              <button
                id="menu-toggle-btn"
                className="btn btn-secondary btn-sm"
                type="button"
                aria-label="Buka menu navigasi"
                aria-controls="app-sidebar"
                aria-expanded="false"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              <div className="header-title-area">
                <h2 id="header-title">Jelajah Lowongan PKL</h2>
                <p id="header-desc">
                  Temukan lowongan magang industri resmi yang sesuai dengan kompetensi keahlian Anda.
                </p>
              </div>
            </div>

            <div id="header-actions" className="header-actions">
              {/* Populated by JavaScript */}
            </div>
          </header>

          <div id="main-content-body" className="content-body">
            {/* Page content injected by app.js */}
          </div>
        </main>
      </div>

      {/* GLOBAL MODAL */}
      <div id="global-modal-backdrop" className="modal-backdrop" role="presentation" data-lenis-prevent>
        <div
          className="modal-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          data-lenis-prevent
        >
          <div className="modal-header">
            <h3 id="modal-title">Judul Dialog</h3>
            <button id="modal-close-btn" className="modal-close-btn" type="button" aria-label="Tutup dialog">
              &times;
            </button>
          </div>
          <div id="modal-body-content" className="modal-body" data-lenis-prevent>
            {/* Modal content injected dynamically */}
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      <div id="toast-container" className="toast-container" aria-live="polite" aria-atomic="true"></div>
    </>
  );
}
