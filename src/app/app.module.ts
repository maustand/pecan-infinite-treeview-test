import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeviewModule } from './shared/treeview/treeview.module';
import { HeaderComponent } from './core/layout/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, TreeviewModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
