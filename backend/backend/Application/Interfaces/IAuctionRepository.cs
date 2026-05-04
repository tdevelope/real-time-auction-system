using backend.Domain.Entities;

namespace backend.Application.Interfaces
{
    public interface IAuctionRepository
    {
        Task<List<Auction>> GetAll();
        Task<Auction> GetById(Guid id);
        Task Add(Auction auction);
        Task Update(Auction auction);
    }
}
