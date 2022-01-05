import 'swiper/css';
import './scss/style.scss';
import Swiper from 'swiper';

let clm = null;
let clm2 = null;

window.addEventListener("load", setWrapperSize)

function setWrapperSize(){
    const moveline_one = document.querySelector(".moveline-card-swiper");
    const moveline_two = document.querySelector(".moveline-card2-swiper");
    const scrlWidth_one = moveline_one.querySelector("[data-scroll-width]");
    const scrlWidth_two = moveline_two.querySelector("[data-scroll-width]");
    moveline_one.style.width = scrlWidth_one.scrollWidth + "px";
    moveline_two.style.width = scrlWidth_two.scrollWidth + "px";
}

const settings_first_slider = {
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false,
    on: {
        beforeInit() {
            setWrapperSize();
        },
        init: (swiper) => {
            clm = initMovingSlider(swiper);
            clm.start();
        },
        beforeDestroy: () => {
            clm.stop();
            clm = null;
        }
    }
};
const settings_second_slider = {
    slidesPerView: 1,
    loop: true,
    allowTouchMove: false,
    on: {
        beforeInit() {
            setWrapperSize();
        },
        init: (swiper) => {
            clm2 = initMovingSlider(swiper);
            clm2.start();
        },
        beforeDestroy: () => {
            clm2.stop();
            clm2 = null;
        }
    }
};

let cardslineSwiper = new Swiper(".moveline-card-swiper", settings_first_slider);
let cardslineSwiper2 = new Swiper(".moveline-card2-swiper", settings_second_slider);

window.addEventListener("resize", () => {
    cardslineSwiper.destroy();
    cardslineSwiper2.destroy();
    cardslineSwiper = new Swiper(".moveline-card-swiper", settings_first_slider);
    cardslineSwiper2 = new Swiper(".moveline-card2-swiper", settings_second_slider);
});

function initMovingSlider(swiper){
    const START_POSITION = swiper.translate;
    const border = (swiper.wrapperEl.scrollWidth - swiper.width) * -1;
    let raf = null;

    function translate(){
        const next = swiper.translate - 3;
        const next_translate = next < border ? START_POSITION : next;

        swiper.setTranslate(next_translate);

        raf = requestAnimationFrame(translate);
    }

    return {
        start(){
            translate();
        },
        stop(){
            cancelAnimationFrame(raf);
        }
    }
}
 
// Faq
initfaq();

function initfaq(){
    const list = document.querySelector(".faq__list");
    const items = [...list.querySelectorAll(".faq-item")];

    items.forEach(faqHandler);
}
function faqHandler(item){
    const answer = item.querySelector(".faq-item__answer");
    let active = false;    

    hide();

    item.addEventListener("click", () => {
        active = !active;
        
        active ? show() : hide();
    });

    function hide(){
        item.classList.remove("opened");
        css(answer, {
            height: 0,
            margin: 0
        });
    }
    function show(){
        item.classList.add("opened");
        css(answer, {
            height: answer.scrollHeight + "px",
            margin: ""
        });
    }
}

// Clone Elements

cloneElement();

function cloneElement(){
    for(let elementReplace of document.querySelectorAll("[data-insert]")){
        const parentElement = elementReplace.parentElement;
        const data = elementReplace.dataset.insert;
        const elementToClone = document.querySelector(`[data-clone='${data}']`);

        if(!elementToClone) continue;

        elementToClone.removeAttribute("data-clone");
        
        const clonedElement = elementToClone.cloneNode(true);
        clonedElement.classList.add("cloned");

        parentElement.replaceChild(clonedElement, elementReplace);
    }
}


// util
function css(element, styles = {}){
    Object.assign(element.style, styles);
}

