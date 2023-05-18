import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2NouisliderComponent } from './ng2-nouislider.component';

describe('Ng2NouisliderComponent', () => {
  let component: Ng2NouisliderComponent;
  let fixture: ComponentFixture<Ng2NouisliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ng2NouisliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ng2NouisliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
