import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { pluck, switchMap } from "rxjs/operators";
import { BoardDataService } from "../board-data.service";

@Component({
  selector: "app-board-col",
  template: `
    <ng-container *ngIf="(item$ | async) as item">
      <h2>{{ item.name }}</h2>
      <app-board-item *ngFor="let bi of item.children" [itemId]="bi.id"></app-board-item>
    </ng-container>
  `,
  styleUrls: ["./board-col.component.css"]
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
