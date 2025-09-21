using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<TaskItem> Tasks => Set<TaskItem>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                       new User
                       {
                           Id = 1,
                           Username = "admin",
                           Email = "admin@example.com",
                           PasswordHash = "$2a$11$hijiX5ExzbJG4mUPHhbrjO.oGaZp1r6dDCd/lgQuX8La/r3qSyINy", // normally use real hash
                           Role = "ADMIN",
                           CreatedAt = DateTime.UtcNow
                       },
                       new User
                       {
                           Id = 2,
                           Username = "user",
                           Email = "user@example.com",
                           PasswordHash = "hashed_user_pw",
                           Role = "USER",
                           CreatedAt = DateTime.UtcNow
                       }
                   );
            // Task → Assignee (User)
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.Assignee)
                .WithMany(u => u.AssignedTasks)
                .HasForeignKey(t => t.AssigneeId)
                .OnDelete(DeleteBehavior.Restrict);

            // Task → Creator (User)
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.Creator)
                .WithMany() // Creator doesn’t need reverse navigation
                .HasForeignKey(t => t.CreatorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
