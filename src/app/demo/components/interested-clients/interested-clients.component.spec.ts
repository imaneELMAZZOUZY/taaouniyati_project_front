import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedClientsComponent } from './interested-clients.component';

describe('InterestedClientsComponent', () => {
  let component: InterestedClientsComponent;
  let fixture: ComponentFixture<InterestedClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestedClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterestedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
