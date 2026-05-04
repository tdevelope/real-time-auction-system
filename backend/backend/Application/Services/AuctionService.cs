using backend.Application.DTOs;
using backend.Application.Interfaces;
using backend.Domain.Entities;

namespace backend.Application.Services;

public class AuctionService
{
    private readonly IAuctionRepository _repo;

    public AuctionService(IAuctionRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Auction>> GetAll()
        => await _repo.GetAll();

    public async Task<Auction> GetById(Guid id)
        => await _repo.GetById(id);

    public async Task Create(CreateAuctionDto dto)
    {
        var auction = new Auction
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            StartingPrice = dto.StartingPrice,
            EndTime = dto.EndTime,
            Bids = new List<Bid>()
        };

        await _repo.Add(auction);
    }
}