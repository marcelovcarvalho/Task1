import { Directive, EmbeddedViewRef, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { IConfig } from './IConfig';

@Directive({
  selector: '[onlyForScreen]'
})
export class OnlyForScreentDirective {

  private elementScreen: string;
  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;
  private embeded: EmbeddedViewRef<any>;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, @Inject("IConfig") private config: IConfig) {
    
    this.resizeObservable$ = fromEvent(window, 'resize');

    this.resizeSubscription$ = this.resizeObservable$.subscribe(event => {
      this.resizeCallback();
    });
    
    
  }

  @Input() set onlyForScreen(onlyForScreen: string) {
    this.elementScreen = onlyForScreen;
    this.resizeCallback();
  }

  private shouldHide = (onlyForScreen: string) => {
    let viewportWidth: number = window.innerWidth;

    if (onlyForScreen == "mobile" && viewportWidth < this.config.mobile) {
      return false;
    } else if (onlyForScreen == "tablet" && this.config.mobile <= viewportWidth && viewportWidth < this.config.tablet) {
      return false;
    } else if (onlyForScreen == "desktop" && this.config.tablet <= viewportWidth) {
      return false;
    }

    return true;
  };

  private resizeCallback = () => {
    if (this.embeded == null) {
      this.viewContainer.clear();
      this.embeded = this.viewContainer.createEmbeddedView(this.templateRef);
    }

    if (!this.shouldHide(this.elementScreen)) {
      this.embeded.rootNodes[0].classList.remove("hidden");
      return;
    }
    this.embeded.rootNodes[0].classList.add("hidden");
  }
}