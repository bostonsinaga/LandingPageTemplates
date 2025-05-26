const nav = document.querySelector('nav');

// TEST //
// const blank = document.createElement('div');
// blank.style.color = 'white';
// blank.style.position = 'fixed';
// document.body.appendChild(blank);
// setInterval(() => blank.innerText = `${window.innerWidth}`);

setInterval(() => {
    const navGaps = nav.querySelectorAll('.nav-gap');
    const navChildSz =
        nav.querySelector('.tentang').clientWidth + navGaps[0].clientWidth + 
        nav.querySelector('.layanan').clientWidth + navGaps[1].clientWidth +
        nav.querySelector('.kontak').clientWidth + navGaps[2].clientWidth;
    
    if (window.innerWidth - navChildSz < navGaps[0].clientWidth) {
        const newSize = (window.innerWidth - navChildSz + navGaps[0].clientWidth) / 2;
        nav.style.paddingLeft = `${newSize}px`;
        navGaps[2].style.width = `${newSize}px`;
    } else {
        nav.style.paddingLeft = `${window.innerWidth - navChildSz}px`;
    }
});

window.onscroll = () => {
    if (window.scrollY > 0) {
        nav.classList.add('nav-colored');
        nav.classList.remove('nav-uncolored');
    }
    else {
        nav.classList.add('nav-uncolored');
        nav.classList.remove('nav-colored');
    }
};

// CARDS WADAH (LAYANAN) //

const cardsWadah = document.querySelector('section .layanan .isi .cards-wadah');

(function createCards() {

    let tingkatan = [5, 10, 30, 50, 100];
    let interval = [[1, 4, 10, 21, 31],[3, 9, 20, 30, 40]];
    let ratusan = [150, 300, 650, 850];

    for (let i = 0; i < 5; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="upto">up<br>to</div>
            <div class="tingkatan">${tingkatan[i]}</div>
            <div class="mbps">Mbps</div>
            <div class="fitur">
                > Streaming Video<br>
                > Streaming Music<br>
                > Browsing Internet<br>
                > Social Media<br>
                dan lain-lain...
            </div>
            <div class="kapasitas">Ideal Penggunaan<br>${interval[0][i]}-${interval[1][i]} Perangkat</div>
            ${i < 4 ?
                `<div class="harga">Rp. ${ratusan[i]}.000</div>`:
                `<div class="harga">Rp. 1.000.000</div>`
            }
        `;
        card.onmouseover = () => {
            card.querySelector('.tingkatan').style.color = 'white';
            card.querySelector('.mbps').style.color = 'white';
            card.querySelector('.harga').style.color = 'white';
            card.querySelector('.harga').style.border = '1px solid white';
        };
        card.onmouseleave = () => {
            card.querySelector('.tingkatan').style.color = 'blueviolet';
            card.querySelector('.mbps').style.color = 'blueviolet';
            card.querySelector('.harga').style.color = 'blueviolet';
            card.querySelector('.harga').style.border = '1px solid blueviolet';
        };
        card.onclick = () => window.scrollTo(0, window.scrollMaxY);
        cardsWadah.appendChild(card);
    }
})();