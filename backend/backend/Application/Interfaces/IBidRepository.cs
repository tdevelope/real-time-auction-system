using backend.Domain.Entities;

namespace backend.Application.Interfaces
{
    public interface IBidRepository
    {
        Task Add(Bid bid);
        Task<List<Bid>> GetByAuctionId(Guid auctionId);
    }
}
