import { Directive, ElementRef, OnDestroy } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

@Directive({
  selector: "app-panel",
})
export class ActiveItemDirective implements OnDestroy {
  defaultColor: string;
  mouseenter: Subscription;
  mouseleave: Subscription;

  constructor(private el: ElementRef) {
    this.defaultColor = this.el.nativeElement.style.backgroundColor;
    this.mouseenter = fromEvent<MouseEvent>(
      this.el.nativeElement,
      "mouseenter"
        ).subscribe(_=> this.el.nativeElement.style.backgroundColor = "yellow");
    this.mouseleave = fromEvent<MouseEvent>(
      this.el.nativeElement,
      "mouseleave"
    ).subscribe(_=> this.el.nativeElement.style.backgroundColor = this.defaultColor);
   
  }
  ngOnDestroy(): void {
    this.mouseleave.unsubscribe(); 
    this.mouseenter.unsubscribe(); 
  }
}
