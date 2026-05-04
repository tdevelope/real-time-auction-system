using backend.Domain.Entities;

namespace backend.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetById(Guid id);
    }
}
