import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auction, CreateAuctionDto } from '../models/auction.model';
import { Bid, CreateBidDto } from '../models/bid';

@Injectable({ providedIn: 'root' })
export class AuctionService {

  private baseUrl = 'https://localhost:7125/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Auction[]> {
    return this.http.get<Auction[]>(`${this.baseUrl}/auctions`);
  }

  getById(id: number): Observable<Auction> {
    return this.http.get<Auction>(`${this.baseUrl}/auctions/${id}`);
  }

  create(dto: CreateAuctionDto): Observable<Auction> {
    return this.http.post<Auction>(`${this.baseUrl}/auctions`, dto);
  }

  placeBid(dto: CreateBidDto): Observable<Bid> {
    return this.http.post<Bid>(`${this.baseUrl}/bids`, dto);
  }
}