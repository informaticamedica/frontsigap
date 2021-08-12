import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCargandoComponent } from './modal-cargando.component';


describe('ModalCargandoComponent', () => {
  let component: ModalCargandoComponent;
  let fixture: ComponentFixture<ModalCargandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCargandoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCargandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
