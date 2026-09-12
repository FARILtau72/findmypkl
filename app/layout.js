import Script from 'next/script';

export const metadata = {
  title: 'Find My PKL - SMK Taruna Bangsa Kota Bekasi',
  description: 'Platform Terpusat Penemuan dan Manajemen PKL Khusus SMK Taruna Bangsa Kota Bekasi',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/style.css?v=2.6" />
      </head>
      <body>
        {children}

        {/* Modular Client Scripts */}
        <Script src="/js/libs/lenis.min.js" strategy="beforeInteractive" />
        <Script src="/js/api.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/components.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/app.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/nav.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/homepage.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/catalog.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/mitra.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/favorit.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/ulasan.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/auth.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/siswa.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/hubin.js?v=2.6" strategy="beforeInteractive" />
        <Script src="/js/pages/surat.js?v=2.6" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
