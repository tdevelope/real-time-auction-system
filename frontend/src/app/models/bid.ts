export interface Bid {
  id: number;
  auctionId: number;
  userId: number;
  amount: number;
  createdAt: string;
}

export interface CreateBidDto {
  auctionId: number;
  userId: number;
  amount: number;
}