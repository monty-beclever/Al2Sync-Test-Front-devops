import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPartnersComponent } from './new-partners.component';

describe('NewPartnersComponent', () => {
  let component: NewPartnersComponent;
  let fixture: ComponentFixture<NewPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
