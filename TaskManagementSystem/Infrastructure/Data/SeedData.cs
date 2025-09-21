using Domain.Entities;

namespace Infrastructure.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Users.Any()) return; // DB already seeded

            var admin = new User
            {
                Id = 1,
                Username = "admin",
                Email = "admin@example.com",
                PasswordHash = "$2a$11$hijiX5ExzbJG4mUPHhbrjO.oGaZp1r6dDCd/lgQuX8La/r3qSyINy", // replace with real hash later
                Role = "ADMIN",
                CreatedAt = DateTime.UtcNow
            };

            var user = new User
            {
                Id = 2,
                Username = "user",
                Email = "user@example.com",
                PasswordHash = "$2a$11$hijiX5ExzbJG4mUPHhbrjO.oGaZp1r6dDCd/lgQuX8La/r3qSyINy",
                Role = "USER",
                CreatedAt = DateTime.UtcNow
            };

            context.Users.AddRange(admin, user);

            var tasks = new List<TaskItem>
            {
                new TaskItem { Id = 1, Title = "Setup project", Description= "Setup project", Status = "TODO", Priority = "HIGH", CreatorId = 1, AssigneeId = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = 2, Title = "Write documentation", Description= "Write documentation", Status = "IN_PROGRESS", Priority = "MEDIUM", CreatorId = 2, AssigneeId = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = 3, Title = "Fix bugs", Description= "Fix bug", Status = "DONE", Priority = "HIGH", CreatorId = 1, AssigneeId = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = 4, Title = "Review pull requests", Description= "Review pull requests", Status = "TODO", Priority = "LOW", CreatorId = 1, AssigneeId = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new TaskItem { Id = 5, Title = "Prepare demo", Description= "Prepare demo", Status = "IN_PROGRESS", Priority = "MEDIUM", CreatorId = 2, AssigneeId = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            };

            context.Tasks.AddRange(tasks);

            context.SaveChanges();
        }

    }
}
