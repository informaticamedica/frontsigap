import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAuditoriaComponent } from './ver-auditoria.component';

describe('VerAuditoriaComponent', () => {
  let component: VerAuditoriaComponent;
  let fixture: ComponentFixture<VerAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAuditoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
