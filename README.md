GLUCOPET 🍭✨

Smart Sweetness, Mindful Energy (opsi lokal: Sadar Manis, Tetap Eksis)


PWA gamified untuk Gen Z yang membantu memantau dan membatasi asupan gula harian. Dibuat dengan HTML, CSS, dan JavaScript murni, tanpa build step dan tanpa dependensi.


Fitur

Tab	Isi
🏠 Faktapedia	Hero hook, 12 flashcard mitos vs fakta, craving hacks, versus gula, detektif label kemasan
🧮 Kalkulator	BMR (Mifflin-St Jeor), TEE, batas gula harian (g dan sdt), jurnal gula hari ini
📷 Gula Lens	Foto dari kamera/galeri, hasil gram gula, kalori, sendok teh, indikator warna
🍴 Kuliner	Menu tenant mall dan kaki lima, filter kategori, pencarian, + Catat, Burn-off Advisor
🎮 Sugar Slash	Game 30 detik: SLASH makanan tinggi gula, COLLECT yang sehat. Combo, suara, trivia
💧 Hidrasi	Pencatat minum dengan animasi botol, target 2000 ml atau berat badan × 29 ml

Struktur file

index.html     kerangka halaman
styles.css     seluruh tampilan
app.js         data, logika, dan semua tab
manifest.json  konfigurasi PWA
sw.js          service worker (offline)
icon.svg       ikon aplikasi

Cara deploy ke Netlify

Drag and drop (tercepat)



Buka app.netlify.com/drop.

Seret seluruh isi folder ini ke halaman tersebut.

Selesai. Netlify memberi alamat https://nama-acak.netlify.app.


Lewat GitHub



Commit semua file ke repo.

Di Netlify pilih Add new site → Import from Git.

Kosongkan Build command, isi Publish directory dengan . lalu Deploy.


Situs ini statis penuh, jadi Vercel atau GitHub Pages juga bisa dipakai tanpa konfigurasi tambahan.


Memasang sebagai aplikasi


Android (Chrome): menu ⋮ → Install app / Tambahkan ke layar utama.

iOS (Safari): tombol Bagikan → Add to Home Screen.


PWA hanya bisa dipasang lewat HTTPS. Netlify sudah menyediakannya.


Data pengguna

Semua disimpan di localStorage pada perangkat dengan kunci glucopet:v1: profil kalkulator, jurnal gula, target harian, skor tertinggi game, dan histori hidrasi. Tidak ada data yang dikirim ke server.


Mengubah isi

Semua konten ada di bagian atas app.js:



MITOS, HACK, VS, LBL untuk Faktapedia

FOOD untuk menu Kuliner dan Gula Lens, format [tenant, emoji, nama, gram gula]. Setiap emoji harus unik.

GI untuk item game, format [emoji, nama, tinggi gula (1/0), sdt]


Setelah mengubah file, naikkan versi cache di sw.js (glucopet-v1 → glucopet-v2) supaya pengguna lama mendapat versi terbaru.


Catatan penting


Gula Lens adalah simulasi. Aplikasi tidak mengenali isi foto. Nama file yang mengandung kata seperti "air", "water", atau "mineral" dibaca sebagai air putih (0 g), selain itu tebakannya acak dan bisa dikoreksi lewat dropdown. Untuk pengenalan gambar sungguhan, perlu model atau API terpisah.

Angka gula dan waktu bakar adalah estimasi per porsi umum (jalan 4, lari 10, sepeda 7 kkal/menit), bukan data resmi gerai.

Ikon: icon.svg cukup untuk Chrome. Untuk install yang optimal di semua perangkat, tambahkan PNG 192×192 dan 512×512 ke manifest.json.

Aplikasi ini edukasi umum, bukan pengganti saran dokter atau ahli gizi.


Sumber acuan

Kemenkes RI (Permenkes 30/2013), WHO, dan AHA.

