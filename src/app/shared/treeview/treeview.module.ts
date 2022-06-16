import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './treeview.component';
import { TreeViewNodeComponent } from './treeview-node/treeview-node.component';

@NgModule({
  declarations: [TreeViewComponent, TreeViewNodeComponent],
  exports: [TreeViewComponent, TreeViewNodeComponent],
  imports: [CommonModule],
})
export class TreeviewModule {}
