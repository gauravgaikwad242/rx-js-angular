import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationalComponent } from './creational.component';

describe('CreationalComponent', () => {
  let component: CreationalComponent;
  let fixture: ComponentFixture<CreationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
