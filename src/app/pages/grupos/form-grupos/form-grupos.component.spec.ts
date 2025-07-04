import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGruposComponent } from './form-grupos.component';

describe('FormGruposComponent', () => {
  let component: FormGruposComponent;
  let fixture: ComponentFixture<FormGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
