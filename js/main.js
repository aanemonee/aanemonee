/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
const introPageText = document.querySelector('.intro-page__text-greeting');
const introPage = document.querySelector('.intro-page');
const navMenu = document.querySelector('.navigation-mobile');
const bgLaptop = document.querySelector('.secondary-bg');
const bgLight = document.querySelector('.light-bg');
const introText = document.querySelector('.intro-page__text');
const skilsPageSlider = document.querySelector('.skills-page__content');
const skilsPageLine = document.querySelector('.skills-page__content-box');
const skillsPageItems = document.querySelectorAll('.skills-page__content-item');
const aboutPageSlider = document.querySelector('.slider');
const aboutPageLine = document.querySelector('.slider-line');
const aboutPageItems = document.querySelectorAll('.slider-item');
const headerContent = document.querySelector('.site-header__content');

// forces a fn function to wait certain amount of time before running again
const DEBOUNCE = (fn, ms) => {
  let timeout;
  return function (...args) {
    const fnCall = () => { fn.apply(this, args); };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};

// laptop animation
const laptopAnimation = (el, box) => {
  const animatedElem = el;
  const elemParent = box;
  (elemParent) && (window.innerWidth > 1031) && elemParent.addEventListener('mousemove', DEBOUNCE((e) => {
    const offsetX = ((e.clientX / window.innerWidth) * 30) - 15;
    const offsetY = ((e.clientY / window.innerHeight) * 10) - 5;
    const bgMove = animatedElem.setAttribute('style', `background-position: ${offsetX}px ${offsetY}px;`);
    return bgMove;
  }, 10));
};
// greeting page inner text functions
// changing greeting text to welcome
const clearName = (element) => {
  const elem = element;
  elem.innerText = 'Welcome';
};
// update greeting text onload
if (localStorage.getItem('name') !== null) {
  const userName = localStorage.getItem('name');
  introPageText.innerText = `Welcome, ${userName}!`;
}
// changing greeting text and saves nameValue to localStorage
const sendName = (elem) => {
  const element = elem;
  const nameValue = document.querySelector('.svelte-input-name').value;
  element.innerText = `Welcome, ${nameValue}! Now reload page`;
  localStorage.setItem('name', nameValue);
};
// clear userName from localStorage
const clearLocalStorage = () => {
  localStorage.clear();
};

// changes header menu height on menu click
// switch height of elem between a and b values
const elemHeightChanger = (elem, a, b) => {
  const el = elem;
  const result = (el.offsetHeight === b) ? el.style.height = `${a}px` : el.style.height = `${b}px`;

  return result;
};
/* simple custom slider function
   methods next\prev for switching between blocks\images
 */
const CustomSlider = (el, elLine, elItems) => {
  const slider = el;
  const sliderItems = elItems;
  const sliderLine = elLine;
  let count = 0;
  let sliderWidth = 0;

  // rolling slider to left/right
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
  };
  // resizing slider line and itens width on resizing window
  init();
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

  return {
    next,
    prev,
  };
};

// creating instanse
const mainSlider = new CustomSlider(aboutPageSlider, aboutPageLine, aboutPageItems);

// mobile nav menu open\close
const togglePopup = (elem) => {
  const el = elem;
  el.classList.toggle('visible-popup');
};

let SKILLSLIDER = {};
//  function switches grid and slider on skills-page
function skillsPageGridOrSlider() {
  if (window.innerWidth > 1031) return false;
  skilsPageSlider.classList.add('skills-page__slider');
  skilsPageLine.classList.add('skills-page__slider-line');
  skillsPageItems.forEach((elem) => { elem.classList.add('skills-page__slider-item'); });
  SKILLSLIDER = new CustomSlider(skilsPageSlider, skilsPageLine, skillsPageItems);
  return SKILLSLIDER;
}
// global event listener
document.addEventListener('DOMContentLoaded', () => {
  skillsPageGridOrSlider(skilsPageSlider, skilsPageLine, skillsPageItems);
  document.addEventListener('click', () => {
    const ROLE = event.target.dataset.role;

    if (!ROLE) return false;
    const { step } = event.target.dataset;
    const wayTo = document.querySelector(`#${step}`);
    event.preventDefault();
    // eslint-disable-next-line default-case
    switch (ROLE) {
      case 'mobile-main-nav':
        DEBOUNCE(elemHeightChanger(headerContent, 200, 50), 1000);
        DEBOUNCE(togglePopup(navMenu), 1000);
        break;
      case 'link':
        wayTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'slider-next':
        mainSlider.next();
        break;
      case 'slider-prev':
        mainSlider.prev();
        break;
      case 'skills-slider-next':
        SKILLSLIDER.next();
        break;
      case 'skills-slider-prev':
        SKILLSLIDER.prev();
        break;
      case 'forgotName':
        clearLocalStorage();
        clearName(introPageText);
        break;
      case 'setName':
        sendName(introPageText);
        break;
    }
  });

  // function hides menu on scroll down
  let prevScrollPosition = window.pageYOffset;
  window.onscroll = DEBOUNCE(() => {
    const currentScrollPosition = window.pageYOffset;

    // hide mobile navigation menu on scroll down
    const isMenuVisible = (el) => {
      const menuStatus = (el.offsetHeight === 90)
        ? (togglePopup(navMenu), elemHeightChanger(headerContent, 200, 50))
        : false;
      return menuStatus;
    };

    if (prevScrollPosition > currentScrollPosition) {
      document.querySelector('.site-header').style.top = '0';
    } else {
      isMenuVisible(navMenu);
      document.querySelector('.site-header').style.top = '-50px';
    }
    prevScrollPosition = currentScrollPosition;
  }, 50);

  // turns off light and reduces opacity
  document.addEventListener('scroll', DEBOUNCE(() => {
    const aboutPage = document.querySelector('.about-page');

    const aboutPageScrollPos = aboutPage.getBoundingClientRect();

    if (window.pageYOffset > aboutPageScrollPos.top) {
      bgLight.classList.add('hidden');
      introText.classList.add('low-opacity');
    } else if (window.pageYOffset < aboutPageScrollPos.top) {
      bgLight.classList.remove('hidden');
      introText.classList.remove('low-opacity');
    }
  }, 50));
  laptopAnimation(bgLaptop, introPage);
});
