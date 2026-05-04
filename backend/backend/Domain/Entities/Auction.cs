namespace backend.Domain.Entities
{
    public class Auction
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal StartingPrice { get; set; }
        public decimal CurrentHighestBid { get; set; }
        public string Status { get; set; } // Open / Closed
        public DateTime EndTime { get; set; }

        public List<Bid> Bids { get; set; } = new();
    }
}
