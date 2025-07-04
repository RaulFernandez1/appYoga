import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNivelesComponent } from './form-niveles.component';

describe('FormNivelesComponent', () => {
  let component: FormNivelesComponent;
  let fixture: ComponentFixture<FormNivelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNivelesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
