import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { DetailsSelectedNodeModule } from './shared/details-selected-node/details-selected-node.module';
import { TreeviewModule } from './shared/treeview/treeview.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, TreeviewModule, DetailsSelectedNodeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
