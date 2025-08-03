import { AfterContentInit, Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '.card', // Targets elements with the class 'my-class-directive'
  standalone: false

})

export class DomClassCardDirective  implements AfterContentInit, OnDestroy {
  private mutationObserver: MutationObserver;

  constructor(private el: ElementRef) {}



  // @HostListener('click')
  // onClick() {
  //   console.log('Element with .my-class-directive was clicked!');
  // }

  @HostListener('window:resize', [])
  onResize() {
    this.actionRun();
  }

  ngAfterContentInit(): void {
    //console.log('Class attribute changed:', this.el.nativeElement.classList);
    this.actionRun();
    this.mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => {
        if (mutation.attributeName === 'class') {
          // Handle the class change here
          this.actionRun();
          console.log('Class attribute changed:', this.el.nativeElement.classList);
          // You can add your custom logic based on the new class list
        }
      });
    });

    this.mutationObserver.observe(this.el.nativeElement, {
      attributeFilter: ['class'] // Only observe changes to the 'class' attribute
    });
  }

  ngOnDestroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect(); // Disconnect the observer to prevent memory leaks
    }
  }

  actionRun(): void {
    var card=this.el.nativeElement as HTMLElement;
    let headerHeight: number, footerHeight: number;
    const headerOnPage: Element | undefined = document.querySelectorAll('.header:not(.header-transparent)')[0];
    const footerOnPage: Element | undefined = document.querySelectorAll('#footer-bar')[0];

    headerOnPage ? headerHeight = (document.querySelectorAll('.header')[0] as HTMLElement).offsetHeight : headerHeight = 0;
    footerOnPage ? footerHeight = (document.querySelectorAll('#footer-bar')[0] as HTMLElement).offsetHeight : footerHeight = 0;



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
          card.style.height = getHeight + 'px;';
          if (getHeight === "cover") {
            const totalHeight: string = getHeight;
            card.style.height = coverHeight;
          }
        }

    }
  }
}
