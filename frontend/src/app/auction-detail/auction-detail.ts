import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuctionService } from '../services/auction.service';
import { Auction } from '../models/auction.model';
import { CreateBidDto } from '../models/bid';

@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auction-detail.html',
  styleUrl: './auction-detail.css'
})
export class AuctionDetailComponent implements OnInit, OnDestroy {

  auction = signal<Auction | null>(null);
  bidAmount = signal<number>(0);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  timeLeft = signal<string>('');

  private timer: any;
  private auctionId!: number;
  private userId = 1;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    this.auctionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAuction();
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  loadAuction(): void {
    this.auctionService.getById(this.auctionId).subscribe((data: Auction) => {
      this.auction.set(data);
      this.bidAmount.set(data.currentHighestBid + 1);
    });
  }

  placeBid(): void {
    const current = this.auction();
    if (!current) return;

    if (current.status === 'Closed') {
      this.errorMessage.set('המכירה הסתיימה');
      return;
    }

    if (this.bidAmount() <= current.currentHighestBid) {
      this.errorMessage.set('ההצעה חייבת להיות גבוהה מהמחיר הנוכחי');
      return;
    }

    const dto: CreateBidDto = {
      auctionId: this.auctionId,
      userId: this.userId,
      amount: this.bidAmount()
    };

    this.auctionService.placeBid(dto).subscribe({
      next: () => {
        this.successMessage.set('ההצעה התקבלה בהצלחה!');
        this.errorMessage.set('');
        this.loadAuction();
      },
      error: (err: any) => {
        this.errorMessage.set(err.error?.message ?? 'שגיאה בשליחת ההצעה');
        this.successMessage.set('');
      }
    });
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      const current = this.auction();
      if (!current) return;
      const diff = new Date(current.endTime).getTime() - Date.now();
      if (diff <= 0) {
        this.timeLeft.set('הסתיים');
        clearInterval(this.timer);
        return;
      }
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      this.timeLeft.set(
        `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);
  }
}