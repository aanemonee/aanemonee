/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
import smoothscroll from 'smoothscroll-polyfill';

const introPageText = document.querySelector('.intro-page__text-greeting');
const introPage = document.querySelector('.intro-page');
const navMenu = document.querySelector('.navigation-mobile');
const bgLaptop = document.querySelector('.secondary-bg');
const bgLight = document.querySelector('.light-bg');
const introText = document.querySelector('.intro-page__text');
const skilsPageSlider = document.querySelector('.skills-page__content');
const skilsPageLine = document.querySelector('.skills-page__content-box');
const skillsPageItems = document.querySelectorAll('.skills-page__content-item');
const sl = document.querySelector('.slider');
const sln = document.querySelector('.slider-line');
const si = document.querySelectorAll('.slider-item');
const headerContent = document.querySelector('.site-header__content');

smoothscroll.polyfill();
const clearName = (element) => {
  const elem = element;
  elem.innerText = 'Welcome';
};
// update greeting text onload
if (localStorage.getItem('name') !== null) {
  const userName = localStorage.getItem('name');
  introPageText.innerText = `Welcome, ${userName}!`;
}

const sendName = (elem) => {
  const element = elem;
  const nameValue = document.querySelector('.svelte-input-name').value;
  element.innerText = `Welcome, ${nameValue}! Now reload page`;
  localStorage.setItem('name', nameValue);
};

// forces a fn function to wait certain amount of time before running again
const DEBOUNCE = (fn, ms) => {
  let timeout;
  return function (...args) {
    const fnCall = () => { fn.apply(this, args); };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
// switch height of elem between a and b values
const elemHeightChanger = (elem, a, b) => {
  const el = elem;
  const result = (el.offsetHeight === b) ? el.style.height = `${a}px` : el.style.height = `${b}px`;

  return result;
};
/* constructor function for simple custom slider
 methods next\prev for switching between blocks\images
 */
const CustomSlider = function (el, elLine, elItems) {
  const slider = el;
  const sliderItems = elItems;
  const sliderLine = elLine;
  let count = 0;
  let sliderWidth = 0;

  const rollSlider = () => { sliderLine.style.transform = `translate(-${count * sliderWidth}px)`; };
  // recalculates width of sliderLine and sliderItems depends on slider width
  const init = () => {
    sliderWidth = slider.offsetWidth;
    sliderLine.style.width = `${sliderWidth * sliderItems.length}px`;
    sliderItems.forEach((item) => {
      const slideritem = item;
      slideritem.style.width = `${sliderWidth}px`;
      slideritem.style.height = 'auto';
    });
    rollSlider();
  };
  window.addEventListener('resize', DEBOUNCE(init, 200));

  const next = () => {
    count += 1;
    if (count >= sliderItems.length) {
      count = 0;
    }
    rollSlider();
  };

  const prev = () => {
    count -= 1;
    if (count < 0) {
      count = sliderItems.length - 1;
    }
    rollSlider();
  };

  init();
  return {
    next,
    prev,
  };
};

const MYSLIDER = new CustomSlider(sl, sln, si);

const togglePopup = (elem) => {
  const el = elem;
  el.classList.toggle('visible-popup');
};
const toggleLight = (el) => { el.classList.toggle('hidden'); };
const lightOnOpacity = (el) => { el.classList.toggle('low-opacity'); };

const bgAnimation = (el, box) => {
  const animatedElem = el;
  const elemParent = box;
  // eslint-disable-next-line no-unused-expressions
  (elemParent) && (window.innerWidth > 1031) && elemParent.addEventListener('mousemove', DEBOUNCE((e) => {
    const offsetX = ((e.clientX / window.innerWidth) * 30) - 15;
    const offsetY = ((e.clientY / window.innerHeight) * 10) - 5;
    const bgMove = animatedElem.setAttribute('style', `background-position: ${offsetX}px ${offsetY}px;`);
    return bgMove;
  }, 10));
};
let SKILLSLIDER = {};
// eslint-disable-next-line consistent-return
const test = () => {
  if (window.innerWidth > 1031) return false;
  skilsPageSlider.classList.add('skills-page__slider');
  skilsPageLine.classList.add('skills-page__slider-line');
  skillsPageItems.forEach((elem) => { elem.classList.add('skills-page__slider-item'); });
  SKILLSLIDER = new CustomSlider(skilsPageSlider, skilsPageLine, skillsPageItems);
  return SKILLSLIDER;
};
const clearLocalStorage = () => {
  localStorage.clear();
};
// global event listener
document.addEventListener('DOMContentLoaded', () => {
  test();
  // eslint-disable-next-line consistent-return
  document.addEventListener('click', () => {
    const ROLE = event.target.dataset.role;
    const { step } = event.target.dataset;
    const wayTo = document.querySelector(`#${step}`);

    if (!ROLE) return false;
    event.preventDefault();
    // eslint-disable-next-line default-case
    switch (ROLE) {
      case 'mobile-main-nav':
        DEBOUNCE(elemHeightChanger(headerContent, 200, 50), 1000);
        DEBOUNCE(togglePopup(navMenu), 1000);
        break;

      case 'light-switcher':
        toggleLight(bgLight);
        lightOnOpacity(introText);
        break;
      case 'link':
        wayTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'slider-next':
        MYSLIDER.next();
        break;
      case 'slider-prev':
        MYSLIDER.prev();
        break;
      case 'skills-slider-next':
        // eslint-disable-next-line no-undef
        SKILLSLIDER.next();
        break;
      case 'skills-slider-prev':
        // eslint-disable-next-line no-undef
        SKILLSLIDER.prev();
        break;
      case 'forgotName':
        clearLocalStorage();
        clearName(introPageText);
        break;
      case 'setName':
        sendName(introPageText);
        // textChanger(introPageText, buttonFlag);
        break;
    }
  });

  let prevScrollPosition = window.pageYOffset;
  window.onscroll = DEBOUNCE(() => {
    const currentScrollPosition = window.pageYOffset;
    // const height = (el) => {
    //   const result = (el.offsetHeight === 50) ? '50px' : '200px';
    //   return result;
    // };
    const isMenuVisible = (el) => {
      const menuStatus = (el.offsetHeight === 90)
        ? (togglePopup(navMenu), elemHeightChanger(headerContent, 200, 50))
        : false;
      return menuStatus;
    };
    if (prevScrollPosition > currentScrollPosition) {
      document.querySelector('.site-header').style.top = '0';
      // document.querySelector('.navigation-mobile').style.top = '0';
    } else {
      isMenuVisible(navMenu);
      document.querySelector('.site-header').style.top = '-50px';
      // document.querySelector('.navigation-mobile').style.top = `-${height(navMenu)}`;
    }
    prevScrollPosition = currentScrollPosition;
  }, 50);
  document.addEventListener('scroll', DEBOUNCE(() => {
    //
    const aboutPage = document.querySelector('.about-page');

    const aboutPageLol = aboutPage.getBoundingClientRect();

    if (window.pageYOffset > aboutPageLol.top) {
      bgLight.classList.add('hidden');
      introText.classList.add('low-opacity');
    } else if (window.pageYOffset < aboutPageLol.top) {
      bgLight.classList.remove('hidden');
      introText.classList.remove('low-opacity');
    }
  }, 50));
  bgAnimation(bgLaptop, introPage);
});
