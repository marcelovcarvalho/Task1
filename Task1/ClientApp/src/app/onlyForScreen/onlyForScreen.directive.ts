import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";

@Directive({
  selector: '[onlyForScreen]'
})
export class OnlyForScreentDirective {
  @Input() onlyForScreen: string;

  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;

  constructor(el: ElementRef, private renderer: Renderer2) {
    let config: IConfig;
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(event => {
      let viewportWidth: number = window.innerWidth;

      if (this.onlyForScreen == "mobile" && viewportWidth < this.config.mobile) {
        renderer.removeClass(el.nativeElement, 'ng-hide');
      } else if (this.onlyForScreen == "tablet" && config.mobile <= viewportWidth && viewportWidth < config.tablet) {
        renderer.removeClass(el.nativeElement, 'ng-hide');
      } else if (this.onlyForScreen == "desktop" && config.tablet <= viewportWidth) {
        renderer.removeClass(el.nativeElement, 'ng-hide');
      } else {
        renderer.addClass(el.nativeElement, 'ng-hide');
      }
    });

    
  }
}

interface IConfig {
  mobile: number;
  tablet: number;
}

export class Config implements IConfig {
  mobile: number = 768;
  tablet: number = 992;

}