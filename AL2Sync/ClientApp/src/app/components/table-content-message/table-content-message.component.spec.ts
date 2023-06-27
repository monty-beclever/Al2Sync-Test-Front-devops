import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentMessageComponent } from './table-content-message.component';

describe('TableContentMessageComponent', () => {
  let component: TableContentMessageComponent;
  let fixture: ComponentFixture<TableContentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContentMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
