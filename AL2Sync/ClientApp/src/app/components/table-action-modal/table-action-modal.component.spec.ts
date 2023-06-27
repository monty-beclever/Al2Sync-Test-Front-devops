import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActionModalComponent } from './table-action-modal.component';

describe('TableActionModalComponent', () => {
  let component: TableActionModalComponent;
  let fixture: ComponentFixture<TableActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
