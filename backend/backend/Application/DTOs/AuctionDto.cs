namespace backend.Application.DTOs
{
    public class AuctionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal StartingPrice { get; set; }
        public decimal CurrentHighestBid { get; set; }
        public string Status { get; set; }
    }
}
