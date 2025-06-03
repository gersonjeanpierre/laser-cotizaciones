import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCotizaciones } from './lista-cotizaciones';

describe('ListaCotizaciones', () => {
  let component: ListaCotizaciones;
  let fixture: ComponentFixture<ListaCotizaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCotizaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCotizaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
