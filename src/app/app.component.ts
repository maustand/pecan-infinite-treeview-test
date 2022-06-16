import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  filter, map,
  mergeMap,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap
} from 'rxjs';
import { BlackListPolicy } from './core/interfaces/blackListPolicy';
import {
  TreeNodeLevel,
  TreeViewAvailableNode
} from './core/interfaces/treeViewAvailableNode';
import { BlackListPolicyService } from './core/services/api/blacklist-policy/blacklist-policy.service';
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

  currentSelectedNode?: TreeViewAvailableNode;

  private destroy$: Subject<void>;

  private hashFetchedNodeIds: { [key: string]: boolean };

  constructor(
    private treeAvailableNodesServ: TreeViewAvailableNodesService,
    private treeViewHelperServ: TreeViewHelperService,
    private blackListPolicyServ: BlackListPolicyService,
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
      .pipe(
        mergeMap((nodes) => {
          return this.fetchBlackListPolicyOnNodes(nodes).pipe(
            map((blackList) => {
              return this.applyBlackListOnNodes(nodes, blackList);
            })
          );
        }),

        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.treeViewSource = res;
        this.changeDetecRef.markForCheck();
      });

    // listen selection of a certain node and try to fetch its childrens
    this.treeViewHelperServ.onNodeSelection$
      .pipe(
        filter((node) => !this.hashFetchedNodeIds[node.id]), // avoids to double fetch data for nodes
        tap((node) => {
          this.currentSelectedNode = node;
        }),
        switchMap((node) => this.treeAvailableNodesServ.all({ parentId: node.id })),
        mergeMap((nodes) => {
          return this.fetchBlackListPolicyOnNodes(nodes).pipe(
            map((blackList) => {
              return this.applyBlackListOnNodes(nodes, blackList);
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((childrenOfSelectedNode) => {
        this.hashFetchedNodeIds[this.currentSelectedNode?.id as string] = true;

        this.treeViewHelperServ.updateNodeValue(this.currentSelectedNode!.id, {
          ...(this.currentSelectedNode as TreeViewAvailableNode),
          children: childrenOfSelectedNode,
        });
      });
  }

  /**
   *  Fetch the black list policy for a certain list of TreeViewAvailableNode, using their ids
   * @param children List of TreeViewAvailableNode to be fetched
   * @returns Observable<BlackListPolicy[]
   */
  private fetchBlackListPolicyOnNodes(
    children: TreeViewAvailableNode[]
  ): Observable<BlackListPolicy[]> {
    const idsList = children.reduce((prev, curr) => {
      prev.push(curr.id);
      return prev;
    }, [] as string[]);

    return this.blackListPolicyServ.all({ blackListIds: idsList });
  }

  /**
   * Gets a list of nodes and the blacklist in order set it, applying isForbidden when it is required
   * @param nodes 
   * @param blackList 
   * @returns TreeViewAvailableNode[]
   */
  private applyBlackListOnNodes(
    nodes: TreeViewAvailableNode[],
    blackList: BlackListPolicy[]
  ): TreeViewAvailableNode[] {
    const nodesHash = nodes.reduce((prev, curr, index) => {
      prev[curr.id] = index;
      return prev;
    }, {} as { [key: string]: number });

    blackList.forEach((item) => {
      if (nodesHash[item.itemId] !== undefined) {
        const nodeIndex = nodesHash[item.itemId];
        nodes[nodeIndex].isForbidden = true;
      }
    });

    return nodes;
  }
}
