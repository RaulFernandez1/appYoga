import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecibosComponent } from './form-recibos.component';

describe('FormRecibosComponent', () => {
  let component: FormRecibosComponent;
  let fixture: ComponentFixture<FormRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecibosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
