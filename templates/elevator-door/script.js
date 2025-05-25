/******************/
/* ANIMASI KONTAK */
/******************/

const animationBlinking = [
    {backgroundColor: "rgba(255, 255, 255, 0.4)"},
    {backgroundColor: "rgba(255, 255, 255, 0.8)"},
    {backgroundColor: "rgba(255, 255, 255, 0.4)"}
];

const animationTiming = {
    duration: 700,
    iterations: 2
};

const footerKontak_boardDOMs = [
    document.querySelector(".footer-kontak-pesan-telp"),
    document.querySelector(".footer-kontak-pesan-email"),
    document.querySelector(".footer-kontak-alamat-teks")
];

/***********************/
/* FOOTER PRODUK KARTU */
/***********************/

const footerProdukDaftar_DOM = document.querySelector(".footer-produk-daftar");
const jumlahKartu = 4;

const kartuJudulStrings = [
    "<b>Lite</b><b>5 Mbps</b>",
    "<b>Study</b><b>10 Mbps</b>",
    "<b>Basic</b><b>15 Mbps</b>",
    "<b>Premium</b><b>20 Mbps</b>"
];

const kartuHargaStrings = [
    "Rp. 110.000",
    "Rp. 165.000",
    "Rp. 220.000",
    "Rp. 330.000"
];

for (let i = 0; i < jumlahKartu; i++) {

    const kartu_DOM = document.createElement("a");
    const kartuJudul_DOM = document.createElement("div");
    const kartuSekat_DOM = document.createElement("div");
    const kartuHarga_DOM = document.createElement("div");

    kartu_DOM.classList.add("footer-produk-daftar-kartu");
    kartuJudul_DOM.classList.add("footer-produk-daftar-kartu-judul");
    kartuSekat_DOM.classList.add("footer-produk-daftar-kartu-sekat");
    kartuHarga_DOM.classList.add("footer-produk-daftar-kartu-harga");

    kartuJudul_DOM.innerHTML = kartuJudulStrings[i];
    kartuHarga_DOM.innerText = kartuHargaStrings[i];

    kartu_DOM.setAttribute("href", "#to_footer-kontak");

    kartu_DOM.addEventListener("click", () => {
        for (let boardDOM of footerKontak_boardDOMs) {
            boardDOM.animate(animationBlinking, animationTiming);
        }
    });

    kartu_DOM.appendChild(kartuJudul_DOM);
    kartu_DOM.appendChild(kartuSekat_DOM);
    kartu_DOM.appendChild(kartuHarga_DOM);

    footerProdukDaftar_DOM.appendChild(kartu_DOM);
}