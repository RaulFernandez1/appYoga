import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalLayoutComponent } from './principal-layout.component';

describe('PrincipalLayoutComponent', () => {
  let component: PrincipalLayoutComponent;
  let fixture: ComponentFixture<PrincipalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
