import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoRutinaComponent } from './paso-rutina.component';

describe('PasoRutinaComponent', () => {
  let component: PasoRutinaComponent;
  let fixture: ComponentFixture<PasoRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoRutinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
