import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {pluck, switchMap} from 'rxjs/operators';
import {BoardDataService, Item} from '../board-data.service';

@Component({
  selector: 'app-board-col',
  template: `
    <ng-container *ngIf="item$ | async as item">
      <h2 (click)="action(item)">{{ item.name }}</h2>
      <app-board-item *ngFor="let bi of item.children" [itemId]="bi.id"></app-board-item>
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
        width: 97%;
        border-bottom: 2px solid rgb(71, 77, 95);
        box-shadow: 0 0 0 5px white;
        padding-bottom: 2px;
        margin-bottom: 6px;
        position: sticky;
        top: 0;
        background-color: white;
        z-index: +1;
      }
    `,
  ],
})
export class BoardColComponent implements OnInit {
  localState = new BehaviorSubject({
    id: '',
  });
  @Input() set itemId(id: string) {
    if (id) {
      this.localState.next({...this.localState.value, id});
    }
  }
  item$ = this.localState.pipe(
    pluck('id'),
    switchMap(id => this.data.getItemById(id))
  );

  constructor(private data: BoardDataService) {}

  action(item: Item) {
    // const curentState = typeof items['allClosed'] === 'boolean' ? items['allClosed'] : false;
    // items.children.forEach(i => (i.collapsed = !curentState));
    // items['allClosed'] = !curentState;
    this.data.addItem(item.id)
  }

  ngOnInit() {}
}
