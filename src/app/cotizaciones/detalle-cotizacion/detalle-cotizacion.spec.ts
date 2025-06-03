import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCotizacion } from './detalle-cotizacion';

describe('DetalleCotizacion', () => {
  let component: DetalleCotizacion;
  let fixture: ComponentFixture<DetalleCotizacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCotizacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCotizacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
