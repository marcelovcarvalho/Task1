import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { IConfig } from './IConfig';
import { Config } from './config';

@Directive({
  selector: '[onlyForScreen]',
  providers: [{ provide: 'IConfig', useClass: Config }]
})
export class OnlyForScreentDirective {
  @Input() onlyForScreen: string;

  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;

  constructor(el: ElementRef, private config: Config, private renderer: Renderer2) {
    
      this.resizeObservable$ = fromEvent(window, 'resize');

    this.resizeSubscription$ = this.resizeObservable$.subscribe(event => {
      this.resizeCallback(el.nativeElement);
    });
    this.resizeCallback(el.nativeElement);

    
  }

  private resizeCallback = element => {
    let viewportWidth: number = window.innerWidth;
    

    if (this.onlyForScreen == "mobile" && viewportWidth < this.config.mobile) {
      this.renderer.removeClass(element, 'hide');
    } else if (this.onlyForScreen == "tablet" && this.config.mobile <= viewportWidth && viewportWidth < this.config.tablet) {
      this.renderer.removeClass(element, 'hide');
    } else if (this.onlyForScreen == "desktop" && this.config.tablet <= viewportWidth) {
      this.renderer.removeClass(element, 'hide');
    } else {
      //this.renderer.addClass(element, 'ng-hide');
    };
  }
}