import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoopsComponent } from './new-coops.component';

describe('NewCoopsComponent', () => {
  let component: NewCoopsComponent;
  let fixture: ComponentFixture<NewCoopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCoopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
