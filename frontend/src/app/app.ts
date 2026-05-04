import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuctionListComponent } from './auctions/auction-list/auction-list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuctionListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
