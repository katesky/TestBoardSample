import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BoardColComponent } from './board-col/board-col.component';
import { BoardComponent } from './board/board.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, BoardColComponent, BoardComponent, BoardItemComponent, PanelComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
