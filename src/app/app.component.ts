import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { filter, map, mergeMap, Subject, switchMap, takeUntil } from 'rxjs';
import {
  TreeNodeLevel,
  TreeViewAvailableNode,
} from './core/interfaces/treeViewAvailableNode';
import { TreeViewAvailableNodesService } from './core/services/api/tree-view-available-nodes/tree-view-available-nodes.service';
import { TreeViewHelperService } from './shared/treeview/treeview-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  treeViewSource: TreeViewAvailableNode[];

  private destroy$: Subject<void>;

  private hashFetchedNodeIds: { [key: string]: boolean };

  constructor(
    private treeAvailableNodesServ: TreeViewAvailableNodesService,
    private treeViewHelperServ: TreeViewHelperService,
    private changeDetecRef: ChangeDetectorRef
  ) {
    this.hashFetchedNodeIds = {};
    this.treeViewSource = [];
    this.destroy$ = new Subject();
  }

  ngOnInit(): void {
    // fetch first nodes ( Connection level )
    this.treeAvailableNodesServ
      .all({ type: TreeNodeLevel.CONNECTION })
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.treeViewSource = res;
        this.changeDetecRef.markForCheck();
      });

    // listen selection of a certain node and try to fetch its childrens
    this.treeViewHelperServ.onNodeSelection$
      .pipe(
        filter((node) => (!this.hashFetchedNodeIds[node.id])), // avoids to fetch data for nodes
        mergeMap((node) =>
          this.treeAvailableNodesServ.all({ parentId: node.id }).pipe(
            map((response) => {
              return {
                selected: node,
                children: response,
              };
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(({ selected, children }) => {
        this.hashFetchedNodeIds[selected.id] = true;
        this.treeViewHelperServ.updateNodeValue(selected.id, {
          ...selected,
          children: children,
        });
      });
  }
}
