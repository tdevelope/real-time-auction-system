using backend.Application.DTOs;
using backend.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
    private readonly AuctionService _service;

    public AuctionsController(AuctionService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var auction = await _service.GetById(id);
        if (auction == null) return NotFound();

        return Ok(auction);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateAuctionDto dto)
    {
        await _service.Create(dto);
        return Ok();
    }
}