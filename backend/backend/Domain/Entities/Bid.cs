namespace backend.Domain.Entities
{
    public class Bid
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }

        public Guid AuctionId { get; set; }
        public Guid UserId { get; set; }
    }
}
