import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TreeViewAvailableNode } from 'src/app/core/interfaces/treeViewAvailableNode';

@Injectable({
  providedIn: 'root',
})
export class TreeViewHelperService {
  onNodeSelection$: Observable<TreeViewAvailableNode>;

  onUpdateNodeValue$: Observable<{
    id: string;
    newValue: TreeViewAvailableNode;
  }>;

  private selectedNode?: TreeViewAvailableNode;

  private readonly nodeSelectedChanged: Subject<TreeViewAvailableNode>;

  private readonly nodeValueUpdated: Subject<{
    id: string;
    newValue: TreeViewAvailableNode;
  }>;

  constructor() {
    this.nodeSelectedChanged = new Subject();
    this.nodeValueUpdated = new Subject();

    this.onNodeSelection$ = this.nodeSelectedChanged.asObservable();
    this.onUpdateNodeValue$ = this.nodeValueUpdated.asObservable();
  }

  getSelectedNode(): TreeViewAvailableNode | undefined {
    return this.selectedNode;
  }

  selectNode(node: TreeViewAvailableNode) {
    this.selectedNode = node;
    this.nodeSelectedChanged.next(node);
  }

  updateNodeValue(id: string, node: TreeViewAvailableNode) {
    this.nodeValueUpdated.next({ id, newValue: node });
  }
}
