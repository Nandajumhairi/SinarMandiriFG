/* ==========================================================================
   Sinar Mandiri FG — main.js
   5 fitur, semuanya JavaScript native (tanpa library):
   1. Toggle tema terang/gelap (tersimpan di localStorage)
   2. Menu hamburger mobile
   3. Form kontak -> dibuka sebagai pesan WhatsApp
   4. Lightbox detail gambar galeri
   5. Animasi fade-up saat kartu masuk layar (IntersectionObserver)
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. TOGGLE TEMA TERANG/GELAP
// Mekanisme: atribut data-theme pada <html>; CSS (css/styles.css) mengganti
// seluruh variabel warna saat html[data-theme="dark"].
// Urutan penentuan tema awal:
//   a. pilihan tersimpan di localStorage (user pernah klik tombol)
//   b. kalau belum ada: preferensi sistem (prefers-color-scheme)
//   c. selain keduanya: light
// --------------------------------------------------------------------------
const themeToggle = document.getElementById("themeToggle");

const IKON_MATAHARI = "&#9728;"; // ☀ tampil saat mode gelap (klik -> terang)
const IKON_BULAN = "&#127769;";  // 🌙 tampil saat mode terang (klik -> gelap)

function terapkanTema(tema) {
    document.documentElement.setAttribute("data-theme", tema);
    themeToggle.innerHTML = tema === "dark" ? IKON_MATAHARI : IKON_BULAN;

    try {
        localStorage.setItem("tema", tema); // gagal kalau storage diblokir -> abaikan
    } catch (e) { /* tetap jalan tanpa penyimpanan */ }
}

// Tema awal
const tersimpan = (() => {
    try {
        return localStorage.getItem("tema");
    } catch (e) {
        return null;
    }
})();

const temaAwal = tersimpan ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

terapkanTema(temaAwal);

// Klik tombol -> tukar terang <-> gelap
themeToggle.addEventListener("click", () => {
    const sekarang = document.documentElement.getAttribute("data-theme");
    terapkanTema(sekarang === "dark" ? "light" : "dark");
});


// --------------------------------------------------------------------------
// 2. MENU MOBILE
// Klik hamburger -> toggle class .active pada .nav-menu (CSS yang menampilkan).
// --------------------------------------------------------------------------
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Setelah memilih salah satu menu, dropdown ditutup kembali
// agar tidak menutupi konten yang dituju.
document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


// --------------------------------------------------------------------------
// 3. FORM WHATSAPP
// Submit form dicegah (tidak ada server). Isi form dirakit jadi teks pesan
// terformat lalu halaman wa.me dibuka di tab baru.
// --------------------------------------------------------------------------
const contactForm = document.getElementById("contactForm");

// GANTI DENGAN NOMOR WHATSAPP ANDA
const NOMOR_WHATSAPP = "6285772119420";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // jangan kirim form ke server

    const nama = document.getElementById("nama").value;
    const telepon = document.getElementById("telepon").value;
    const layanan = document.getElementById("layananSelect").value;
    const pesan = document.getElementById("pesan").value;

    // encodeURIComponent agar spasi, baris baru, dan tanda baca aman di URL
    const text = encodeURIComponent(
        "Halo Sinar Mandiri FG,\n\n" +
        "Saya ingin konsultasi jasa las.\n\n" +
        `Nama: ${nama}\n` +
        `No. WhatsApp: ${telepon}\n` +
        `Layanan: ${layanan}\n` +
        `Kebutuhan: ${pesan}\n\n` +
        "Mohon informasi harga dan estimasinya. Terima kasih."
    );

    window.open(`https://wa.me/${NOMOR_WHATSAPP}?text=${text}`, "_blank");
});


// --------------------------------------------------------------------------
// 4. LIGHTBOX DETAIL GAMBAR GALERI
// Klik gambar -> ambil src + caption dari kartu -> tampilkan overlay.
// Bisa ditutup lewat tombol X, klik area luar, atau tombol Escape.
// --------------------------------------------------------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
let lastFocusedElement = null;

function bukaLightbox(gambar) {
    const kartu = gambar.closest(".gallery-item");
    const caption = kartu?.querySelector(".gallery-caption")?.textContent.trim();

    lastFocusedElement = document.activeElement;
    lightboxImg.src = gambar.src;
    lightboxImg.alt = gambar.alt;
    lightboxCaption.textContent = caption || "Detail gambar";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
}

function tutupLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImg.src = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

document.querySelectorAll(".gallery-item img").forEach((gambar) => {
    gambar.addEventListener("click", () => bukaLightbox(gambar));
});

lightboxClose.addEventListener("click", tutupLightbox);

// Klik area gelap di luar gambar juga menutup lightbox.
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        tutupLightbox();
    }
});

// Escape = pintasan keyboard untuk menutup detail gambar.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
        tutupLightbox();
    }
});


// --------------------------------------------------------------------------
// 5. ANIMASI SAAT SCROLL
// Kartu disembunyikan dulu (geser 30px ke bawah + transparan), lalu
// IntersectionObserver mengubahnya terlihat saat masuk viewport 15%.
// --------------------------------------------------------------------------
const cards = document.querySelectorAll(
    ".service-card, .gallery-item, .contact-item, .testimonial-card"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // cukup satu kali animasi
            }
        });
    },
    { threshold: 0.15 }
);

cards.forEach((card) => {
    card.classList.add("fade-up");
    observer.observe(card);
});