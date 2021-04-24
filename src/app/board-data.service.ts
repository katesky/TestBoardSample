import {assertNotNull} from '@angular/compiler/src/output/output_ast';
import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay} from 'rxjs/operators';

const lower = 'abcdefghijklmnopqrstuvwxyz';
const tokens = lower + lower.toUpperCase() + '0123456789';
const tokenLen = tokens.length;
const rand = (ammount = 20, min = 0) => Math.floor(Math.random() * ammount) + min;

const token = () => tokens[rand(tokenLen)];
const genId = () => Array.from({length: 8}, () => token()).join('');

const createItem = (o: string, parentId = 'root') =>
  ({
    id: genId(),
    parentId,
    collapsed: Math.random() < 0.5 ? false : true,
    name: o,
  } as Item);

export interface Item {
  id: string;
  parentId: string;
  collapsed: boolean;
  name: string;
  description?: string;
  children?: Item[];
}

const generateNewBoard = () =>
  Array.from({length: rand(6, 3)}, (_, o) => {
    const parent = createItem(`type ${o}`);
    return {
      ...parent,
      children: Array.from({length: rand(60, 15)}, (_, i) => createItem(`card ${i} of ${o}`, parent.id)),
    } as Item;
  });

@Injectable({providedIn: 'root'})
export class BoardDataService {
  #boardSub = new BehaviorSubject(this.read());
  board$ = this.#boardSub.asObservable();

  #list = this.#boardSub.pipe(
    map(data => data.reduce((l, item) => l.concat(item).concat(item.children), [] as Item[])),
    shareReplay({refCount: true, bufferSize: 1})
  );

  constructor() {}

  getItemById(id: string) {
    return this.#list.pipe(
      map(list => list.find(item => item.id === id)),
      distinctUntilChanged()
    );
  }

  private read() {
    console.log('read');
    try {
      const rawData = localStorage.getItem('sampleData');
      if (rawData) {
        return JSON.parse(rawData) as Item[];
      }
    } catch (e) {
      console.log(e);
    }
    const newBoard = generateNewBoard();
    localStorage.setItem('sampleData', JSON.stringify(newBoard));
    return newBoard;
  }

  addItem(parentId = 'root'): void {
    this.saveItem(createItem('new Item', parentId));
  }

  saveItem(item: Item): void {
    const board = this.#boardSub.value;
    if (item.parentId !== 'root') {
      const parent = board.find(col => col.id === item.parentId);
      if (!parent) {
        throw new Error('no support for deeply nested items yet');
      }
      const index = parent.children.findIndex(i => i.id === item.id);
      if (index < 0) {
        parent.children.unshift(item);
      } else {
        parent.children[index] = item;
      }
    } else {
      const index = board.findIndex(i => i.id === item.id);
      if (index < 0) {
        board.unshift(item);
      } else {
        board[index] = item;
      }
    }
    this.#boardSub.next(board);
    localStorage.setItem('sampleData', JSON.stringify(board));
    console.log('Saved', item);
  }
}
