import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRecibosComponent } from './preview-recibos.component';

describe('PreviewRecibosComponent', () => {
  let component: PreviewRecibosComponent;
  let fixture: ComponentFixture<PreviewRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewRecibosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
