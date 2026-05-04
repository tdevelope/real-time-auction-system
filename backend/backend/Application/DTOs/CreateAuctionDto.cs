namespace backend.Application.DTOs
{
    public class CreateAuctionDto
    {
        public string Title { get; set; }
        public decimal StartingPrice { get; set; }
        public DateTime EndTime { get; set; }
    }
}
