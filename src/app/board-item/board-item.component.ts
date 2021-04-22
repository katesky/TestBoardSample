import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { pluck, switchMap } from "rxjs/operators";
import { BoardDataService } from "../board-data.service";

@Component({
  selector: "app-board-item",
  templateUrl: "./board-item.component.html",
})
export class BoardItemComponent implements OnInit {
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
