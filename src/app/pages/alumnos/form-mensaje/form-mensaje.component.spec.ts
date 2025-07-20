import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMensajeComponent } from './form-mensaje.component';

describe('FormMensajeComponent', () => {
  let component: FormMensajeComponent;
  let fixture: ComponentFixture<FormMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMensajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
