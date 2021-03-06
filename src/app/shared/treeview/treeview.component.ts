import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { TreeViewAvailableNode } from 'src/app/core/interfaces/treeViewAvailableNode';

@Component({
  selector: 'pecan-ai-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewComponent {
  @Input() source: TreeViewAvailableNode[];

  constructor() {
    this.source = [];
  }

  trackByFn(index: number, item: TreeViewAvailableNode) {
    return `node-${item.id}-${item.type}`;
  }
}
