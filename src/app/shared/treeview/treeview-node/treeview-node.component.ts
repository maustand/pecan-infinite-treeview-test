import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { filter, first, Subject, takeUntil } from 'rxjs';
import {
  TreeNodeTypeIconMap,
  TreeViewAvailableNode,
} from 'src/app/core/interfaces/treeViewAvailableNode';
import { TreeViewHelperService } from '../treeview-helper.service';

@Component({
  selector: '[pecan-ai-treeview-node]',
  templateUrl: './treeview-node.component.html',
  styleUrls: ['./treeview-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewNodeComponent implements OnInit {
  @Input() node!: TreeViewAvailableNode;

  isExpanded: boolean;

  iconResolverHash = TreeNodeTypeIconMap;

  private destroy: Subject<void>;

  constructor(
    private treeViewHelperServ: TreeViewHelperService,
    private changeDetecRef: ChangeDetectorRef
  ) {
    this.isExpanded = false;
    this.destroy = new Subject();
  }

  ngOnInit(): void {
    this.treeViewHelperServ.onUpdateNodeValue$
      .pipe(
        filter(({ id }) => this.node.id === id),
        first(),
        takeUntil(this.destroy) // usefull in a realword env, subscription should be removed
      )
      .subscribe(({ newValue }) => {
        this.node.children = newValue.children;
        this.changeDetecRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onToggle(): void {
    this.isExpanded = !this.isExpanded;
    this.treeViewHelperServ.selectNode(this.node);
    this.changeDetecRef.markForCheck();
  }

  trackByFn(index: number, item: TreeViewAvailableNode) {
    return `node-${item.id}-${item.type}`;
  }
}
