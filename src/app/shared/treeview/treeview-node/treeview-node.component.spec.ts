import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewNodeComponent } from './treeview-node.component';

describe('TreeviewNodeComponent', () => {
  let component: TreeViewNodeComponent;
  let fixture: ComponentFixture<TreeViewNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeViewNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeViewNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
