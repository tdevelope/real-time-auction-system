using backend.Application.Interfaces;
using backend.Domain.Entities;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class AuctionRepository :IAuctionRepository
    {
        private readonly AppDbContext _context;
        public AuctionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Auction>> GetAll() =>
            await _context.Auctions.ToListAsync();

        public async Task<Auction> GetById(Guid id) =>
            await _context.Auctions.FindAsync(id);

        public async Task Add(Auction auction)
        {
            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Auction auction)
        {
            _context.Auctions.Update(auction);
            await _context.SaveChangesAsync();
        }
    }
}
