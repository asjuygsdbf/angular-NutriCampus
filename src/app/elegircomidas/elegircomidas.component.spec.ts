import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegircomidasComponent } from './elegircomidas.component';

describe('ElegircomidasComponent', () => {
  let component: ElegircomidasComponent;
  let fixture: ComponentFixture<ElegircomidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegircomidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElegircomidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
