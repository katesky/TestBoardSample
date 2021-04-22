import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { pluck, switchMap } from "rxjs/operators";
import { BoardDataService } from "../board-data.service";

@Component({
  selector: "app-board-col",
  template: `
    <ng-container *ngIf="(item$ | async) as item">
      <h2>{{ item.name }}</h2>
      <app-board-item
        *ngFor="let bi of item.children"
        [itemId]="bi.id"
      ></app-board-item>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        max-height: 97vh;
        overflow-x: auto;
      }

      h2 {
        align-self: center;
        text-align: center;
        width: 96%;
        border-bottom: 2px solid rgb(71, 77, 95);
        padding-bottom: 2px;
        margin-bottom: 6px;
      }
    `
  ]
})
export class BoardColComponent implements OnInit {
  localState = new BehaviorSubject({
    id: ""
  });
  @Input() set itemId(id: string) {
    if (id) {
      this.localState.next({ ...this.localState.value, id });
    }
  }
  item$ = this.localState.pipe(
    pluck("id"),
    switchMap(id => this.data.getItemById(id))
  );

  constructor(private data: BoardDataService) {}

  ngOnInit() {}
}
