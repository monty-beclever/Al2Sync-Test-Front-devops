import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyCComponent } from './tyc.component';

describe('TyCComponent', () => {
  let component: TyCComponent;
  let fixture: ComponentFixture<TyCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TyCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
