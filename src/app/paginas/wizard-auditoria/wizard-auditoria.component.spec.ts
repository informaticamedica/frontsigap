import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardAuditoriaComponent } from './wizard-auditoria.component';

describe('WizardAuditoriaComponent', () => {
  let component: WizardAuditoriaComponent;
  let fixture: ComponentFixture<WizardAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardAuditoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
