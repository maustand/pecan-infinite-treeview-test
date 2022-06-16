import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TreeViewAvailableNode } from 'src/app/core/interfaces/treeViewAvailableNode';

@Component({
  selector: 'pecan-ai-details-selected-node',
  templateUrl: './details-selected-node.component.html',
  styleUrls: ['./details-selected-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsSelectedNodeComponent {
  @Input() node?: TreeViewAvailableNode;
}
