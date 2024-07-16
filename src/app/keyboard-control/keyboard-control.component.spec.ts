import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardControlComponent } from './keyboard-control.component';

describe('KeyboardControlComponent', () => {
  let component: KeyboardControlComponent;
  let fixture: ComponentFixture<KeyboardControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
