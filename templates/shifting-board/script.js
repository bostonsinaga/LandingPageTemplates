const CONTAINER_DOM = document.querySelector('.CONTAINER');
const background_DOMs = [...document.querySelectorAll('.background')];
const CONTENT_DOM = document.querySelector('.CONTENT');
const void_DOM = CONTENT_DOM.querySelector('.void');
const profilePicture_DOM = CONTENT_DOM.querySelector('.profile-picture');
const text_DOM = CONTENT_DOM.querySelector('.text');
const title_DOM = text_DOM.querySelector('.title');
const card_DOMs = [...text_DOM.querySelectorAll('.about .card')];
const contact_DOM = text_DOM.querySelector('.contact');

let scrollYDirection = 1,
    previousScrollYLength = 0,
    isContentReachBottom = false,
    isPortrait = false;

let CONTENT_DOM_list = [title_DOM];
CONTENT_DOM_list = CONTENT_DOM_list.concat(...card_DOMs);
CONTENT_DOM_list.push(contact_DOM);

let scrollSectionFlags = new Array(CONTENT_DOM_list.length).fill(false);
scrollSectionFlags[0] = true;

function resetSectionFlags(exceptIndex) {
    for (let i = 0; i < scrollSectionFlags.length; i++) {
        if (i === exceptIndex) {
            scrollSectionFlags[i] = true;
        }
        else scrollSectionFlags[i] = false;
    }
}

function setAllContentInvisible(exceptIndex) {
    for (let i = 0; i < CONTENT_DOM_list.length; i++) {
        if (i === exceptIndex) {
            CONTENT_DOM_list[i].style.opacity = 1;
        }
        else CONTENT_DOM_list[i].style.opacity = 0;
    }
}

/**
 * @param {number} step - 0 (first background) to 1 (second background)
 */
function setBackgroundPhase(step) {
    if (step < 2) {
        background_DOMs[0].classList.remove('fade' + (step === 0 ? 'out' : 'in') + '-effect');
        background_DOMs[0].classList.add('fade' + (step === 0 ? 'in' : 'out') + '-effect');

        background_DOMs[1].classList.remove('fade' + (step === 0 ? 'in' : 'out') + '-effect');
        background_DOMs[1].classList.add('fade' + (step === 0 ? 'out' : 'in') + '-effect');
        
        background_DOMs[0].style.opacity = step === 0 ? 1 : 0;
        background_DOMs[1].style.opacity = step === 0 ? 0 : 1;
    }
}

/**
 * @param {number} step - 0 (text to left) to 1 (text to right)
 */
function shiftContents(step) {
    // text to left
    if (step === 0 && scrollYDirection === -1) {
        
        CONTAINER_DOM.classList.toggle('CONTAINER-overflow-y');
        window.scrollTo(0, window.innerHeight);
        isContentReachBottom = true;

        void_DOM.classList.add('void-to-right-effect');
        void_DOM.classList.remove('void-to-left-effect');

        text_DOM.classList.add('text-to-left-effect');
        text_DOM.classList.remove('text-to-right-effect');
        text_DOM.scrollTop = text_DOM.scrollHeight;
    }
    // text to right
    else if (step === 1 && scrollYDirection === 1) {

        CONTAINER_DOM.classList.toggle('CONTAINER-overflow-y');
        isContentReachBottom = false;

        void_DOM.classList.add('void-to-left-effect');
        void_DOM.classList.remove('void-to-right-effect');

        text_DOM.classList.add('text-to-right-effect');
        text_DOM.classList.remove('text-to-left-effect');
    }
}

function updateScreenOrientation() {
    if (window.innerWidth / window.innerHeight >= 1) {
        isPortrait = false;
    }
    else isPortrait = true;
}

function updateDarkerBackground() {
    for (const dom of [void_DOM, profilePicture_DOM, text_DOM]) {
        if (!isPortrait) {
            dom.classList.add('darker-background');
        }
        else dom.classList.remove('darker-background');
    }
}

/** INITIAL STYLES */

updateScreenOrientation();
updateDarkerBackground();
setAllContentInvisible(0);
background_DOMs[1].style.opacity = 0;

/** SCROLL EVENT */

// update the 'isPortrait' if window size change
window.addEventListener('resize', () => {
    updateScreenOrientation();
    updateDarkerBackground();
});

// scroll up from bottom
window.addEventListener('scroll', () => {
    if (isContentReachBottom && window.scrollY === 0) {
        scrollYDirection = 1;
        shiftContents(1);
        card_DOMs[card_DOMs.length - 1].scrollIntoView();
    }
});

// from start scrolling
text_DOM.addEventListener('scroll', () => {

    if (previousScrollYLength < text_DOM.scrollTop) {
        scrollYDirection = -1;
    }
    else scrollYDirection = 1;

    previousScrollYLength = text_DOM.scrollTop;
    const halfWindowHeight = window.innerHeight / 2;

    /** EFFECTS */

    for (let i = CONTENT_DOM_list.length - 1; i >= 0; i--) {
        if ((i === CONTENT_DOM_list.length - 1 &&
            text_DOM.scrollTop >=
                text_DOM.scrollHeight
                - text_DOM.clientHeight - halfWindowHeight)
            ||
            (i === 0 && text_DOM.scrollTop >= CONTENT_DOM_list[0].offsetTop)
            ||
            (i < CONTENT_DOM_list.length - 1 && i > 0 &&
            text_DOM.scrollTop >= CONTENT_DOM_list[i].offsetTop - halfWindowHeight)
        ) {
            if (!scrollSectionFlags[i]) {
                resetSectionFlags(i);
                setAllContentInvisible(i);

                if (i < CONTENT_DOM_list.length - 1 && scrollYDirection === 1) {
                    CONTENT_DOM_list[i+1].classList.remove('fadein-effect');
                    CONTENT_DOM_list[i+1].classList.add('fadeout-effect');
                }
                else if (i === CONTENT_DOM_list.length - 1 || scrollYDirection === -1) {
                    CONTENT_DOM_list[i-1].classList.remove('fadein-effect');
                    CONTENT_DOM_list[i-1].classList.add('fadeout-effect');
                }

                CONTENT_DOM_list[i].classList.remove('fadeout-effect');
                CONTENT_DOM_list[i].classList.add('fadein-effect');

                switch (i) {
                    case 0: {
                        setBackgroundPhase(0);
                    break}
                    case 1: {
                        setBackgroundPhase(1);
                    break}
                    case 4: {
                        shiftContents(0);
                    break}
                    default: {}
                }

                break;
            }
            else break;
        }
    }
});

