import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoopsComponent } from './coops.component';

describe('CoopsComponent', () => {
  let component: CoopsComponent;
  let fixture: ComponentFixture<CoopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
