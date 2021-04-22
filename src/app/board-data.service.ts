import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const lower= 'abcdefghijklmnopqrstuvwxyz'
const tokens = lower+ lower.toUpperCase() + '0123456789'
const tokenLen = tokens.length
const rand = (ammount = 20, min = 0) =>
  Math.floor(Math.random() * ammount) + min;

const token = () => tokens[rand(tokenLen)]
const genId = () => Array.from({length:8},() => token()).join('')

const createItem = (o:string) => ({
      id: genId(),
      collapsed: Math.random()<.5 ? false : true,
      name: o,
} as Item)

export interface Item {
    id: string;
    collapsed: boolean;
    name: string;
    description?: string;
    children?: Item[]
}

@Injectable()
export class BoardDataService {
  #board = Array.from({ length: rand(5, 3) }, (_, o) => {
    return {  
      ...createItem(`type ${o}`),
      children: Array.from({ length: rand(600, 150) }, (_, i) => createItem(`card ${i}`))
      } as Item
  })
  
  #boardSub = new BehaviorSubject(this.#board)
  board$ = this.#boardSub.asObservable()

  #list = this.#boardSub.pipe(
    map(data => data.reduce((l,item)=>l.concat(item).concat(item.children),[] as Item[])),
    shareReplay({refCount:true,bufferSize:1})
  )

  constructor() { }

  getItemById(id:string) {
    return this.#list.pipe(map(list => list.find(item => item.id===id)))
  }

}