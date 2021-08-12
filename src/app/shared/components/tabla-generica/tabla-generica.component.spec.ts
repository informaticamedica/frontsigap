import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGenericaComponent } from './tabla-generica.component';

describe('TablaGenericaComponent', () => {
  let component: TablaGenericaComponent;
  let fixture: ComponentFixture<TablaGenericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaGenericaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
