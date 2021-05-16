import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { fromEvent } from "rxjs";
import {  tap } from "rxjs/operators";

@Directive({
  selector: "app-panel[collapsed]",
})
export class ToggleCollapseDirective {
  target: HTMLElement;
  clickSub: any;
  elm = this.elmRef.nativeElement as HTMLElement;
  #collapsed: boolean;
  
  @Input("collapsed") set setCollapsable(x) {
    this.#collapsed = x;
    this.handleCollapsed();
  }
  @Input("collapseTarget") set targetElement(clicker) {
    if(!clicker) return;
    this.target = clicker;
    this.clickSub = fromEvent<MouseEvent>(this.target, "click")
      .pipe(
        /** trigger the side-effect */
        tap((e) => {
          this.handleCollapsed(); 
        })
      )
      .subscribe();
  } 

  private handleCollapsed() {
    if (this.#collapsed) {
      this.elm.classList.remove("collapsed");
    } else {
      this.elm.classList.add("collapsed");
    }
    this.#collapsed = !this.#collapsed;
  }

  constructor(private elmRef: ElementRef) {}

}
