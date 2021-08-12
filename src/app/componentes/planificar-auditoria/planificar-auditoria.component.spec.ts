import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificarAuditoriaComponent } from './planificar-auditoria.component';

describe('PlanificarAuditoriaComponent', () => {
  let component: PlanificarAuditoriaComponent;
  let fixture: ComponentFixture<PlanificarAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificarAuditoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificarAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
