import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction.model';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './auction-list.html',
  styleUrl: './auction-list.css'
})
export class AuctionListComponent implements OnInit {

  auctions = signal<Auction[]>([]);

  constructor(
    private auctionService: AuctionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auctionService.getAll().subscribe(data => {
      this.auctions.set(data);
    });
  }

  goToAuction(id: number): void {
    this.router.navigate(['/auctions', id]);
  }

  getTimeLeft(endTime: string): string {
    const diff = new Date(endTime).getTime() - Date.now();
    if (diff <= 0) return 'הסתיים';
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours} שעות` : `${minutes} דקות`;
  }
}