import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoneraEstadosComponent } from './botonera-estados.component';

describe('BotoneraEstadosComponent', () => {
  let component: BotoneraEstadosComponent;
  let fixture: ComponentFixture<BotoneraEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotoneraEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoneraEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
