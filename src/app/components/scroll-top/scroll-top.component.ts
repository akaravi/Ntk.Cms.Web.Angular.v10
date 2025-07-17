import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  standalone: false
})
export class ScrollTopComponent implements OnInit, OnDestroy {
  constructor(
    public publicHelper: PublicHelper,
    private cmsStoreService: CmsStoreService,
    public themeService: ThemeService
  ) {
    this.unsubscribe.push(this.cmsStoreService.getState((state) => state.themeStore).subscribe(async (value) => {
      if (value.actionScrollTopPage)
        this.onScroll(null);
    }));

  }
  viewScrollTop = false;
  verticalOffset = 0;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {

  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    // console.log('verticalOffset', this.verticalOffset, 'windows.innerHeight', window.innerHeight);
    if (this.verticalOffset > (window.innerHeight / 5))
      this.viewScrollTop = true;
    else
      this.viewScrollTop = false;

    this.themeService.onActionScrollTopPage(false);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: `smooth` });
  }
  ngOnDestroy() {
    if (this.unsubscribe)
      this.unsubscribe.forEach((sb) => sb.unsubscribe());

  }
}
