// TypeScript interfaces and types
interface PluginConfig {
  id: string;
  plug?: string;
  call?: string;
  style?: string;
  trigger: string;
}

interface iOSVersion {
  status: boolean;
  version: number | false;
  info: string;
}

interface WeekDay {
  [index: number]: [string, number?, number?];
}

// Type imports
type DateTimeFormatOptions = Intl.DateTimeFormatOptions;

// Global type declarations
declare const bootstrap: any;
declare const Splide: any;

// Global variables
const pwaName: string = "Appkit"; // Local Storage Names for PWA

// Removing Preloader
setTimeout((): void => {
  const preloader: HTMLElement | null = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('preloader-hide');
  }
}, 2000);

document.addEventListener('DOMContentLoaded', (): void => {
  'use strict';



  // Place all your custom TypeScript functions and plugin calls below this line
  function init_template(): void {
    // Caching Global Variables
    let i: number, e: Element, el: Element; // https://www.w3schools.com/js/js_performance.asp

    //Attaching Menu Hider
    var menuHider = document.getElementsByClassName('menu-hider');
    if(!menuHider.length){var hider = document.createElement('div'); hider.setAttribute("class", "menu-hider");document.body.insertAdjacentElement('beforebegin', hider);}
    if(menuHider[0].classList.contains('menu-active')){menuHider[0].classList.remove('menu-active');}

    //Demo function for programtic creation of Menu
    //menu('menu-settings', 'show', 250);

    //Activating Menus
    //document.querySelectorAll('.menu').forEach(el=>{el.style.display='block'})

    //Validator
    // var inputField = document.querySelectorAll('input');
    // if(inputField.length){
    //     var mailValidator = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    //     var phoneValidator = /^\d{11}$/;
    //     var nameValidator = /^[\u0600-\u06FF\s]{4,}$/;
    //     var passwordValidator = /[A-Za-z]{4}[A-Za-z]*[ ]?[A-Za-z]*/;
    //     var numberValidator = /^(0|[1-9]\d*)$/;
    //     var linkValidator = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
    //     var textValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;

    //     function valid(el){
    //         el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
    //         el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
    //     }
    //     function invalid(el){
    //         el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
    //         el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
    //     }
    //     function unfilled(el){
    //         el.parentElement.querySelectorAll('em')[0].classList.remove('disabled');
    //         el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
    //         el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
    //     }

    //     var regularField = document.querySelectorAll('.input-style input:not([type="date"])')
    //     regularField.forEach(el => el.addEventListener('keyup', e => {
    //         if(!el.value == ""){
    //             el.parentElement.classList.add('input-style-active');
    //             el.parentElement.querySelector('em').classList.add('disabled');
    //         } else {
    //             el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
    //             el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
    //             el.parentElement.classList.remove('input-style-active');
    //             el.parentElement.querySelector('em').classList.remove('disabled');
    //         }
    //     }));

    //     var regularTextarea = document.querySelectorAll('.input-style textarea')
    //     regularTextarea.forEach(el => el.addEventListener('keyup', e => {
    //         if(!el.value == ""){
    //             el.parentElement.classList.add('input-style-active');
    //             el.parentElement.querySelector('em').classList.add('disabled');
    //         } else {
    //             el.parentElement.classList.remove('input-style-active');
    //             el.parentElement.querySelector('em').classList.remove('disabled');
    //         }
    //     }));

    //     var selectField = document.querySelectorAll('.input-style select')
    //     selectField.forEach(el => el.addEventListener('change', e => {
    //         if(el.value !== "default"){
    //             el.parentElement.classList.add('input-style-active');
    //             el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
    //             el.parentElement.querySelectorAll('.invalid, em, span')[0].classList.add('disabled');
    //         }
    //         if(el.value == "default"){
    //             el.parentElement.querySelectorAll('span, .valid, em')[0].classList.add('disabled');
    //             el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
    //             el.parentElement.classList.add('input-style-active');
    //         }
    //     }));

    //     var dateField = document.querySelectorAll('.input-style input[type="date"]')
    //     dateField.forEach(el => el.addEventListener('change', e => {
    //         el.parentElement.classList.add('input-style-active');
    //         el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
    //         el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
    //     }));

    //     var validateField = document.querySelectorAll('.validate-field input, .validator-field textarea');
    //     if(validateField.length){
    //         validateField.forEach(el => el.addEventListener('keyup', e => {
    //             var getAttribute = el.getAttribute('type');
    //             switch(getAttribute){
    //                 case 'name': nameValidator.test(el.value) ? valid(el) : invalid(el); break;
    //                 case 'number': numberValidator.test(el.value) ? valid(el) : invalid(el); break;
    //                 case 'email': mailValidator.test(el.value) ? valid(el) : invalid(el); break;
    //                 case 'text': textValidator.test(el.value) ? valid(el) : invalid(el); break;
    //                 case 'url': linkValidator.test(el.value) ? valid(el) : invalid(el); break;
    //                 case 'tel': phoneValidator.test(el.value) ? valid(el) : invalid(el); break;
    //                 case 'password': passwordValidator.test(el.value) ? valid(el) : invalid(el); break;
    //             }
    //             if(el.value === ""){unfilled(el);}
    //         }));
    //     }
    // }

    //OTP Boxes - Appkit 3.0
    // var otp = document.querySelectorAll('.otp');
    // if(otp[0]){
    // 	otp.forEach(el => {
    // 		el.addEventListener('focus', (e) => {el.value = "";})
    // 		el.addEventListener('input', (e) => {el.nextElementSibling ? el.nextElementSibling.focus() : el.blur();});
    // 	});
    // }

    // Image Sliders
    const splide: HTMLCollectionOf<Element> = document.getElementsByClassName('splide');
    if (splide.length) {
      const singleSlider: NodeListOf<Element> = document.querySelectorAll('.single-slider');
      if (singleSlider.length) {
        singleSlider.forEach((e: Element): void => {
          const single = new (window as any).Splide('#' + e.id, {
            type: 'loop',
            autoplay: true,
            direction: 'rtl',
            interval: 4000,
            perPage: 1,
          }).mount();
          const sliderNext: NodeListOf<Element> = document.querySelectorAll('.slider-next');
          const sliderPrev: NodeListOf<Element> = document.querySelectorAll('.slider-prev');
          sliderNext.forEach((el: Element): void => { single.go('>'); });
          sliderPrev.forEach((el: Element): void => { single.go('<'); });
        });
      }

      const doubleSlider: NodeListOf<Element> = document.querySelectorAll('.double-slider');
      if (doubleSlider.length) {
        doubleSlider.forEach((e: Element): void => {
          const double = new (window as any).Splide('#' + e.id, {
            type: 'loop',
            autoplay: true,
            direction: 'rtl',
            interval: 4000,
            arrows: false,
            perPage: 2,
          }).mount();
        });
      }

      const trippleSlider: NodeListOf<Element> = document.querySelectorAll('.tripple-slider');
      if (trippleSlider.length) {
        trippleSlider.forEach((e: Element): void => {
          const tripple = new (window as any).Splide('#' + e.id, {
            type: 'loop',
            autoplay: true,
            direction: 'rtl',
            padding: {
              left: '0px',
              right: '80px',
            },
            interval: 4000,
            arrows: false,
            perPage: 2,
            perMove: 1,
          }).mount();
        });
      }
    }

    const topicSlider: NodeListOf<Element> = document.querySelectorAll('.topic-slider');
    if (topicSlider.length) {
      const topic = new (window as any).Splide('.topic-slider', {
        type: 'loop',
        autoplay: false,
        direction: 'rtl',
        padding: {
          left: '15px',
          right: '40px',
        },
        arrows: false,
        perPage: 3,
        perMove: 1,
      }).mount();
    }
    const storySlider: NodeListOf<Element> = document.querySelectorAll('.story-slider');
    if (storySlider.length) {
      const story = new (window as any).Splide('.story-slider', {
        type: 'loop',
        autoplay: false,
        direction: 'rtl',
        padding: {
          left: '0px',
          right: '40px',
        },
        arrows: false,
        perPage: 4,
        perMove: 1,
      }).mount();
    }


    //Don't jump on Empty Links
    // const emptyHref = document.querySelectorAll('a[href="#"]')
    // emptyHref.forEach(el => el.addEventListener('click', e => {
    //     e.preventDefault();
    //     return false;
    // }));

    // Map Page
    const fullMap: NodeListOf<Element> = document.querySelectorAll('.hide-map');
    if (fullMap.length) {
      const mapActivator: NodeListOf<Element> = document.querySelectorAll('.show-map');
      const mapDisabler: NodeListOf<Element> = document.querySelectorAll('.hide-map');
      (mapActivator[0] as HTMLElement).addEventListener('click', function (e: Event): void {
        (document.getElementsByClassName('card-overlay')[0] as HTMLElement).classList.add('disabled');
        (document.getElementsByClassName('card-center')[0] as HTMLElement).classList.add('disabled');
        (document.getElementsByClassName('hide-map')[0] as HTMLElement).classList.remove('disabled');
      });
      (mapDisabler[0] as HTMLElement).addEventListener('click', function (e: Event): void {
        (document.getElementsByClassName('card-overlay')[0] as HTMLElement).classList.remove('disabled');
        (document.getElementsByClassName('card-center')[0] as HTMLElement).classList.remove('disabled');
        (document.getElementsByClassName('hide-map')[0] as HTMLElement).classList.add('disabled');
      });
    }

    // var checkedCard = document.querySelectorAll('.check-card');
    // checkedCard.forEach(el => el.addEventListener('click', e => {
    //     if(el.querySelector('input').getAttribute('checked') =="checked"){
    //         el.querySelector('input').removeAttribute('checked');
    //     } else {
    //         el.querySelector('input').setAttribute('checked', 'checked');
    //     }
    // }));



    //To Do List
    // var toDoList = document.querySelectorAll('.todo-list a');
    // toDoList.forEach(el => el.addEventListener('click', e => {
    //     el.classList.toggle('opacity-80');
    //     if(el.querySelector('input').getAttribute('checked') == "checked"){
    //         el.querySelector('input').removeAttribute('checked');
    //     } else {
    //         el.querySelector('input').setAttribute('checked', 'checked');
    //     }
    // }));

    //Setting Sidebar Widths
    // var menus = document.querySelectorAll('.menu');
    // function menuFunction(){
    //     if(menus.length){
    //         var menuSidebar = document.querySelectorAll('.menu-box-left, .menu-box-right');
    //         menuSidebar.forEach(function(e){
    //             if(e.getAttribute('data-menu-width') === "cover"){
    //                 e.style.width = '100%'
    //             } else {
    //                 e.style.width = (e.getAttribute('data-menu-width')) +'px'
    //             }
    //         })
    //         var menuSheets = document.querySelectorAll('.menu-box-bottom, .menu-box-top, .menu-box-modal');
    //         menuSheets.forEach(function(e){
    //             if(e.getAttribute('data-menu-width') === "cover"){
    //                 e.style.width = '100%'
    //                 e.style.height = '100%'
    //             } else {
    //                 e.style.width = (e.getAttribute('data-menu-width')) +'px'
    //                 e.style.height = (e.getAttribute('data-menu-height')) +'px'
    //             }
    //         })

    //Opening Menus
    // var menuOpen = document.querySelectorAll('[data-menu]');
    // var wrappers = document.querySelectorAll('.header, #footer-bar, .page-content');

    // menuOpen.forEach(el => el.addEventListener('click',e =>{
    //     //Close Existing Opened Menus
    //     const activeMenu = document.querySelectorAll('.menu-active');
    //     for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
    //     //Open Clicked Menu
    //     var menuData = el.getAttribute('data-menu');
    //     document.getElementById(menuData).classList.add('menu-active');
    //     document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
    //     //Check and Apply Effects
    //     var menu = document.getElementById(menuData);
    //     var menuEffect = menu.getAttribute('data-menu-effect');
    //     var menuLeft = menu.classList.contains('menu-box-left');
    //     var menuRight = menu.classList.contains('menu-box-right');
    //     var menuTop = menu.classList.contains('menu-box-top');
    //     var menuBottom = menu.classList.contains('menu-box-bottom');
    //     var menuWidth = menu.offsetWidth;
    //     var menuHeight = menu.offsetHeight;
    //     var menuTimeout = menu.getAttribute('data-menu-hide');

    //     if(menuTimeout){
    //         setTimeout(function(){
    //             document.getElementById(menuData).classList.remove('menu-active');
    //             document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');
    //         },menuTimeout)
    //     }

    //     if(menuEffect === "menu-push"){
    //         var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
    //         if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth+"px)"}}
    //         if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth+"px)"}}
    //         if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight+"px)"}}
    //         if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight+"px)"}}
    //     }
    //     if(menuEffect === "menu-parallax"){
    //         var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
    //         if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth/10+"px)"}}
    //         if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth/10+"px)"}}
    //         if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight/5+"px)"}}
    //         if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight/5+"px)"}}
    //     }
    // }));

    //Closing Menus
    // const menuClose = document.querySelectorAll('.close-menu, .menu-hider');
    // menuClose.forEach(el => el.addEventListener('click',e =>{
    //     const activeMenu = document.querySelectorAll('.menu-active');
    //     for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
    //     for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+0+"px)"}
    // }));
    //     }
    // }
    //menuFunction();

    // function activateMenus(){
    //     const menuActive = document.querySelectorAll('[data-menu-active]')[0];
    //     if(menuActive){
    //         var selectedMenu = menuActive.getAttribute('data-menu-active');
    //         document.querySelectorAll('#'+selectedMenu)[0].classList.add('active-nav');
    //     }
    // }

    //Back Button
    // const backButton = document.querySelectorAll('[data-back-button]');
    // if(backButton.length){
    //     backButton.forEach(el => el.addEventListener('click',e =>{
    //         e.stopPropagation;
    //         e.preventDefault;
    //         window.history.go(-1);
    //     }));
    // }


    //Back to Top
    // function backUp() {
    //   const backToTop = document.querySelectorAll('.back-to-top-icon, .back-to-top-badge, .back-to-top');
    //   if (backToTop) {
    //     backToTop.forEach(el => el.addEventListener('click', e => {
    //       window.scrollTo({ top: 0, behavior: `smooth` })
    //     }));
    //   }
    // }

    //Check iOS Version and add min-ios15 class if higher or equal to iOS15
    function iOSversion() {
      let d, v;
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        d = { status: true, version: parseInt(v[1], 10), info: parseInt(v[1], 10) + '.' + parseInt(v[2], 10) + '.' + parseInt(v[3] || 0, 10) };
      } else { d = { status: false, version: false, info: '' } }
      return d;
    }
    let iosVer = iOSversion();
    if (iosVer.version > 14) { document.querySelectorAll('#page')[0].classList.add('min-ios15'); }


    // Card Extender
    const cards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
    function card_extender(): void {
      let headerHeight: number, footerHeight: number;
      const headerOnPage: Element | undefined = document.querySelectorAll('.header:not(.header-transparent)')[0];
      const footerOnPage: Element | undefined = document.querySelectorAll('#footer-bar')[0];

      headerOnPage ? headerHeight = (document.querySelectorAll('.header')[0] as HTMLElement).offsetHeight : headerHeight = 0;
      footerOnPage ? footerHeight = (document.querySelectorAll('#footer-bar')[0] as HTMLElement).offsetHeight : footerHeight = 0;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        let coverHeight: string = '';

        if (card.getAttribute('data-card-height') === "cover") {
          let windowHeight: number;
          if (window.matchMedia('(display-mode: fullscreen)').matches) { windowHeight = window.outerHeight; }
          if (!window.matchMedia('(display-mode: fullscreen)').matches) { windowHeight = window.innerHeight; }
          // Fix for iOS 15 pages with data-height="cover"
          coverHeight = windowHeight + 'px';
          // - Remove this for iOS 14 issues - var coverHeight = windowHeight - headerHeight - footerHeight + 'px';
        }
        if (card.getAttribute('data-card-height') === "cover-card") {
          const windowHeight: number = window.innerHeight;
          const coverHeight: string = (windowHeight - 200) + 'px';
          card.style.height = coverHeight;
        }
        if (card.getAttribute('data-card-height') === "cover-full") {
          let windowHeight: number;
          if (window.matchMedia('(display-mode: fullscreen)').matches) { windowHeight = window.outerHeight; }
          if (!window.matchMedia('(display-mode: fullscreen)').matches) { windowHeight = window.innerHeight; }
          const coverHeight: string = windowHeight + 'px';
          card.style.height = coverHeight;
        }
        if (card.hasAttribute('data-card-height')) {
          const getHeight: string | null = card.getAttribute('data-card-height');
          if (getHeight) {
            card.style.height = getHeight + 'px';
            if (getHeight === "cover") {
              const totalHeight: string = getHeight;
              card.style.height = coverHeight;
            }
          }
        }
      }
    }

    if (cards.length) {
      card_extender();
      window.addEventListener("resize", card_extender);
    }

    //Card Effects
    const cardScale = document.querySelectorAll('.card-scale');
    if (cardScale.length) {
      cardScale.forEach(el => el.addEventListener('mouseenter', event => { el.querySelectorAll('img')[0].classList.add('card-scale-image'); }));
      cardScale.forEach(el => el.addEventListener('mouseleave', event => { el.querySelectorAll('img')[0].classList.remove('card-scale-image'); }));
    }

    const cardHide = document.querySelectorAll('.card-hide');
    if (cardHide.length) {
      cardHide.forEach(el => el.addEventListener('mouseenter', event => { el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.add('card-hide-image'); }));
      cardHide.forEach(el => el.addEventListener('mouseleave', event => { el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.remove('card-hide-image'); }));
    }

    const cardRotate = document.querySelectorAll('.card-rotate');
    if (cardRotate.length) {
      cardRotate.forEach(el => el.addEventListener('mouseenter', event => { el.querySelectorAll('img')[0].classList.add('card-rotate-image'); }));
      cardRotate.forEach(el => el.addEventListener('mouseleave', event => { el.querySelectorAll('img')[0].classList.remove('card-rotate-image'); }));
    }

    const cardGray = document.querySelectorAll('.card-grayscale');
    if (cardGray.length) {
      cardGray.forEach(el => el.addEventListener('mouseenter', event => { el.querySelectorAll('img')[0].classList.add('card-grayscale-image'); }));
      cardGray.forEach(el => el.addEventListener('mouseleave', event => { el.querySelectorAll('img')[0].classList.remove('card-grayscale-image'); }));
    }

    const cardBlur = document.querySelectorAll('.card-blur');
    if (cardBlur.length) {
      cardBlur.forEach(el => el.addEventListener('mouseenter', event => { el.querySelectorAll('img')[0].classList.add('card-blur-image'); }));
      cardBlur.forEach(el => el.addEventListener('mouseleave', event => { el.querySelectorAll('img')[0].classList.remove('card-blur-image'); }));
    }

    //Adding Local Storage for Visited Links
    var checkVisited = document.querySelectorAll('.check-visited');
    if (checkVisited.length) {
      function check_visited_links() {
        var visited_links = JSON.parse(localStorage.getItem(pwaName + '_Visited_Links')) || [];
        var links = document.querySelectorAll('.check-visited a');
        for (let i = 0; i < links.length; i++) {
          var that = links[i];
          that.addEventListener('click', function (e) {
            var clicked_url = this.href;
            if (visited_links.indexOf(clicked_url) == -1) {
              visited_links.push(clicked_url);
              localStorage.setItem(pwaName + '_Visited_Links', JSON.stringify(visited_links));
            }
          })
          if (visited_links.indexOf((that as HTMLAnchorElement).href) !== -1) {
            that.className += ' visited-link';
          }
        }
      }
      check_visited_links();
    }

    //Footer Bar Activation

    var footerBar6 = document.querySelectorAll('.footer-bar-6')[0];
    if (footerBar6) {
      var footerBar6_select = document.querySelectorAll('.footer-bar-6 .active-nav')[0];
      var footerBar6_circle = document.querySelectorAll('.footer-bar-6 .circle-nav')[0];
      footerBar6_select.insertAdjacentHTML('beforeend', '<em></em>');
      footerBar6_circle.insertAdjacentHTML('beforeend', '<strong><u></u></strong>');
    }

    //Detect Ad Block

    var adblockMessage = document.getElementById('adblock-message')
    if (adblockMessage) {
      var adblockEnabled = false;
      document.body.innerHTML += '<div class="adsbygoogle" id="ad-detector"></div>';
      var adElement = document.getElementById('ad-detector');
      var adElementStyle = getComputedStyle(adElement, null);
      if (adElementStyle.display === 'none') { document.getElementById('adblock-message').classList.remove('disabled'); }
    }

    //Ads
    // let fixedAds = document.querySelectorAll('.fixed-ad')[0];
    // let scrollAds = document.querySelectorAll('.scroll-ad')[0];

    // if (fixedAds || scrollAds) {
    //   //Activate scroll Ad
    //   var activateScrollAd = document.getElementById('activate-scroll-ad');
    //   activateScrollAd.addEventListener('click', function () {
    //     scrollAds.classList.add('scroll-ad-visible');
    //     scrollAds.classList.remove('disabled');
    //     fixedAds.classList.add('disabled');
    //   })

    //   //Activate Fixed Ad
    //   var activateFixedAd = document.getElementById('activate-fixed-ad');
    //   activateFixedAd.addEventListener('click', function () {
    //     scrollAds.classList.add('disabled');
    //     fixedAds.classList.remove('disabled');
    //   })
    // }

    //Scroll Ads
    var scrollItems = document.querySelectorAll('.scroll-ad, .header-auto-show')
    if (scrollItems.length) {
      var scrollAd = document.querySelectorAll('.scroll-ad');
      var scrollHeader = document.querySelectorAll('.header-auto-show');
      var pageTitle = document.querySelectorAll('.page-title');
      window.addEventListener('scroll', function () {
        if (document.querySelectorAll('.scroll-ad, .header-auto-show').length) {
          function showScrollAd() { scrollAd[0].classList.add('scroll-ad-visible'); }
          function hideScrollAd() { scrollAd[0].classList.remove('scroll-ad-visible'); }
          function showHeader() { scrollHeader[0].classList.add('header-active'); }
          function hideHeader() { scrollHeader[0].classList.remove('header-active'); }
          function hideTitle() { (pageTitle[0] as HTMLElement).style.opacity = "0" }
          function showTitle() { (pageTitle[0] as HTMLElement).style.opacity = "1" }
          var window_height = window.outerWidth;
          var total_scroll_height = document.documentElement.scrollTop
          let inside_header = total_scroll_height <= 80;
          var passed_header = total_scroll_height >= 80;
          let inside_title = total_scroll_height <= 40;
          var passed_title = total_scroll_height >= 40;
          let inside_footer = (window_height - total_scroll_height + 1000) <= 150
          if (scrollAd.length) {
            inside_header ? hideScrollAd() : null
            passed_header ? showScrollAd() : null
            inside_footer ? hideScrollAd() : null
          }
          if (scrollHeader.length) {
            inside_header ? hideHeader() : null
            passed_header ? showHeader() : null
          }
          if (pageTitle.length) {
            inside_title ? showTitle() : null
            passed_title ? hideTitle() : null
          }
        }
      });
    }

    //Stepper
    var stepperAdd = document.querySelectorAll('.stepper-add');
    var stepperSub = document.querySelectorAll('.stepper-sub');
    if (stepperAdd.length) {
      stepperAdd.forEach(el => el.addEventListener('click', event => {
        var currentValue = (el.parentElement.querySelector('input') as HTMLInputElement).value;
        (el.parentElement.querySelector('input') as HTMLInputElement).value = (+currentValue + 1).toString()
      }))

      stepperSub.forEach(el => el.addEventListener('click', event => {
        var currentValue = (el.parentElement.querySelector('input') as HTMLInputElement).value;
        (el.parentElement.querySelector('input') as HTMLInputElement).value = (+currentValue - 1).toString()
      }))
    }

    //Link List Toggle
    var linkListToggle = document.querySelectorAll('[data-trigger-switch]:not([data-toggle-theme])');
    if (linkListToggle.length) {
      linkListToggle.forEach(el => el.addEventListener('click', event => {
        var switchData = el.getAttribute('data-trigger-switch');
        var getCheck = document.getElementById(switchData);
        (getCheck as HTMLInputElement).checked ? (getCheck as HTMLInputElement).checked = false : (getCheck as HTMLInputElement).checked = true;
      }))
    }

    //Classic Toggle
    var classicToggle = document.querySelectorAll('.classic-toggle');
    if (classicToggle.length) {
      classicToggle.forEach(el => el.addEventListener('click', event => {
        (el.querySelector('i:last-child') as HTMLElement).classList.toggle('fa-rotate-180');
        (el.querySelector('i:last-child') as HTMLElement).style.transition = "all 250ms ease";
      }))
    }

    //Toasts
    var toastTrigger = document.querySelectorAll('[data-toast]');
    if (toastTrigger.length) {
      toastTrigger.forEach(el => el.addEventListener('click', event => {
        var toastData = el.getAttribute('data-toast')
        var notificationToastElement = document.getElementById(toastData) as HTMLElement;
        var notificationToast = new bootstrap.Toast(notificationToastElement);
        notificationToast.show();
      }));
    }


    //Tooltips
    /*Deprecated feature for Mobiles. Requires popper.min.js v2 to work
    var tooltips = document.querySelectorAll('[data-bs-tooltip]');
    if(tooltips.length){
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }
    */


    //Dropdown
    var dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'))
    if (dropdownElementList.length) {
      var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
      })
    }


    var workingHours = document.querySelectorAll('.show-business-opened, .show-business-closed, .working-hours');
    if (workingHours.length) {
      //Working Hours
      var d = new Date();
      var n = d.getDay();
      var now = d.getHours() + "." + d.getMinutes();
      var weekdays = [
        ["Sunday"],
        ["Monday", 9.00, 17.00],
        ["Tuesday", 9.00, 17.00],
        ["Wednesday", 9.00, 17.00],
        ["Thursday", 9.00, 17.00],
        ["Friday", 9.00, 17.00],
        ["Saturday", 9.00, 13.00] // we are closed, sorry!
      ];
      var day = weekdays[n];
      var openClass = document.querySelectorAll('.show-business-opened');
      var closeClass = document.querySelectorAll('.show-business-closed');

      if (now > day[1] && now < day[2] || now > day[3] && now < day[4]) {
        openClass.forEach(function (e) { e.classList.remove('disabled'); })
        closeClass.forEach(function (e) { e.classList.add('disabled'); })
      }
      else {
        openClass.forEach(function (e) { e.classList.add('disabled'); })
        closeClass.forEach(function (e) { e.classList.remove('disabled'); })
      }

      var workingHours = document.querySelectorAll('.working-hours[data-day]');
      workingHours.forEach(function (entry) {
        var matchDay = entry.getAttribute('data-day');
        if (matchDay === day[0]) {
          var matchData = '[data-day="' + day[0] + '"]'
          if (now > day[1] && now < day[2] || now > day[3] && now < day[4]) {
            document.querySelectorAll(matchData)[0].classList.add('bg-green-dark');
            document.querySelectorAll(matchData + ' p').forEach(function (whiteText) { whiteText.classList.add('color-white') });
          }
          else {
            document.querySelectorAll(matchData)[0].classList.add('bg-red-dark');
            document.querySelectorAll(matchData + ' p').forEach(function (whiteText) { whiteText.classList.add('color-white') });
          }
        }
      });
    }



    //Vibrate API
    var vibrateButton = document.querySelectorAll('[data-vibrate]');
    if (vibrateButton.length) {
      var startVibrating = document.getElementsByClassName('start-vibrating')[0];
      var stopVibrating = document.getElementsByClassName('stop-vibrating')[0];

      startVibrating.addEventListener('click', function () {
        var vibrateTime = (document.getElementsByClassName('vibrate-demo')[0] as HTMLInputElement).value;
        window.navigator.vibrate(vibrateTime as unknown as VibratePattern);
      })
      stopVibrating.addEventListener('click', function () {
        window.navigator.vibrate(0);
      })
      vibrateButton.forEach(el => el.addEventListener('click', e => {
        var vibrateTime = el.getAttribute('data-vibrate');
        window.navigator.vibrate(vibrateTime as unknown as VibratePattern);
      }));
    }

    //Time Ads
    var timedAd = document.querySelectorAll('[data-timed-ad]');
    if (timedAd.length) {
      timedAd.forEach(el => el.addEventListener('click', e => {
        var timedAdTime = el.getAttribute('data-timed-ad');
        var timedAdData = el.getAttribute('data-menu');
        var timedAdTimer: number = Number(timedAdTime);
        var timerAdFunction = setInterval(function () {
          if (Number(timedAdTimer) <= 1) {
            clearInterval(timerAdFunction);
            document.getElementById(timedAdData).querySelectorAll('.fa-times')[0].classList.remove('disabled');
            document.getElementById(timedAdData).querySelectorAll('.close-menu')[0].classList.remove('no-click');
            document.getElementById(timedAdData).querySelectorAll('span')[0].style.display = "none";
          } else {
            //console.log(timedAdTimer);
          }
          timedAdTimer = Number(timedAdTimer) - 1;
          document.getElementById(timedAdData).querySelectorAll('span')[0].innerHTML = timedAdTimer.toString();
        }, 1000);
      }));
    }

    //Auto Show Ads
    var autoAd = document.querySelectorAll('[data-auto-show-ad]');
    if (autoAd.length) {
      var autoAdTime = autoAd[0].getAttribute('data-auto-show-ad');
      var timerAdFunction = setInterval(function () {
        if (Number(autoAdTime) <= 1) {
          clearInterval(timerAdFunction);
          var autoAdId = autoAd[0].getAttribute('data-menu');
          document.getElementById(autoAdId).classList.add('menu-active');
          var autoAdCloseTime = autoAd[0].getAttribute('data-timed-ad');
          var downloadTimer = setInterval(function () {
            if (Number(autoAdCloseTime) <= 0) {
              clearInterval(downloadTimer);
              document.getElementById(autoAdId).querySelectorAll('.fa-times')[0].classList.remove('disabled');
              document.getElementById(autoAdId).querySelectorAll('.close-menu')[0].classList.remove('no-click');
              document.getElementById(autoAdId).querySelectorAll('span')[0].style.display = "none";
            }
            autoAdCloseTime = (Number(autoAdCloseTime) - 1).toString();
            document.getElementById(autoAdId).querySelectorAll('span')[0].innerHTML = autoAdCloseTime;
          }, 1000);
        }
        autoAdTime = (Number(autoAdTime) - 1).toString();
      }, 1000);
    }

    //Visit Detection
    const visitDetection = document.querySelectorAll('.visit-detection')[0];
    if (visitDetection) {
      const neverVisited = document.querySelectorAll('.never-visited')[0];
      const beforeVisited = document.querySelectorAll('.before-visited')[0];
      const visitBeforeTime = document.querySelectorAll('.visit-before-time')[0];
      const lastVisitValue = localStorage.getItem(pwaName + '-Last-Visited');
      const options: DateTimeFormatOptions = { year: "numeric", day: "numeric", month: "long" };
      const d = new Date();
      const strDate = d.toLocaleDateString('fa-IR', options);
      const strTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      if (!lastVisitValue) {
        (neverVisited as HTMLElement).style.display = "block";
        (beforeVisited as HTMLElement).style.display = "none";
        localStorage.setItem(pwaName + '-Last-Visited', 'آخرین بازدید شما ' + strDate + ' در ' + strTime)
      } else {
        (neverVisited as HTMLElement).style.display = "none";
        (beforeVisited as HTMLElement).style.display = "block";
        (visitBeforeTime as HTMLElement).textContent = lastVisitValue;
        localStorage.setItem(pwaName + '-Last-Visited', 'آخرین بازدید شما ' + strDate + ' در ' + strTime)
      }
    }


    //Reading Time
    var readingTextDiv = document.querySelectorAll('.reading-progress-text');
    if (readingTextDiv.length) {
      var readingWords = readingTextDiv[0].innerHTML.split(' ').length;
      var readingMinutes = Math.floor(readingWords / 250);
      var readingSeconds = readingWords % 60
      document.getElementsByClassName('reading-progress-words')[0].innerHTML = readingWords.toString();
      document.getElementsByClassName('reading-progress-time')[0].innerHTML = readingMinutes + ':' + readingSeconds
    }

    //Text Resizer
    var textSizeChanger = document.querySelectorAll('.text-size-changer');
    if (textSizeChanger.length) {
      var textSizeIncrease = document.querySelectorAll('.text-size-increase');
      var textSizeDecrease = document.querySelectorAll('.text-size-decrease');
      var textSizeDefault = document.querySelectorAll('.text-size-default');
      textSizeIncrease[0].addEventListener('click', function () {
        textSizeChanger[0].querySelectorAll('*').forEach(function (element: Element) {
          const fontSize = window.getComputedStyle(element).fontSize;
          const fontSizeValue = fontSize.split("px")[0];
          (element as HTMLElement).style.fontSize = (+fontSizeValue + 1) + 'px';
        });
      })
      textSizeDecrease[0].addEventListener('click', function () {
        textSizeChanger[0].querySelectorAll('*').forEach(function (element: Element) {
          const fontSize = window.getComputedStyle(element).fontSize;
          const fontSizeValue = fontSize.split("px")[0];
          (element as HTMLElement).style.fontSize = (+fontSizeValue - 1) + 'px';
        });
      })
      textSizeDefault[0].addEventListener('click', function () {
        textSizeChanger[0].querySelectorAll('*').forEach(function (element: Element) {
          (element as HTMLElement).style.fontSize = "";
        });
      })
    }

    //QR Generator
    var qr_image = document.querySelectorAll('.qr-image');
    if (qr_image.length) {
      var qr_this = window.location.href;
      var qr_auto = document.getElementsByClassName('generate-qr-auto')[0];
      var qr_api_address = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=';
      if (qr_auto) { qr_auto.setAttribute('src', qr_api_address + qr_this) }
      var qr_btn = document.getElementsByClassName('generate-qr-button')[0];
      if (qr_btn) {
        qr_btn.addEventListener('click', function () {
          var get_qr_url = (document.getElementsByClassName('qr-url')[0] as HTMLInputElement).value;
          var qr_api_address = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=';
          var qr_img = '<img class="mx-auto polaroid-effect shadow-l mt-4 delete-qr" width="200" src="' + qr_api_address + get_qr_url + '" alt="img"><p class="font-11 text-center mb-0">' + get_qr_url + '</p>'
          document.getElementsByClassName('generate-qr-result')[0].innerHTML = qr_img
          qr_btn.innerHTML = "Generate New Button"
        })
      }
    }

    if (window.location.protocol === "file:") {
      var linksLocal = document.querySelectorAll('a');
      linksLocal.forEach(el => el.addEventListener('mouseover', event => {
        // console.log("You are seeing these errors because your file is on your local computer. For real life simulations please use a Live Server or a Local Server such as AMPPS or WAMPP or simulate a  Live Preview using a Code Editor like http://brackets.io (it's 100% free) - PWA functions and AJAX Page Transitions will only work in these scenarios.");
      }));
    }

    //Search Page
    var searchField = document.querySelectorAll('[data-search]');
    if (searchField.length) {
      var searchResults = document.querySelectorAll('.search-results')
      var searchNoResults = document.querySelectorAll('.search-no-results');
      var searchTotal = document.querySelectorAll(".search-results div")[0].childElementCount;
      var searchTrending = document.querySelectorAll('.search-trending');
      function searchFunction() {
        var searchStr = (searchField[0] as HTMLInputElement).value;
        var searchVal = searchStr;
        if (searchVal != '') {
          searchResults[0].classList.remove('disabled-search-list');
          var searchFilterItem = document.querySelectorAll('[data-filter-item]');
          for (let i = 0; i < searchFilterItem.length; i++) {
            var searchData = searchFilterItem[i].getAttribute('data-filter-name');
            if (searchData.includes(searchVal)) {
              searchFilterItem[i].classList.remove('disabled');
              if (searchTrending.length) { searchTrending[0].classList.add('disabled'); }
            } else {
              searchFilterItem[i].classList.add('disabled');
              if (searchTrending.length) { searchTrending[0].classList.remove('disabled'); }
            }
            var disabledResults = document.querySelectorAll(".search-results div")[0].getElementsByClassName("disabled").length;
            if (disabledResults === searchTotal) {
              searchNoResults[0].classList.remove('disabled');
              if (searchTrending.length) { searchTrending[0].classList.add('disabled'); }
            } else {
              searchNoResults[0].classList.add('disabled');
              if (searchTrending.length) { searchTrending[0].classList.add('disabled'); }
            }
          }
        }
        if (searchVal === '') {
          searchResults[0].classList.add('disabled-search-list');
          searchNoResults[0].classList.add('disabled');
          if (searchTrending.length) { searchTrending[0].classList.remove('disabled'); }
        }
      };

      searchField[0].addEventListener('keyup', function () { searchFunction(); })
      searchField[0].addEventListener('click', function () { searchFunction(); })

      var searchClick = document.querySelectorAll('.search-trending a');
      searchClick.forEach(el => el.addEventListener('click', event => {
        var trendingResultSpan = el.querySelectorAll('span')[0];
        var trendingResult = trendingResultSpan && trendingResultSpan.textContent ? trendingResultSpan.textContent.toLowerCase() : '';
        (searchField[0] as HTMLInputElement).value = trendingResult;
        (searchField[0] as HTMLElement).click();
      }));

    }

    //Sharing
    function shareLinks() {
      var shareTitle = document.title;
      var shareText = document.title;
      var shareLink = window.location.href;
      if (document.querySelectorAll('.shareToFacebook, .shareToTwitter, .shareToLinkedIn')[0]) {
        document.querySelectorAll('.shareToFacebook, .shareToTwitter, .shareToLinkedIn, .shareToWhatsApp, .shareToMail').forEach(x => { x.setAttribute('target', '_blank'); });
        document.querySelectorAll('.shareToFacebook').forEach(x => x.setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u=" + shareLink));
        document.querySelectorAll('.shareToTwitter').forEach(x => x.setAttribute("href", "http://twitter.com/share?text=" + shareTitle + "%20" + shareLink));
        document.querySelectorAll('.shareToPinterest').forEach(x => x.setAttribute("href", "https://pinterest.com/pin/create/button/?url=" + shareLink));
        document.querySelectorAll('.shareToWhatsApp').forEach(x => x.setAttribute("href", "whatsapp://send?text=" + shareLink));
        document.querySelectorAll('.shareToMail').forEach(x => x.setAttribute("href", "mailto:?body=" + shareLink));
        document.querySelectorAll('.shareToLinkedIn').forEach(x => x.setAttribute("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + shareLink + "&title=" + shareTitle + "&summary=&source="));
      }
      //Menu Share Web API
      if (navigator.canShare) {
        const shareData = { title: shareTitle, text: shareText, url: shareLink }
        var shareMenu = document.querySelectorAll('[data-menu="menu-share"], [data-show-share]');
        if (shareMenu) { shareMenu.forEach(el => { el.addEventListener('click', async () => { menu('menu-share', 'hide', 0); try { await navigator.share(shareData) } catch (err) { } }); }); }
      }
    }

    //Contact Form
    var contactForm = document.querySelectorAll('.contact-form');
    if (contactForm.length) {
              var form = document.getElementById('contactForm') as HTMLFormElement;
      form.onsubmit = function (e) {
        // Stop the regular form submission
        e.preventDefault();

        //Validate Fields
        var nameField = document.getElementById('contactNameField') as HTMLInputElement;
        var mailField = document.getElementById('contactEmailField') as HTMLInputElement;
        var textField = document.getElementById('contactMessageTextarea') as HTMLTextAreaElement;
        var validateMail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (nameField.value === '') {
          form.setAttribute('data-form', 'invalid');
          nameField.classList.add('border-red-dark');
          document.getElementById('validator-name').classList.remove('disabled');
        } else {
          form.setAttribute('data-form', 'valid');
          document.getElementById('validator-name').classList.add('disabled');
          nameField.classList.remove('border-red-dark');
        }
        if (mailField.value === '') {
          form.setAttribute('data-form', 'invalid');
          mailField.classList.add('border-red-dark');
          document.getElementById('validator-mail1').classList.remove('disabled');
        } else {
          document.getElementById('validator-mail1').classList.add('disabled');
          if (!validateMail.test(mailField.value)) {
            form.setAttribute('data-form', 'invalid');
            mailField.classList.add('border-red-dark');
            document.getElementById('validator-mail2').classList.remove('disabled');
          } else {
            form.setAttribute('data-form', 'valid');
            document.getElementById('validator-mail2').classList.add('disabled');
            mailField.classList.remove('border-red-dark');
          }
        }
        if (textField.value === '') {
          form.setAttribute('data-form', 'invalid');
          textField.classList.add('border-red-dark');
          document.getElementById('validator-text').classList.remove('disabled');
        } else {
          form.setAttribute('data-form', 'valid');
          document.getElementById('validator-text').classList.add('disabled');
          textField.classList.remove('border-red-dark')
        }

        if (form.getAttribute('data-form') === 'valid') {
          document.querySelectorAll('.form-sent')[0].classList.remove('disabled');
          document.querySelectorAll('.contact-form')[0].classList.add('disabled');
          // Collect the form data while iterating over the inputs
          var data: { [key: string]: string } = {};
          for (let i = 0, ii = form.length; i < ii; ++i) {
            let input = form[i] as HTMLInputElement | HTMLTextAreaElement;
            if (input.name) {
              data[input.name] = input.value;
            }
          }
          // Construct an HTTP request
          var xhr = new XMLHttpRequest();
          xhr.open(form.method, form.action, true);
          xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
          xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
          // Send the collected data as JSON
          xhr.send(JSON.stringify(data));
          // Callback function
          xhr.onloadend = function (response) {
            const target = response.target as XMLHttpRequest;
            if (target.status === 200) { console.log('Form Submitted') }
          };
        }
      };
    }

    //Collapse Flip Icon
    var collapseBtn = document.querySelectorAll('[data-bs-toggle="collapse"]:not(.no-effect)');
    if (collapseBtn.length) {
      collapseBtn.forEach(el => el.addEventListener('click', e => {
        if (el.querySelectorAll('i').length) {
          el.querySelector('i').classList.toggle('fa-rotate-180')
        };
      }));
    }

    //Tabs
    var tabTrigger = document.querySelectorAll('.tab-controls a');
    if (tabTrigger.length) {
      tabTrigger.forEach(function (e) {
        if (e.hasAttribute('data-active')) {
          var highlightColor = (e.parentNode as Element).getAttribute('data-highlight');
          e.classList.add(highlightColor);
          e.classList.add('no-click');
        }
      });
      tabTrigger.forEach(el => el.addEventListener('click', e => {
        var highlightColor = (el.parentNode as Element).getAttribute('data-highlight');
        var tabParentGroup = (el.parentNode as Element).querySelectorAll('a');
        tabParentGroup.forEach(function (e) {
          e.classList.remove(highlightColor);
          e.classList.remove('no-click');
        });
        el.classList.add(highlightColor);
        el.classList.add('no-click');
      }));
    }


    //Extending Menu Functions
    function menu(menuName, menuFunction, menuTimeout) {
      setTimeout(function () {
        if (menuFunction === "show") {
          return document.getElementById(menuName).classList.add('menu-active'),
            document.querySelectorAll('.menu-hider')[0].classList.add('menu-active')
        } else {
          return document.getElementById(menuName).classList.remove('menu-active'),
            document.querySelectorAll('.menu-hider')[0].classList.remove('menu-active')
        }
      }, menuTimeout)
    }

    var autoActivate = document.querySelectorAll('[data-auto-activate]');
    if (autoActivate.length) {
      var autoActivateData = autoActivate[0].getAttribute('data-auto-activate');
      var autoActivateTime = Number(autoActivateData) * 1000;
      setTimeout(function () {
        autoActivate[0].classList.add('menu-active');
        menuHider[0].classList.add('menu-active');
      }, autoActivateTime);
    }

    //Copyright Year & Month
    var copyrightYear = document.getElementById('copyright-year');
    var copyrightMonth = document.getElementById('copyright-month');
    if (copyrightYear || copyrightMonth) {
      const yroptions: DateTimeFormatOptions = { year: "numeric" };
      const mntoptions: DateTimeFormatOptions = { month: "long" };
      const yrNow = new Date().toLocaleString("fa-IR", yroptions);
      const mntNow = new Date().toLocaleString("fa-IR", mntoptions);
      copyrightYear.textContent = yrNow;
      copyrightMonth.textContent = mntNow;
    }

    //Check Age
    var checkAge = document.querySelectorAll('.check-age');
    if (checkAge.length) {
      checkAge[0].addEventListener('click', function () {
        var dateBirthday = (document.querySelectorAll("#date-birth-day")[0] as HTMLInputElement).value;
        var dateBirthMonth = (document.querySelectorAll("#date-birth-month")[0] as HTMLInputElement).value;
        var dateBirthYear = (document.querySelectorAll("#date-birth-year")[0] as HTMLInputElement).value;
        var age = 18;
        var mydate = new Date();
        mydate.setFullYear(Number(dateBirthYear), Number(dateBirthMonth) - 1, Number(dateBirthday));

        var currdate = new Date();
        var setDate = new Date();
        setDate.setFullYear(mydate.getFullYear() + age, Number(dateBirthMonth) - 1, Number(dateBirthday));

        var menuAge = document.querySelectorAll('#menu-age');
        var menuAgeFail = document.querySelectorAll('#menu-age-fail');
        var menuAgeOkay = document.querySelectorAll('#menu-age-okay');

        console.log(currdate);
        console.log(setDate);
        console.log(dateBirthMonth);
        if ((currdate.getTime() - setDate.getTime()) > 0) {
          console.log("بالای 18");
          menuAge[0].classList.remove('menu-active')
          menuAgeOkay[0].classList.add('menu-active');
        } else {
          menuAge[0].classList.remove('menu-active')
          menuAgeFail[0].classList.add('menu-active');
        }
        return true;
      });
    }

    //Calling Functions Required After External Menus are Loaded
    var dataMenuLoad = document.querySelectorAll('[data-menu-load]')
    dataMenuLoad.forEach(function (e) {
      var menuLoad = e.getAttribute('data-menu-load')
      fetch(menuLoad)
        .then(data => data.text())
        .then(html => e.innerHTML = html)
        .then(data => {
          // setTimeout(function () {
          //   if (dataMenuLoad[dataMenuLoad.length - 1] === e) {
          //     menuFunction();
          //     //checkDarkMode();
          //     // activateMenus();
          //     // shareLinks();
          //     highlightColors();
          //     selectHighlight();
          //     card_extender();
          //     backUp();
          //   }
          // }, 500);
        })
    })

    //Detecting Mobile OS
    let isMobile = {
      Android: function () { return navigator.userAgent.match(/Android/i); },
      iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
      any: function () { return (isMobile.Android() || isMobile.iOS()); }
    };

    const androidDev = document.getElementsByClassName('show-android');
    const iOSDev = document.getElementsByClassName('show-ios');
    const noDev = document.getElementsByClassName('show-no-device');
    if (!isMobile.any()) { for (let i = 0; i < iOSDev.length; i++) { iOSDev[i].classList.add('disabled'); } for (let i = 0; i < androidDev.length; i++) { androidDev[i].classList.add('disabled'); } }
    if (isMobile.iOS()) { document.querySelectorAll('#page')[0].classList.add('device-is-ios'); for (let i = 0; i < noDev.length; i++) { noDev[i].classList.add('disabled'); } for (let i = 0; i < androidDev.length; i++) { androidDev[i].classList.add('disabled'); } }
    if (isMobile.Android()) { document.querySelectorAll('#page')[0].classList.add('device-is-android'); for (let i = 0; i < iOSDev.length; i++) { iOSDev[i].classList.add('disabled'); } for (let i = 0; i < noDev.length; i++) { noDev[i].classList.add('disabled'); } }

    //Creating Offline Alert Messages
    var addOfflineClasses = document.querySelectorAll('.offline-message');
    if (!addOfflineClasses.length) {
      const offlineAlert = document.createElement('p');
      const onlineAlert = document.createElement('p');
      offlineAlert.className = 'offline-message bg-red-dark color-white';
      offlineAlert.textContent = 'شما به اینترنت متصل نیستید';
      onlineAlert.className = 'online-message bg-green-dark color-white';
      onlineAlert.textContent = 'اتصال به اینترنت برقرار شد';
      document.getElementsByTagName('body')[0].appendChild(offlineAlert);
      document.getElementsByTagName('body')[0].appendChild(onlineAlert);
    }

    //Online / Offline Settings
    //Activating and Deactivating Links Based on Online / Offline State
    function offlinePage() {
      //Enable the code below to disable offline mode.
      //var anchorsDisabled = document.querySelectorAll('a');
      //anchorsDisabled.forEach(function(e){
      //    var hrefs = e.getAttribute('href');
      //    if(hrefs.match(/.html/)){e.classList.add('show-offline'); e.setAttribute('data-link',hrefs); e.setAttribute('href','#');}
      //});
      var showOffline = document.querySelectorAll('.show-offline');
      showOffline.forEach(el => el.addEventListener('click', event => {
        document.getElementsByClassName('offline-message')[0].classList.add('offline-message-active');
        setTimeout(function () { document.getElementsByClassName('offline-message')[0].classList.remove('offline-message-active'); }, 1500)
      }));
    }
    function onlinePage() {
      var anchorsEnabled = document.querySelectorAll('[data-link]');
      anchorsEnabled.forEach(function (e) {
        var hrefs = e.getAttribute('data-link');
        if (hrefs.match(/.html/)) { e.setAttribute('href', hrefs); e.removeAttribute('data-link'); }
      });
    }

    //Defining Offline/Online Variables
    var offlineMessage = document.getElementsByClassName('offline-message')[0];
    var onlineMessage = document.getElementsByClassName('online-message')[0];


    //Online / Offine Status
    function isOnline() {
      onlinePage(); onlineMessage.classList.add('online-message-active');
      setTimeout(function () { onlineMessage.classList.remove('online-message-active'); }, 2000)
      console.info('Connection: Online');
    }

    function isOffline() {
      offlinePage(); offlineMessage.classList.add('offline-message-active');
      setTimeout(function () { offlineMessage.classList.remove('offline-message-active'); }, 2000)
      console.info('Connection: Offline');
    }

    var simulateOffline = document.querySelectorAll('.simulate-offline');
    var simulateOnline = document.querySelectorAll('.simulate-online');
    if (simulateOffline.length) {
      simulateOffline[0].addEventListener('click', function () { isOffline() });
      simulateOnline[0].addEventListener('click', function () { isOnline() });
    }

    //Check if Online / Offline
    function updateOnlineStatus(event) { var condition = navigator.onLine ? "online" : "offline"; isOnline(); }
    function updateOfflineStatus(event) { isOffline(); }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOfflineStatus);

    //iOS Badge
    const iOSBadge = document.querySelectorAll('.simulate-iphone-badge');
    iOSBadge.forEach(el => el.addEventListener('click', e => {
      document.getElementsByClassName('add-to-home')[0].classList.add('add-to-home-visible', 'add-to-home-ios');
      document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-android');
    }));

    //Android Badge
    const AndroidBadge = document.querySelectorAll('.simulate-android-badge');
    AndroidBadge.forEach(el => el.addEventListener('click', e => {
      document.getElementsByClassName('add-to-home')[0].classList.add('add-to-home-visible', 'add-to-home-android');
      document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-ios');
    }));

    //Remove Add to Home Badge
    const addToHomeBadgeClose = document.querySelectorAll('.add-to-home');
    addToHomeBadgeClose.forEach(el => el.addEventListener('click', e => {
      document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-visible');
    }));





    //Lazy Loading
    // var lazyLoad = new LazyLoad();

    // Check راهنما folder for detailed explanations on
    // Externally loading Javascript files for better performance.

    // var plugIdent, plugClass, plugMain, plugCall;
    var plugLoc = "plugins/"

    let plugins = [
      {
        id: 'uniqueID', // to detect if loaded and unload if needed
        plug: 'pluginName/plugin.js', // the main plugin javascript file
        call: 'pluginName/pluginName-call.js', // the plugin call functions
        style: 'pluginName/pluginName-style.css', // the plugin stylesheet
        trigger: '.pluginTriggerClass' // the trigger that will activate the loading and initializing of the plugin
      },
      {
        id: 'pdatepicker',
        plug: 'persiandatepicker/persian-datepicker.js',
        style: 'persiandatepicker/persian-datepicker.css',
        call: 'persiandatepicker/persian-datepicker-call.js',
        trigger: '.p-date'
      },
      {
        id: 'chart',
        plug: 'charts/charts.js',
        call: 'charts/charts-call-charts.js',
        trigger: '.chart'
      },
      {
        id: 'chart',
        plug: 'charts/charts.js',
        call: 'charts/charts-call-wallet.js',
        trigger: '.wallet-chart'
      },
      {
        id: 'chart',
        plug: 'charts/charts.js',
        call: 'charts/charts-call-dashboard.js',
        trigger: '.dashboard-chart'
      },
      {
        id: 'graph',
        plug: 'charts/charts.js',
        call: 'charts/charts-call-graphs.js',
        trigger: '.graph'
      },
      {
        id: 'count',
        plug: 'countdown/countdown.js',
        trigger: '.countdown'
      },
      {
        id: 'gallery',
        plug: 'glightbox/glightbox.js',
        call: 'glightbox/glightbox-call.js',
        style: 'glightbox/glightbox.css',
        trigger: '[data-gallery]'
      },
      {
        id: 'gallery-views',
        plug: 'galleryViews/gallery-views.js',
        trigger: '.gallery-view-controls'
      },
      {
        id: 'filter',
        plug: 'filterizr/filterizr.js',
        call: 'filterizr/filterizr-call.js',
        style: 'filterizr/filterizr.css',
        trigger: '.gallery-filter'
      },
      {
        id: 'embedly',
        plug: 'embedly/embedly.js',
        trigger: '.embedly-card'
      }
    ];


    for (let i = 0; i < plugins.length; i++) {
      //Remove Previous Calls
      if (document.querySelectorAll('.' + plugins[i].id + '-c').length) { document.querySelectorAll('.' + plugins[i].id + '-c')[0].remove(); }

      //Load Plugins
      var plugTrigger = document.querySelectorAll(plugins[i].trigger)
      if (plugTrigger.length) {
        var loadScript = document.getElementsByTagName('script')[1],
          loadScriptJS = document.createElement('script');
        loadScriptJS.type = 'text/javascript'
        loadScriptJS.className = plugins[i].id + '-p'
        loadScriptJS.src = plugLoc + plugins[i].plug
        loadScriptJS.addEventListener('load', function () {
          //Once plugin is loaded, load the call.
          if (plugins[i].call !== undefined) {
            var callFn = document.getElementsByTagName('script')[2],
              callJS = document.createElement('script');
            callJS.type = 'text/javascript'
            callJS.className = plugins[i].id + '-c'
            callJS.src = plugLoc + plugins[i].call
            callFn.parentNode.insertBefore(callJS, callFn);
          }
        });
        //If plugin doesn't exist, load it
        if (!document.querySelectorAll('.' + plugins[i].id + '-p').length) {
          loadScript.parentNode.insertBefore(loadScriptJS, loadScript);
        } else {
          //If plugin doesn't exist, only load the call function
          setTimeout(function () {
            var loadScript = document.getElementsByTagName('script')[1],
              loadScriptJS = document.createElement('script');
            loadScriptJS.type = 'text/javascript'
            loadScriptJS.className = plugins[i].id + '-c'
            loadScriptJS.src = plugLoc + plugins[i].call;
            loadScript.parentNode.insertBefore(loadScriptJS, loadScript);
          }, 50);
        }
        //If Style doesn't exist in array, don't do anything
        if (plugins[i].style !== undefined) {
          //if style already exists, don't re-add to page.
          if (!document.querySelectorAll('.' + plugins[i].id + '-s').length) {
            var loadCSS = document.createElement("link");
            loadCSS.className = plugins[i].id + '-s';
            loadCSS.rel = "stylesheet";
            loadCSS.type = "text/css";
            loadCSS.href = plugLoc + plugins[i].style;
            document.getElementsByTagName("head")[0].appendChild(loadCSS);
          }
        }
      }
    }
  }


  //Fix Scroll for AJAX pages.
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

  init_template();
});
