using backend.Application.DTOs;
using backend.Application.Interfaces;
using backend.Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace backend.Application.Services;

public class BidService
{
    private readonly IBidRepository _bidRepo;
    private readonly IAuctionRepository _auctionRepo;
    private readonly IHubContext<AuctionHub> _hub;
    private static readonly object _lock = new();

    public BidService(IBidRepository bidRepo, IAuctionRepository auctionRepo, IHubContext<AuctionHub> hub)
    {
        _bidRepo = bidRepo;
        _auctionRepo = auctionRepo;
        _hub = hub;
    }

    public async Task<Bid> Create(CreateBidDto dto)
    {
        var auction = await _auctionRepo.GetById(dto.AuctionId);

        var bids = await _bidRepo.GetByAuctionId(dto.AuctionId);

        decimal highest;

        lock (_lock)
        {
            highest = bids.Any() ? bids.Max(b => b.Amount) : 0;

            if (dto.Amount <= highest)
                throw new Exception("Bid must be higher");

            if (auction.Status != "Open")
                throw new Exception("Auction is closed");
        }

        var bid = new Bid
        {
            Id = Guid.NewGuid(),
            Amount = dto.Amount,
            AuctionId = dto.AuctionId,
            UserId = dto.UserId,
            CreatedAt = DateTime.UtcNow
        };

        await _bidRepo.Add(bid);

        auction.CurrentHighestBid = bid.Amount;
        await _auctionRepo.Update(auction);

        await _hub.Clients.All.SendAsync("BidUpdated", bid.AuctionId, bid.Amount);

        return bid;
    }

}
