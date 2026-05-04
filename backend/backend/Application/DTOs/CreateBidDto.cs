namespace backend.Application.DTOs
{
    public class CreateBidDto
    {
        public decimal Amount { get; set; }
        public Guid AuctionId { get; set; }
        public Guid UserId { get; set; }
    }
}
