//Removing Preloader
setTimeout(function () {
  var preloader = document.getElementById('preloader')
  if (preloader) { preloader.classList.add('preloader-hide'); }
}, 2000);

document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  //Global Variables

  var pwaName = "Appkit"; //Local Storage Names for PWA



  //Place all your custom Javascript functions and plugin calls below this line
  function init_template() {
    var i, e, el; //https://www.w3schools.com/js/js_performance.asp

    //Image Sliders
    var splide = document.getElementsByClassName('splide');
    if (splide.length) {
      var singleSlider = document.querySelectorAll('.single-slider');
      if (singleSlider.length) {
        singleSlider.forEach(function (e) {
          var single = new Splide('#' + e.id, {
            type: 'loop',
            autoplay: true,
            direction: 'rtl',
            interval: 4000,
            perPage: 1,
          }).mount();
          var sliderNext = document.querySelectorAll('.slider-next');
          var sliderPrev = document.querySelectorAll('.slider-prev');
          sliderNext.forEach(el => el.addEventListener('click', el => { single.go('>'); }));
          sliderPrev.forEach(el => el.addEventListener('click', el => { single.go('<'); }));
        });
      }

      var doubleSlider = document.querySelectorAll('.double-slider');
      if (doubleSlider.length) {
        doubleSlider.forEach(function (e) {
          var double = new Splide('#' + e.id, {
            type: 'loop',
            autoplay: true,
            direction: 'rtl',
            interval: 4000,
            arrows: false,
            perPage: 2,
          }).mount();
        });
      }

      var trippleSlider = document.querySelectorAll('.tripple-slider');
      if (trippleSlider.length) {
        trippleSlider.forEach(function (e) {
          var tripple = new Splide('#' + e.id, {
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

    var topicSlider = document.querySelectorAll('.topic-slider');
    if (topicSlider.length) {
      var topic = new Splide('.topic-slider', {
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
    var storySlider = document.querySelectorAll('.story-slider');
    if (storySlider.length) {
      var topic = new Splide('.story-slider', {
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

    //Map Page
    var fullMap = document.querySelectorAll('.hide-map');
    if (fullMap.length) {
      var mapActivator = document.querySelectorAll('.show-map');
      var mapDisabler = document.querySelectorAll('.hide-map');
      mapActivator[0].addEventListener('click', function (e) {
        document.getElementsByClassName('card-overlay')[0].classList.add('disabled');
        document.getElementsByClassName('card-center')[0].classList.add('disabled');
        document.getElementsByClassName('hide-map')[0].classList.remove('disabled');
      })
      mapDisabler[0].addEventListener('click', function (e) {
        document.getElementsByClassName('card-overlay')[0].classList.remove('disabled');
        document.getElementsByClassName('card-center')[0].classList.remove('disabled');
        document.getElementsByClassName('hide-map')[0].classList.add('disabled');
      })
    }



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


    //Card Extender
    const cards = document.getElementsByClassName('card');
    function card_extender() {
      var headerHeight, footerHeight, headerOnPage;
      var headerOnPage = document.querySelectorAll('.header:not(.header-transparent)')[0];
      var footerOnPage = document.querySelectorAll('#footer-bar')[0];

      headerOnPage ? headerHeight = document.querySelectorAll('.header')[0].offsetHeight : headerHeight = 0
      footerOnPage ? footerHeight = document.querySelectorAll('#footer-bar')[0].offsetHeight : footerHeight = 0

      for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute('data-card-height') === "cover") {
          if (window.matchMedia('(display-mode: fullscreen)').matches) { var windowHeight = window.outerHeight; }
          if (!window.matchMedia('(display-mode: fullscreen)').matches) { var windowHeight = window.innerHeight; }
          //Fix for iOS 15 pages with data-height="cover"
          var coverHeight = windowHeight + 'px';
          // - Remove this for iOS 14 issues - var coverHeight = windowHeight - headerHeight - footerHeight + 'px';
        }
        if (cards[i].getAttribute('data-card-height') === "cover-card") {
          var windowHeight = window.innerHeight;
          var coverHeight = windowHeight - 200 + 'px';
          cards[i].style.height = coverHeight
        }
        if (cards[i].getAttribute('data-card-height') === "cover-full") {
          if (window.matchMedia('(display-mode: fullscreen)').matches) { var windowHeight = window.outerHeight; }
          if (!window.matchMedia('(display-mode: fullscreen)').matches) { var windowHeight = window.innerHeight; }
          var coverHeight = windowHeight + 'px';
          cards[i].style.height = coverHeight
        }
        if (cards[i].hasAttribute('data-card-height')) {
          var getHeight = cards[i].getAttribute('data-card-height');
          cards[i].style.height = getHeight + 'px';
          if (getHeight === "cover") {
            var totalHeight = getHeight
            cards[i].style.height = coverHeight
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
          if (visited_links.indexOf(that.href) !== -1) {
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
          function hideTitle() { pageTitle[0].style.opacity = "0" }
          function showTitle() { pageTitle[0].style.opacity = "1" }
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
        var currentValue = el.parentElement.querySelector('input').value
        el.parentElement.querySelector('input').value = +currentValue + 1
      }))

      stepperSub.forEach(el => el.addEventListener('click', event => {
        var currentValue = el.parentElement.querySelector('input').value
        el.parentElement.querySelector('input').value = +currentValue - 1
      }))
    }

    //Link List Toggle
    var linkListToggle = document.querySelectorAll('[data-trigger-switch]:not([data-toggle-theme])');
    if (linkListToggle.length) {
      linkListToggle.forEach(el => el.addEventListener('click', event => {
        var switchData = el.getAttribute('data-trigger-switch');
        var getCheck = document.getElementById(switchData);
        getCheck.checked ? getCheck.checked = false : getCheck.checked = true;
      }))
    }

    //Classic Toggle
    var classicToggle = document.querySelectorAll('.classic-toggle');
    if (classicToggle.length) {
      classicToggle.forEach(el => el.addEventListener('click', event => {
        el.querySelector('i:last-child').classList.toggle('fa-rotate-180');
        el.querySelector('i:last-child').style.transition = "all 250ms ease"
      }))
    }

    //Toasts
    var toastTrigger = document.querySelectorAll('[data-toast]');
    if (toastTrigger.length) {
      toastTrigger.forEach(el => el.addEventListener('click', event => {
        var toastData = el.getAttribute('data-toast')
        var notificationToast = document.getElementById(toastData);
        var notificationToast = new bootstrap.Toast(notificationToast);
        notificationToast.show();
      }));
    }





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
        var vibrateTime = document.getElementsByClassName('vibrate-demo')[0].value;
        window.navigator.vibrate(vibrateTime);
      })
      stopVibrating.addEventListener('click', function () {
        window.navigator.vibrate(0);
      })
      vibrateButton.forEach(el => el.addEventListener('click', e => {
        var vibrateTime = el.getAttribute('data-vibrate');
        window.navigator.vibrate(vibrateTime);
      }));
    }

    //Time Ads
    var timedAd = document.querySelectorAll('[data-timed-ad]');
    if (timedAd.length) {
      timedAd.forEach(el => el.addEventListener('click', e => {
        var timedAdTime = el.getAttribute('data-timed-ad');
        var timedAdData = el.getAttribute('data-menu');
        var timedAdTimer = timedAdTime;
        var timerAdFunction = setInterval(function () {
          if (timedAdTimer <= 1) {
            clearInterval(timerAdFunction);
            document.getElementById(timedAdData).querySelectorAll('.fa-times')[0].classList.remove('disabled');
            document.getElementById(timedAdData).querySelectorAll('.close-menu')[0].classList.remove('no-click');
            document.getElementById(timedAdData).querySelectorAll('span')[0].style.display = "none";
          } else {
            //console.log(timedAdTimer);
          }
          document.getElementById(timedAdData).querySelectorAll('span')[0].innerHTML = timedAdTimer -= 1;
        }, 1000);
      }));
    }

    //Auto Show Ads
    var autoAd = document.querySelectorAll('[data-auto-show-ad]');
    if (autoAd.length) {
      var autoAdTime = autoAd[0].getAttribute('data-auto-show-ad');
      var timerAdFunction = setInterval(function () {
        if (autoAdTime <= 1) {
          clearInterval(timerAdFunction);
          var autoAdId = autoAd[0].getAttribute('data-menu');
          document.getElementById(autoAdId).classList.add('menu-active');
          var autoAdCloseTime = autoAd[0].getAttribute('data-timed-ad');
          var downloadTimer = setInterval(function () {
            if (autoAdCloseTime <= 0) {
              clearInterval(downloadTimer);
              document.getElementById(autoAdId).querySelectorAll('.fa-times')[0].classList.remove('disabled');
              document.getElementById(autoAdId).querySelectorAll('.close-menu')[0].classList.remove('no-click');
              document.getElementById(autoAdId).querySelectorAll('span')[0].style.display = "none";
            }
            document.getElementById(autoAdId).querySelectorAll('span')[0].innerHTML = autoAdCloseTime -= 1;
          }, 1000);
        }
        autoAdTime -= 1;
      }, 1000);
    }

    //Visit Detection
    const visitDetection = document.querySelectorAll('.visit-detection')[0];
    if (visitDetection) {
      const neverVisited = document.querySelectorAll('.never-visited')[0];
      const beforeVisited = document.querySelectorAll('.before-visited')[0];
      const visitBeforeTime = document.querySelectorAll('.visit-before-time')[0];
      const lastVisitValue = localStorage.getItem(pwaName + '-Last-Visited');
      const options = { year: "numeric", day: "numeric", month: "long", };
      const d = new Date();
      const strDate = d.toLocaleDateString('fa-IR', options);
      const strTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      if (!lastVisitValue) {
        neverVisited.style.display = "block";
        beforeVisited.style.display = "none";
        localStorage.setItem(pwaName + '-Last-Visited', 'آخرین بازدید شما ' + strDate + ' در ' + strTime)
      } else {
        neverVisited.style.display = "none"
        beforeVisited.style.display = "block"
        visitBeforeTime.append(lastVisitValue)
        localStorage.setItem(pwaName + '-Last-Visited', 'آخرین بازدید شما ' + strDate + ' در ' + strTime)
      }
    }


    //Reading Time
    var readingTextDiv = document.querySelectorAll('.reading-progress-text');
    if (readingTextDiv.length) {
      var readingWords = readingTextDiv[0].innerHTML.split(' ').length;
      var readingMinutes = Math.floor(readingWords / 250);
      var readingSeconds = readingWords % 60
      document.getElementsByClassName('reading-progress-words')[0].innerHTML = readingWords
      document.getElementsByClassName('reading-progress-time')[0].innerHTML = readingMinutes + ':' + readingSeconds
    }

    //Text Resizer
    var textSizeChanger = document.querySelectorAll('.text-size-changer');
    if (textSizeChanger.length) {
      var textSizeIncrease = document.querySelectorAll('.text-size-increase');
      var textSizeDecrease = document.querySelectorAll('.text-size-decrease');
      var textSizeDefault = document.querySelectorAll('.text-size-default');
      textSizeIncrease[0].addEventListener('click', function () {
        textSizeChanger[0].querySelectorAll('*').forEach(function (element) {
          const getFontSize = window.getComputedStyle(element).fontSize.split("px", 2)[0]
          element.style.fontSize = (+getFontSize + 1) + 'px';
        });
      })
      textSizeDecrease[0].addEventListener('click', function () {
        textSizeChanger[0].querySelectorAll('*').forEach(function (element) {
          const getFontSize = window.getComputedStyle(element).fontSize.split("px", 2)[0]
          element.style.fontSize = (+getFontSize - 1) + 'px';
        });
      })
      textSizeDefault[0].addEventListener('click', function () {
        textSizeChanger[0].querySelectorAll('*').forEach(function (element) {
          const getFontSize = window.getComputedStyle(element).fontSize.split("px", 2)[0]
          element.style.fontSize = "";
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
          var get_qr_url = document.getElementsByClassName('qr-url')[0].value;
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
        var searchStr = searchField[0].value;
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
        var trendingResult = el.querySelectorAll('span')[0].textContent.toLowerCase();
        searchField[0].value = trendingResult;
        searchField[0].click();
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
      var form = document.getElementById('contactForm');
      form.onsubmit = function (e) {
        // Stop the regular form submission
        e.preventDefault();

        //Validate Fields
        var nameField = document.getElementById('contactNameField');
        var mailField = document.getElementById('contactEmailField');
        var textField = document.getElementById('contactMessageTextarea');
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
          var data = {};
          for (let i = 0, ii = form.length; i < ii; ++i) {
            let input = form[i];
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
          xhr.onloadend = function (response) { if (response.target.status === 200) { console.log('Form Submitted') } };
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
          var highlightColor = e.parentNode.getAttribute('data-highlight');
          e.classList.add(highlightColor);
          e.classList.add('no-click');
        }
      });
      tabTrigger.forEach(el => el.addEventListener('click', e => {
        var highlightColor = el.parentNode.getAttribute('data-highlight');
        var tabParentGroup = el.parentNode.querySelectorAll('a');
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
      var autoActivateTime = autoActivateData * 1000
      setTimeout(function () {
        autoActivate[0].classList.add('menu-active');
        menuHider[0].classList.add('menu-active');
      }, autoActivateTime);
    }

    //Copyright Year & Month
    var copyrightYear = document.getElementById('copyright-year');
    var copyrightMonth = document.getElementById('copyright-month');
    if (copyrightYear || copyrightMonth) {
      const yroptions = { year: "numeric", };
      const mntoptions = { month: "long", };
      const yrNow = new Date().toLocaleString("fa-IR", yroptions);
      const mntNow = new Date().toLocaleString("fa-IR", mntoptions);
      copyrightYear.textContent = yrNow;
      copyrightMonth.textContent = mntNow;
    }

    //Check Age
    var checkAge = document.querySelectorAll('.check-age');
    if (checkAge.length) {
      checkAge[0].addEventListener('click', function () {
        var dateBirthday = document.querySelectorAll("#date-birth-day")[0].value;
        var dateBirthMonth = document.querySelectorAll("#date-birth-month")[0].value;
        var dateBirthYear = document.querySelectorAll("#date-birth-year")[0].value;
        var age = 18;
        var mydate = new Date();
        mydate.setFullYear(dateBirthYear, dateBirthMonth - 1, dateBirthday);

        var currdate = new Date();
        var setDate = new Date();
        setDate.setFullYear(mydate.getFullYear() + age, dateBirthMonth - 1, dateBirthday);

        var menuAge = document.querySelectorAll('#menu-age');
        var menuAgeFail = document.querySelectorAll('#menu-age-fail');
        var menuAgeOkay = document.querySelectorAll('#menu-age-okay');

        console.log(currdate);
        console.log(setDate);
        console.log(dateBirthMonth);
        if ((currdate - setDate) > 0) {
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
          setTimeout(function () {
            if (dataMenuLoad[dataMenuLoad.length - 1] === e) {
              menuFunction();
              //checkDarkMode();
              // activateMenus();
              // shareLinks();
              highlightColors();
              selectHighlight();
              card_extender();
              backUp();
            }
          }, 500);
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
        if (hrefs.match(/.html/)) { e.setAttribute('href', hrefs); e.removeAttribute('data-link', ''); }
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
