import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs/operators";
import { BoardDataService } from "../board-data.service";

@Component({
  selector: "app-board",
  template: `<app-board-col
      *ngFor="let item of (board$ | async)"
      [itemId]="item.id"
    ></app-board-col>
  `,
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {
  board$ = this.data.board$
  constructor(private data: BoardDataService) {}

  ngOnInit() {}
}
