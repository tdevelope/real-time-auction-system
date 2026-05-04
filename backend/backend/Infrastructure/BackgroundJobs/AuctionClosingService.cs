using backend.Application.Interfaces;
using Microsoft.Extensions.Hosting;

public class AuctionClosingService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public AuctionClosingService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();

            
            var repo = scope.ServiceProvider.GetRequiredService<IAuctionRepository>();

            var auctions = await repo.GetAll();

            foreach (var a in auctions)
            {
                if (a.Status == "Open" && a.EndTime < DateTime.UtcNow)
                {
                    a.Status = "Closed";
                    await repo.Update(a);
                }
            }

            await Task.Delay(60000);
        }
    }
}