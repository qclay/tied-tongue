import 'swiper/css';
import './scss/style.scss';
import Swiper from 'swiper';
import gsap from 'gsap';
import Renderer from './renderer'

let clm = null;
let clm2 = null;

window.addEventListener("load", setWrapperSize);

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
// Lazy load images
lazyLoad();

function lazyLoad(){
    const lazy_images = document.querySelectorAll("[data-lazy-bg]");

    for(let imageItem of lazy_images){
        const src = imageItem.dataset.lazyBg;
        const img = document.createElement("img");
        img.src = src;
        imageItem.removeAttribute("data-lazy-bg");

        img.onload = () => {
            imageItem.style.backgroundImage = `url(${src})`;
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

// parallax
parallax();

window.addEventListener("scroll", parallax);

function parallax(){
    const [fst, sc, th, frt] = document.querySelectorAll("[data-mouth]");
    const scrolled = window.pageYOffset;

    fst.style.transform = `translateY(${scrolled * fst.dataset.mouth * -1}px) rotate(${scrolled * fst.dataset.mouth}deg)`;
    sc.style.transform = `translateY(${scrolled * sc.dataset.mouth * -1}px) rotate(${scrolled * sc.dataset.mouth * -1}deg)`;
    th.style.transform = `translateY(${scrolled * th.dataset.mouth * -1}px) rotate(${scrolled * th.dataset.mouth}deg)`;
    frt.style.transform = `translateY(${scrolled * frt.dataset.mouth * -1}px) rotate(${scrolled * frt.dataset.mouth * -1}deg)`;
}


// door-animation
window.addEventListener('load', doorAnimation)

function doorAnimation() {
    const doorAnimationCanvas = document.querySelector('.door-animation')
    if (!doorAnimationCanvas) { return }
    const loader = document.getElementById("loader");
    css(loader, {
        opacity: 0,
        visibility: "hidden",
        transform: "translate(-50%, -100%)"
    });

    const timeline = gsap.timeline()
    timeline.to('.cards [class*="card"]', 
    {
        x: function(idx) {
            if (idx === 0) return '-10vw'
            if (idx === 1) return '-5vw'
            if (idx === 2) return '5vw'
            if (idx === 3) return '10vw'
        },
        y: function(idx) {
            if (idx === 0) return '-60vh'
            if (idx === 1) return '-63vh'
            if (idx === 2) return '-67vh'
            if (idx === 3) return '-57vh'
        }, 
        duration: 1.25, 
        delay: 2,
        ease: "power2.out"
    });

    timeline.to('.cards [class*="card"]', {opacity: 0, duration: 0.75});

    timeline.to('.doors [class*="door"]', 
    {
        rotateY: (idx) => {return idx === 1 ? '-90deg' : '90deg'}, 
        duration: 2,
        onStart() {
            doorAnimationCanvas.style.backgroundColor = "transparent"
        }
    }, 3.5)

    timeline.to('.doors', {scale: 2, duration: 2, ease: 'expo.inOut'}, 3.75)
    timeline.to('.doors', 
    {
        opacity: 0,
        duration: 0.5,
        onComplete() {
            ['body', 'html'].forEach(item => {
                document.querySelector(item).style.overflow = ''
            })
            doorAnimationCanvas.remove()
            timeline.kill()
        }
    }, 5)
}


// society animation
const society = document.querySelector('#society')
const societyContent = Array.from(document.querySelectorAll('.society__content'))
const cards = Array.from(document.querySelectorAll('.society__cards [class*="card"]'))
function societyStorytell() {
    if (Renderer.isElementVisible(society)) {
        const trY = [
            Renderer.getSpeedFromScrollCoord(Renderer.getScrollCoordsFromElement(societyContent[0]).windowBottom.fromTop),
            Renderer.getSpeedFromScrollCoord(Renderer.getScrollCoordsFromElement(societyContent[1]).windowBottom.fromTop),
            Renderer.getSpeedFromScrollCoord(Renderer.getScrollCoordsFromElement(societyContent[2]).windowBottom.fromTop),
            Renderer.getSpeedFromScrollCoord(Renderer.getScrollCoordsFromElement(societyContent[3]).windowBottom.fromTop),
            Renderer.getSpeedFromScrollCoord(Renderer.getScrollCoordsFromElement(document.querySelector('#court')).windowBottom.fromTop),
        ]

        cards.forEach((card, idx) => {
            card.style.cssText = 
            `
                transform: scale(${Math.max(1, 3 - trY[idx]['/400'])});
                opacity: ${-2 + trY[idx]['/200']};
            `
        })
        societyContent.forEach((text, idx) => {
            text.style.opacity = -2 + trY[idx]['/250']
        })
        if (trY[4]['1'] > 0) {
            society.classList.add('scrolled')
        } else {
            society.classList.remove('scrolled')
        }
    }
}
Renderer.render([societyStorytell])