import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunterComponent } from './volunter.component';

describe('VolunterComponent', () => {
  let component: VolunterComponent;
  let fixture: ComponentFixture<VolunterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
