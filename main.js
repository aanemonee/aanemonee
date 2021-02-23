/* eslint-disable */
'use strict';

const introPage = document.querySelector('.intro-page');
const navMenu = document.querySelector('.navigation-mobile');
const bgLaptop = document.querySelector('.secondary-bg');
const bgLight = document.querySelector('.light-bg');
const introText = document.querySelector('.intro-page__text');
const lampSwitcher = document.querySelector('.intro-page__switcher');

let animationStarted = false;

// const introTextOpacity = document.querySelector('.');
class ToggleClass {
  constructor(el, className) {
      this.el = el;
      this.className = className;
    }

    addCssClass() {
      this.el.classList.addClass(`${this.className}`);
    }
    removeCssClass() {
      this.el.classList.removeClass(`${this.classname}`)
    }
    containsCssClass() {
      this.el.classList.contains(`${this.className}`);
    }
}

const sl = document.querySelector('.slider');
const si = document.querySelectorAll('.slider-item');
const sln = document.querySelector('.slider-line');
const CustomSlider = function (SLIDER, sliderItems, sliderLine) {
  let count = 0;
  let sliderWidth;
  
  const init = function () {
      sliderWidth =  SLIDER.offsetWidth;
      sliderLine.style.width =  sliderWidth*sliderItems.length + 'px';
      sliderItems.forEach(item => {
          item.style.width = sliderWidth + 'px';
          item.style.height = 'auto';
      })
      rollSlider();
  }
  window.addEventListener('resize', init);
  const next = function () {
      count++;
      if (count >= sliderItems.length){
        count = 0;
      }
      rollSlider();
  }
  const prev = function() {
      count--;
      if (count < 0) {
        count = sliderItems.length;
      }
      rollSlider();
  }
  const rollSlider = function() {
    sliderLine.style.transform = 'translate(-'+count*sliderWidth+'px)';
  }
  init();
  return {
    next,
    prev
  }
}

const MYSLIDER = new CustomSlider(sl, si, sln);




function togglePopup(el) {
    el.classList.toggle('visible-popup');
}
const toggleLight = (el) => { el.classList.toggle('hidden'); }
const lightOnOpacity = (el) => {el.classList.toggle('low-opacity');}

const bgAnimation = () => {(introPage) && introPage.addEventListener("mousemove", (e) => {
    let offsetX = (e.clientX / window.innerWidth * 30) - 15;
    let offsetY = (e.clientY / window.innerHeight * 10) - 5;
    bgLaptop.setAttribute("style", "background-position: " + offsetX + "px " + offsetY + "px;");
    animationStarted = true;
  })};

// global event listener
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', () =>{
        const ROLE = event.target.dataset.role;
        if (!ROLE) return false;
        event.preventDefault();

        switch (ROLE) {
            case 'mobile-main-nav': 
              togglePopup(navMenu);
            break;

            case 'light-switcher':
              toggleLight(bgLight);
              lightOnOpacity(introText)
            break;
            case 'link':
              let step = event.target.dataset.step;
              let wayTo = document.querySelector(`#${step}`);
              wayTo.scrollIntoView({behavior:'smooth', block:'start'})
            break;
            case 'slider-next': 
              MYSLIDER.next(); 
            break;
            case 'slider-prev': 
              MYSLIDER.prev();
            break;
        }
    })
    let prevScrollPosition = window.pageYOffset;

      window.onscroll = () => {
        const currentScrollPosition = window.pageYOffset;
        
        if (prevScrollPosition > currentScrollPosition) {
          document.querySelector('.site-header').style.top = "0";
        } else {
            document.querySelector('.site-header').style.top = "-50px";
        }
        prevScrollPosition = currentScrollPosition;
      }

    document.addEventListener('scroll',() => {
      // 
      let aboutPage = document.querySelector('.about-page');

      const aboutPageLol = aboutPage.getBoundingClientRect();

      if (window.pageYOffset > aboutPageLol.top) {
        // alert('половина');
        bgLight.classList.add('hidden');
        introText.classList.add('low-opacity');
      }
      
   
  });
  bgAnimation();
      
  })