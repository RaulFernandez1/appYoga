import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRecibosComponent } from './print-recibos.component';

describe('PrintRecibosComponent', () => {
  let component: PrintRecibosComponent;
  let fixture: ComponentFixture<PrintRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintRecibosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
