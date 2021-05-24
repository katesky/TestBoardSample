import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HelloComponent} from './hello.component';
import {BoardColComponent} from './board-col/board-col.component';
import {BoardComponent} from './board/board.component';
import {BoardItemComponent} from './board-item/board-item.component';
import {PanelCollapsedDirective, PanelComponent} from './panel/panel.component';
import { ActiveItemDirective } from './board-item/active-item.directive';
import { ToggleCollapseDirective } from './board-item/collapsable.directive';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    BoardColComponent,
    BoardComponent,
    BoardItemComponent,
    PanelComponent,
    PanelCollapsedDirective,
    ActiveItemDirective,
    ToggleCollapseDirective,
    DraggableDirective,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
