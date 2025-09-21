namespace Domain.Entities
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Status { get; set; } = "TODO";
        public string Priority { get; set; } = "MEDIUM";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // FK for Assignee
        public int? AssigneeId { get; set; }
        public User? Assignee { get; set; }

        // FK for Creator
        public int CreatorId { get; set; }
        public User Creator { get; set; }

        public int? UpdaterId { get; set; }
        public User? Updater { get; set; }
    }
}
