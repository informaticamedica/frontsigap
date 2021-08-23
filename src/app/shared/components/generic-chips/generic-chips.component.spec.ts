import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericChipsComponent } from './generic-chips.component';

describe('GenericChipsComponent', () => {
  let component: GenericChipsComponent;
  let fixture: ComponentFixture<GenericChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
