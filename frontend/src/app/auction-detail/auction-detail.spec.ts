import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionDetail } from './auction-detail';

describe('AuctionDetail', () => {
  let component: AuctionDetail;
  let fixture: ComponentFixture<AuctionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
