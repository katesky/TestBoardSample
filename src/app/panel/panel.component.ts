import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}