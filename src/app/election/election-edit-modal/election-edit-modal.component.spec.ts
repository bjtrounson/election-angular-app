import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionEditModalComponent } from './election-edit-modal.component';

describe('ElectionEditModalComponent', () => {
  let component: ElectionEditModalComponent;
  let fixture: ComponentFixture<ElectionEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
