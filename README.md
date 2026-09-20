# Sinar Mandiri FG — Landing Page

Landing page satu halaman (one-page) untuk jasa las **Sinar Mandiri FG**, dibangun murni dengan **HTML, CSS, dan JavaScript native** — tanpa framework, tanpa library, tanpa build step. Cukup buka `index.html` di browser.

## Struktur Folder

```
Sinarmandiri/
├── index.html          # Struktur halaman (navbar, hero, layanan, tentang, galeri, testimoni, kontak, footer)
├── css/
│   └── styles.css      # Seluruh styling + responsif (tablet 900px, HP 650px, HP kecil 400px)
├── js/
│   └── main.js         # Toggle tema, menu mobile, kirim form ke WhatsApp, animasi scroll
├── img/                # Simpan gambar di sini (lihat daftar di bawah)
└── README.md
```

## Alur Logika Halaman

| Bagian | Perilaku |
|---|---|
| Navbar | Link anchor (`#layanan`, `#galeri`, `#testimoni`, ...) + scroll smooth CSS. Di layar kecil berubah jadi hamburger menu (`js/main.js`). |
| Toggle tema 🌙/☀ | Tombol di navbar menukar mode terang/gelap. Mekanisme: atribut `data-theme` pada `<html>` + variabel CSS di `:root` vs `html[data-theme="dark"]`. Preferensi user disimpan di `localStorage`; tanpa itu mengikuti `prefers-color-scheme` sistem. |
| Layanan, Galeri & Testimoni | Konten statis, muncul dengan animasi fade-up saat di-scroll (IntersectionObserver). Klik gambar galeri untuk membuka detail layar penuh (lightbox). |
| Testimoni | 3 kartu ulasan: bintang, kutipan, avatar inisial (tanpa foto). |
| Kontak — WhatsApp | Kartu WA membuka `wa.me/6285772119420`. |
| Kontak — Alamat | Membuka Google Maps sesuai alamat. |
| Kontak — Form | Submit dirakit jadi pesan terformat lalu dibuka di WhatsApp tab baru (tanpa server). |
| Footer | Statis, tetap gelap di kedua tema. |

## Ganti Warna Tema

Semua warna terpusat di blok variabel `css/styles.css` bagian 1 — tema **light** di `:root`, tema **dark** di `html[data-theme="dark"]`. Ubah nilai di sana, seluruh halaman ikut berubah.

## Gambar

Semua gambar sudah ada di `img/` dan sudah dirujuk `index.html`:

- `logo.jpg`             → kartu hero (logo Sinar Mandiri FG)
- `kanopi.jpeg`          → galeri
- `pagar.jpeg`           → galeri
- `teralis.jpeg`         → galeri
- `rolling.jpeg`         → galeri (caption "RAILING")
- `tangga.jpeg`          → galeri
- `besi-custom.jpeg`     → galeri

Ganti file dengan foto terbaru cukup menimpa nama yang sama — tidak perlu ubah kode.

## Cara Menjalankan

1. Buka `index.html` langsung di browser, atau
2. Jalankan local server (opsional): `python -m http.server 8000` → akses `http://localhost:8000`

## Catatan

- Ganti nomor WhatsApp di 2 tempat: `index.html` (link kartu WA) dan `js/main.js` (konstanta `NOMOR_WHATSAPP`).
- Ikon WhatsApp & lokasi memakai inline SVG — tidak perlu Font Awesome/CDN.
