export interface Auction {
  id: number;
  title: string;
  description: string;
  startingPrice: number;
  currentHighestBid: number;
  status: 'Open' | 'Closed';
  endTime: string;
}

export interface CreateAuctionDto {
  title: string;
  description: string;
  startingPrice: number;
  endTime: string;
}