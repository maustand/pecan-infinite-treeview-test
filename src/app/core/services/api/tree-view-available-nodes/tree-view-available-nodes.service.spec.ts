import { TestBed } from '@angular/core/testing';

import { TreeViewAvailableNodesService } from './tree-view-available-nodes.service';

describe('TreeViewAvailableNodesService', () => {
  let service: TreeViewAvailableNodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeViewAvailableNodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
