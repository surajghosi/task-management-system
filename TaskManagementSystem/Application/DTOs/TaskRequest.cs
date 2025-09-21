namespace Application.DTOs
{
    public record TaskRequest(string Title, string? Description, string Status, string Priority, int? AssigneeId);
}
