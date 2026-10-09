const $ = (s) => document.querySelector(s),
  K = "glucopet:v1";
let S = Object.assign(
  { target: 50, log: [], best: 0, water: {}, profile: null },
  JSON.parse(localStorage.getItem(K) || "{}")
);
const save = () => localStorage.setItem(K, JSON.stringify(S)),
  day = () => new Date().toISOString().slice(0, 10);
const sugarToday = () =>
    S.log.filter((l) => l.d === day()).reduce((a, l) => a + l.g, 0),
  waterToday = () => S.water[day()] || 0,
  waterGoal = () => (S.profile ? Math.round(S.profile.bb * 29) : 2000),
  tsp = (g) => +(g / 4).toFixed(1);
const TABS = [
  ["fakta", "🏡", "Faktapedia"],
  ["kalk", "📊", "Kalkulator"],
  ["lens", "🔍", "Gula Lens"],
  ["kuli", "🍜", "Kuliner"],
  ["game", "⚡", "Sugar Slash"],
  ["air", "💧", "Hidrasi"],
];
let tab = "fakta",
  kf = "Semua",
  kq = "",
  G = null,
  AC;
const FOOD = [
  ["Tianlala", "🧋", "Boba Brown Sugar", 38],
  ["Chatime", "🍵", "Milk Tea Pearl", 30],
  ["Teazzi", "🍑", "Peach Tea", 26],
  ["Point Coffee", "☕", "Es Kopi Susu", 24],
  ["Kopi Kenangan", "🫘", "Kopi Kenangan Mantan", 28],
  ["Tomoro Coffee", "🥥", "Coconut Latte", 22],
  ["Mixue", "🍦", "Ice Cream Cone", 18],
  ["Momoyo", "🍨", "Soft Serve Sundae", 24],
  ["Roti O", "🥐", "Roti O Original", 17],
  ["D'Crepes", "🥞", "Crepes Choco Banana", 28],
  ["Dubai Chewy Pistachio", "🍫", "Dubai Chewy Pistachio Kunafa", 36],
  ["Kaki Lima", "🧉", "Es Cendol", 30],
  ["Kaki Lima", "🍌", "Es Pisang Ijo", 26],
  ["Kaki Lima", "🌽", "Jasuke", 14],
  ["Kaki Lima", "🍡", "Klepon", 18],
  ["Kaki Lima", "🍲", "Kolak Pisang", 24],
  ["Kaki Lima", "🧁", "Kue Cubit", 16],
  ["Kaki Lima", "🥞", "Martabak Manis", 42],
  ["Air Putih", "💧", "Air Putih / Air Mineral", 0],
];
const CAT = [
    "Semua",
    "Minuman & Kafe",
    "Makanan & Snack",
    "Kaki Lima & Tradisional",
  ],
  cat = (f) =>
    [
      "Tianlala",
      "Chatime",
      "Teazzi",
      "Point Coffee",
      "Kopi Kenangan",
      "Tomoro Coffee",
      "Mixue",
      "Momoyo",
      "Air Putih",
    ].includes(f[0])
      ? CAT[1]
      : f[0] === "Kaki Lima"
      ? CAT[3]
      : CAT[2];
const MITOS = [
  [
    "Gula aren/kelapa jauh lebih sehat dari gula pasir.",
    "Tetap gula tambahan. Tubuh memprosesnya mirip, batas harian tetap berlaku.",
  ],
  [
    "Jus kemasan sama saja dengan buah potong.",
    "Jus kemasan sering ditambah gula dan minim serat. Buah utuh diserap lebih lambat.",
  ],
  [
    "Pemanis nol kalori bebas diminum sepuasnya.",
    "Kalorinya nol, tapi WHO tidak menyarankannya sebagai cara jangka panjang mengontrol berat badan.",
  ],
  [
    'Label "Less Sugar" berarti rendah gula.',
    "Artinya hanya lebih sedikit dari versi biasanya. Cek angka gram di label.",
  ],
  [
    "Sugar crash cuma perasaan.",
    "Gula darah yang melonjak lalu turun bisa bikin lemas, lapar, dan susah fokus.",
  ],
  [
    "Makan gula langsung bikin diabetes.",
    "Risikonya naik lewat kelebihan kalori, berat badan naik, dan resistensi insulin jangka panjang.",
  ],
  [
    "Madu boleh sebebasnya.",
    "WHO memasukkan madu ke gula bebas. Tetap dihitung dalam jatah harian.",
  ],
  [
    "Gula buah harus dibatasi seperti gula tambahan.",
    "Batas WHO/Kemenkes untuk gula tambahan. Buah utuh punya serat, jadi lebih aman.",
  ],
  [
    "Minuman manis bikin kenyang.",
    "Kalori cair kurang mengenyangkan, jadi mudah berlebihan.",
  ],
  [
    "Anak muda kebal gula.",
    "AHA menyarankan remaja maksimal sekitar 25 g (6 sdt) gula tambahan per hari.",
  ],
  [
    "4 sdm gula sehari itu sedikit.",
    "Batas Kemenkes 50 g. Satu boba bisa menghabiskan sebagian besar jatahmu.",
  ],
  [
    "Nggak manis berarti nggak ada gula.",
    "Saus, roti, dan minuman tak manis bisa menyimpan gula tersembunyi. Baca label.",
  ],
];
const HACK = [
  [
    "💧 Minum air dingin, tunggu 10 menit",
    "Rasa haus sering menyamar jadi ngidam. Banyak ngidam reda sendiri.",
  ],
  [
    "🪵 Substitusi kayu manis",
    "Taburkan di teh atau kopi tanpa gula untuk aroma manis tanpa gula.",
  ],
  [
    "🥚 Serat/protein dulu, dessert belakangan",
    "Memperlambat penyerapan gula sehingga lonjakannya lebih landai.",
  ],
  [
    "🚶 Jalan santai 10 menit setelah makan manis",
    "Otot memakai glukosa darah, membantu meredam lonjakan.",
  ],
];
const VS = [
  ["Martabak Manis", "🫓", 42, "Martabak Telur", "🍳", 2],
  ["Kopi Susu Kenangan Mantan", "☕", 28, "Americano", "🫖", 0],
  ["Dubai Chewy Chocolate", "🍫", 36, "Dark Choc 75%", "🌑", 7],
  ["Es Teh Jumbo Kaki Lima", "🧊", 35, "Es Teh Tawar Selasih", "🍃", 0],
];
const LBL = {
  Sukrosa: [
    "Gula pasir biasa (glukosa + fruktosa).",
    "Cepat diserap, gula darah naik tajam.",
    "Minuman manis, kue, permen.",
  ],
  "Sirup Jagung HFCS": [
    "Pemanis cair murah dari jagung.",
    "Lonjakan gula darah cepat, mudah berlebihan karena murah dan manis.",
    "Soda, minuman kemasan, saus.",
  ],
  Maltodekstrin: [
    "Karbohidrat olahan dari pati.",
    "Diserap sangat cepat, indeks glikemik tinggi walau tidak terasa manis.",
    "Bubuk minuman, camilan, sereal.",
  ],
  Dekstrosa: [
    "Nama lain glukosa murni.",
    "Langsung masuk darah, lonjakan tajam.",
    "Permen, roti, minuman olahraga.",
  ],
  Isomaltulosa: [
    "Gula yang dicerna lebih lambat.",
    "Lonjakan lebih landai dibanding sukrosa, tapi tetap gula dan tetap menyumbang kalori.",
    "Minuman energi, formula nutrisi.",
  ],
};
const GI = [
  ["🧋", "Boba Brown Sugar", 1, 8],
  ["🍩", "Donat Gula Salju", 1, 6],
  ["🥥", "Air Kelapa Murni", 0, 0],
  ["🍵", "Teh Tawar", 0, 0],
  ["🍉", "Buah Potong", 0, 0],
  ["🍪", "Biskuit Manis", 1, 4],
  ["🥤", "Soda Kaleng", 1, 9],
  ["🍰", "Cake Cokelat", 1, 7],
  ["🥒", "Timun", 0, 0],
  ["🥚", "Telur Rebus", 0, 0],
];
const A = {},
  V = {},
  B = {};
function head() {
  $("#today").textContent = `🍬 ${sugarToday()}/${S.target} g`;
}
function toast(t) {
  const e = $("#toast");
  e.textContent = t;
  e.hidden = false;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (e.hidden = true), 1800);
}
function pop(t) {
  const p = $("#pop");
  p.innerHTML = `<div>${t}<button class="btn" style="margin-top:12px;width:100%" data-a="close">Oke!</button></div>`;
  p.hidden = false;
}
function logIt(n, g) {
  S.log.push({ d: day(), n, g });
  save();
  head();
  toast(`${n} dicatat (${g} g)`);
}
function render() {
  $("#nav").innerHTML = TABS.map(
    (t) =>
      `<button class="${t[0] === tab ? "on" : ""}" data-a="go" data-v="${ t[0] }"><span>${t[1]}</span>${t[2]}</button>`
  ).join("");
  $("#view").innerHTML = V[tab]();
  B[tab] && B[tab]();
  head();
  scrollTo(0, 0);
}
function go(t) {
  stopGame();
  tab = t;
  render();
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-a]");
  if (a && A[a.dataset.a]) A[a.dataset.a](a);
});
document.addEventListener("input", (e) => {
  if (e.target.id === "kq") {
    kq = e.target.value.toLowerCase();
    $("#klist").innerHTML = klist();
  }
});
A.go = (a) => go(a.dataset.v);
A.close = () => ($("#pop").hidden = true);
A.flip = (a) => a.classList.toggle("on");
A.lbl = (a) => {
  const l = LBL[a.dataset.v];
  pop(
    `<h3>${a.dataset.v}</h3><p><b>Apa itu:</b> ${l[0]}</p><p><b>Efek ke gula darah:</b> ${l[1]}</p><p><b>Contoh:</b> ${l[2]}</p>`
  );
};
// FAKTAPEDIA
const MC = [
  ["rgba(243,232,255,.92)", "rgba(196,165,253,.5)", "#7c3aed"],
  ["rgba(207,250,254,.92)", "rgba(103,232,249,.5)", "#0891b2"],
  ["rgba(254,226,226,.92)", "rgba(252,165,165,.5)", "#dc2626"],
  ["rgba(209,250,229,.92)", "rgba(110,231,183,.5)", "#059669"],
  ["rgba(254,249,195,.92)", "rgba(253,224,71,.5)", "#d97706"],
  ["rgba(237,233,254,.92)", "rgba(167,139,250,.5)", "#6d28d9"],
];
V.fakta =
  () => `<section class="card hero"><svg class="cup" viewBox="0 0 100 120" aria-hidden="true"><path d="M20 30h60l-8 80H28z" fill="#fff" fill-opacity=".92"/><path d="M24 62h52l-4 48H28z" fill="#F9A8D4"/><rect x="14" y="22" width="72" height="10" rx="5" fill="#fff"/><path d="M58 22 66 2" stroke="#06B6D4" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="78" r="4" fill="#1E1B4B"/><circle cx="60" cy="78" r="4" fill="#1E1B4B"/><path d="M42 90q8 8 16 0" stroke="#1E1B4B" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="36" cy="102" r="4" fill="#4a2a5a"/><circle cx="50" cy="104" r="4" fill="#4a2a5a"/><circle cx="64" cy="102" r="4" fill="#4a2a5a"/><path d="M88 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FBBF24"/><path d="M8 60l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff"/></svg><h1>Yakin Minuman Hits-mu Aman? 🧋 1 Boba Bikin Jatah Gula Seharian Ludes!</h1><div class="badges"><span>Kemenkes RI (Permenkes 30/2013): 50 g, maks. 4 sdm/hari</span><span>AHA remaja: 25 g (maks. 6 sdt/hari)</span><span>1 sdm = 12,5 g</span><span>1 sdt = 4 g</span><span>WHO: &lt;10% kalori</span></div><div class="row"><button class="btn" data-a="go" data-v="fakta" onclick="document.getElementById('fc').scrollIntoView({behavior:'smooth'})">✨ Jelajahi Faktapedia</button><button class="btn" data-a="go" data-v="game">🎮 Main Sugar Slash</button></div></section> <section class="card" id="fc"><h2>Mitos vs Fakta</h2><p style="margin-bottom:12px;color:var(--muted);font-size:13px">Tap kartu untuk membalik — cek mana mitos, mana fakta! 🔍</p><div class="grid" style="margin-top:4px">${MITOS.map( (m, i) => { const c = MC[i % 6]; return `<div class="fc" data-a="flip"><div class="in"><div class="f front" style="background:linear-gradient(145deg,${ c[0] },rgba(255,255,255,.85));border:1.5px solid ${ c[1] }"><span class="fc-num" style="background:${c[2]}">${ i + 1 }</span><small style="color:${ c[2] };opacity:1">Mitos</small><span style="font-size:12.5px;color:#1e1b4b;line-height:1.5">${ m[0] }</span></div><div class="f back"><small style="opacity:.9">✅ Fakta</small><span style="font-size:12.5px;line-height:1.55">${ m[1] }</span></div></div></div>`; } ).join( "" )}</div><small class="src">Sumber: Kemenkes RI, WHO, AHA.</small></section> <section class="card"><h2>Craving Hacks</h2><p style="margin-bottom:10px;font-size:13px;color:var(--muted)">Strategi cepat saat ngidam manis menyerang 🧠</p>${HACK.map( (h) => `<details><summary>${h[0]}</summary><p>${h[1]}</p></details>` ).join("")}</section> <section class="card"><h2>Versus Gula</h2><p style="margin-bottom:14px;font-size:13px;color:var(--muted)">Pilihan cerdas bisa menghemat puluhan gram gula! ⚡</p>${VS.map( (v) => `<div class="vs"><div class="bad"><span class="vs-em">${ v[1] }</span><span class="vs-name">${v[0]}</span><b>${v[2]}g</b><small>${tsp( v[2] )} sdt</small></div><div class="vs-mid"><span class="vs-badge">VS</span><span style="font-size:10px;color:var(--muted);font-weight:700;margin-top:2px">Selisih<br><b style="color:#7c3aed;font-size:14px;font-family:Fredoka">${ v[2] - v[5] }g</b></span></div><div class="ok"><span class="vs-em">${ v[4] }</span><span class="vs-name">${v[3]}</span><b>${v[5]}g</b><small>${tsp( v[5] )} sdt</small></div></div>` ).join("")}<small class="src">Angka estimasi per porsi umum.</small></section> <section class="card"><h2>Detektif Label Kemasan</h2><p>Komposisi ditulis dari bahan terbanyak. Makin awal gula muncul, makin banyak kandungannya. Tap bahan:</p><div class="res" style="font-size:12px"><b>Komposisi:</b> air, <span class="lb" style="display:inline-flex">${Object.keys( LBL ) .map((k) => `<button data-a="lbl" data-v="${k}">${k}</button>`) .join("")}</span></div></section>`;
// KALKULATOR
V.kalk = () => {
  const p = S.profile || {};
  const L = S.log.filter((l) => l.d === day());
  return `<section class="card"><h2>Kalkulator Batas Gula</h2><label>Tinggi badan (cm)</label><input id="tb" type="number" value="${ p.tb || "" }"><label>Berat badan (kg)</label><input id="bb" type="number" value="${ p.bb || "" }"><label>Usia</label><input id="us" type="number" value="${ p.u || "" }"><label>Gender</label><select id="gd"><option value="m" ${ p.g === "m" ? "selected" : "" }>Laki-laki</option><option value="f" ${ p.g === "f" ? "selected" : "" }>Perempuan</option></select><label>Level aktivitas</label><select id="ak">${[ ["1.2", "Jarang olahraga"], ["1.375", "Ringan (1-3x/minggu)"], ["1.55", "Sedang (3-5x/minggu)"], ["1.725", "Berat (6-7x/minggu)"], ] .map( (o) => `<option value="${o[0]}" ${p.act == o[0] ? "selected" : ""}>${ o[1] }</option>` ) .join( "" )}</select><button class="btn" style="width:100%;margin-top:12px" data-a="calc">Hitung</button><div id="kres">${ p.limit ? kres(p) : "" }</div></section><section class="card"><h2>Jurnal Hari Ini</h2>${ L.length ? L.map( (l, i) => `<div class="item"><div class="grow"><b>${l.n}</b><small>${ l.g } g gula</small></div><button class="mini" data-a="del" data-i="${S.log.indexOf( l )}">Hapus</button></div>` ).join("") + `<p style="margin-top:8px"><b>Total: ${sugarToday()} g</b> dari target ${ S.target } g</p>` : "<p>Belum ada catatan. Tambah dari Kuliner atau Gula Lens.</p>" }</section>`;
};
const krec = (p) => {
  const bmi = p.bb / Math.pow(p.tb / 100, 2),
    bmiCat =
      bmi < 18.5
        ? "kurus"
        : bmi < 25
        ? "normal"
        : bmi < 30
        ? "gemuk"
        : "obesitas",
    bmiLabel = {
      kurus: "⬇️ Kurus",
      normal: "✅ Normal",
      gemuk: "⚠️ Gemuk",
      obesitas: "🔴 Obesitas",
    }[bmiCat],
    sugarNow = sugarToday(),
    ratio = p.limit > 0 ? sugarNow / p.limit : 0,
    actNum = parseFloat(p.act),
    recs = [];
  if (bmiCat === "kurus")
    recs.push({
      icon: "🥑",
      color: "#10B981",
      tag: "Nutrisi",
      title: "Tambah Kalori Bergizi",
      desc: "BMI di bawah normal. Perbanyak alpukat, kacang-kacangan, dan protein tanpa bergantung pada gula tambahan.",
    });
  if (bmiCat === "gemuk")
    recs.push({
      icon: "🚶",
      color: "#F97316",
      tag: "Gerak",
      title: "Jalan Kaki 30–45 Menit/Hari",
      desc: `Membakar ~${Math.round( (p.bb * 3.5 * 3.5) / 200 )} kkal. Pilihan aman & efektif untuk mulai bergerak tanpa risiko cedera.`,
    });
  if (bmiCat === "obesitas") {
    recs.push({
      icon: "🏊",
      color: "#EF4444",
      tag: "Gerak",
      title: "Olahraga Low-Impact Dulu",
      desc: "Renang atau bersepeda statis mengurangi beban sendi sambil membakar kalori lebih efektif daripada lari.",
    });
    recs.push({
      icon: "👨‍⚕️",
      color: "#EF4444",
      tag: "Kesehatan",
      title: "Pertimbangkan Konsultasi Dokter",
      desc: "BMI di rentang obesitas. Program penurunan berat badan terpantau lebih aman dan efektif.",
    });
  }
  if (ratio > 1) {
    const ex = Math.round(sugarNow - p.limit);
    recs.push({
      icon: "🏃",
      color: "#EF4444",
      tag: "🚨 Urgent",
      title: `Kelebihan ${ex}g Gula – Saatnya Bergerak!`,
      desc: `Lari ${Math.round((ex * 4) / 10)} mnt • Bersepeda ${Math.round( (ex * 4) / 7 )} mnt • Jalan kaki ${Math.round((ex * 4) / 4)} mnt`,
    });
  } else if (ratio > 0.75)
    recs.push({
      icon: "⚠️",
      color: "#F59E0B",
      tag: "Perhatian",
      title: "Mendekati Batas Harian",
      desc: `Sisa jatah hanya ${Math.round( p.limit - sugarNow )}g. Pilih camilan bebas gula dan perbanyak air putih sampai hari ini selesai.`,
    });
  else if (ratio > 0 && ratio <= 0.5)
    recs.push({
      icon: "🌟",
      color: "#10B981",
      tag: "Bagus!",
      title: "Konsumsi Gula Terkontrol",
      desc: `Masih ada sisa ${Math.round( p.limit - sugarNow )}g dari batas harian. Pertahankan pola ini dan tetap cek label kemasan!`,
    });
  if (actNum <= 1.2)
    recs.push({
      icon: "🧘",
      color: "#8B5CF6",
      tag: "Lifestyle",
      title: "Mulai 15 Menit Bergerak per Hari",
      desc: "Aktivitas sangat rendah meningkatkan risiko resistensi insulin. Stretching atau yoga ringan sudah cukup sebagai langkah awal.",
    });
  else if (actNum >= 1.55 && actNum < 1.725)
    recs.push({
      icon: "🏋️",
      color: "#06B6D4",
      tag: "Performa",
      title: "Optimalkan Waktu Makan",
      desc: "Konsumsi karbohidrat kompleks 1–2 jam sebelum latihan dan protein dalam 30 menit setelah latihan untuk pemulihan optimal.",
    });
  else if (actNum >= 1.725)
    recs.push({
      icon: "💪",
      color: "#06B6D4",
      tag: "Atlet",
      title: "Prioritaskan Pemulihan",
      desc: "Latihan intens butuh tidur 7–9 jam. Otot yang pulih memproses glukosa jauh lebih efisien dari yang lelah.",
    });
  if (p.u >= 40)
    recs.push({
      icon: "🫀",
      color: "#EC4899",
      tag: "Usia 40+",
      title: "Pantau Gula Darah Secara Rutin",
      desc: "Risiko resistensi insulin meningkat seiring usia. Cek gula darah puasa setiap 6 bulan dan batasi gula tambahan <25g/hari.",
    });
  else if (p.u <= 22)
    recs.push({
      icon: "⚡",
      color: "#FBBF24",
      tag: "Muda & Aktif",
      title: "Bangun Kebiasaan Sekarang",
      desc: "Kebiasaan rendah gula di usia muda melindungi metabolisme hingga puluhan tahun ke depan. Kamu punya keuntungan besar!",
    });
  const wNow = waterToday(),
    wG = waterGoal();
  if (wNow < wG * 0.6)
    recs.push({
      icon: "💧",
      color: "#06B6D4",
      tag: "Hidrasi",
      title: `Minum ${wG - wNow} ml Lagi Hari Ini`,
      desc: "Dehidrasi membuat gula darah terkonsentrasi dan meningkatkan ngidam manis. Air putih adalah minuman nol gula terbaik!",
    });
  if (!recs.length) return "";
  return `<div style="margin-top:18px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span style="font-size:22px">🎯</span><h3 style="color:var(--ink2);font-size:17px;margin:0;font-family:'Fredoka',sans-serif">Rekomendasi Personal</h3></div><div style="display:flex;flex-direction:column;gap:8px">${recs .map( (r) => `<div style="display:flex;gap:12px;align-items:flex-start;background:rgba(255,255,255,.72);border:1.5px solid rgba(255,255,255,.9);border-radius:18px;padding:12px 14px;box-shadow:0 4px 14px rgba(0,0,0,.05);transition:transform .2s,box-shadow .2s" onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 22px rgba(0,0,0,.09)'" onmouseleave="this.style.transform='';this.style.boxShadow='0 4px 14px rgba(0,0,0,.05)'"><div style="font-size:26px;min-width:38px;text-align:center;line-height:1.3;margin-top:2px">${r.icon}</div><div style="flex:1;min-width:0"><div style="margin-bottom:4px"><span style="background:${r.color}20;color:${r.color};border-radius:99px;padding:2px 9px;font-size:10px;font-weight:900;letter-spacing:.5px">${r.tag}</span></div><b style="font-size:13.5px;color:var(--ink2);font-family:'Fredoka',sans-serif;display:block;margin-bottom:3px">${r.title}</b><span style="font-size:12px;color:var(--muted);line-height:1.55">${r.desc}</span></div></div>` ) .join( "" )}</div><div style="margin-top:12px;background:linear-gradient(135deg,rgba(139,92,246,.09),rgba(236,72,153,.07));border:1.5px solid rgba(139,92,246,.14);border-radius:18px;padding:13px 14px"><b style="font-size:12px;color:var(--ink2);display:block;margin-bottom:10px">🔥 Waktu Bakar Gula Hari Ini (${ sugarNow > 0 ? sugarNow + "g" : "belum ada catatan" })</b><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">${[ ["🚶", "Jalan Kaki", 4], ["🏃", "Lari Ringan", 10], ["🚴", "Bersepeda", 7], ] .map( (e) => `<div style="background:rgba(255,255,255,.75);border-radius:14px;padding:10px 4px;border:1px solid rgba(255,255,255,.9)"><div style="font-size:22px;margin-bottom:2px">${ e[0] }</div><div style="font-size:10.5px;font-weight:800;color:var(--ink2)">${ e[1] }</div><div style="font-size:16px;font-weight:900;color:#7c3aed;font-family:'Fredoka'">${ sugarNow > 0 ? Math.round((sugarNow * 4) / e[2]) + " mnt" : "–" }</div></div>` ) .join( "" )}</div></div><small style="color:var(--muted);display:block;margin-top:10px;font-size:11px">📊 Berdasarkan BMI ${bmi.toFixed( 1 )} (${bmiLabel}), aktivitas, & konsumsi gula hari ini. Bukan pengganti saran medis.</small></div>`;
};
const kres = (p) =>
  `<div class="res"><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;margin-bottom:8px"><div><p style="font-size:12px;color:var(--muted);margin-
