import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirejerciciosComponent } from './elegirejercicios.component';

describe('ElegirejerciciosComponent', () => {
  let component: ElegirejerciciosComponent;
  let fixture: ComponentFixture<ElegirejerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirejerciciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElegirejerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
