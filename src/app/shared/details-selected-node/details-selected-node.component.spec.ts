import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSelectedNodeComponent } from './details-selected-node.component';

describe('DetailsSelectedNodeComponent', () => {
  let component: DetailsSelectedNodeComponent;
  let fixture: ComponentFixture<DetailsSelectedNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSelectedNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSelectedNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
