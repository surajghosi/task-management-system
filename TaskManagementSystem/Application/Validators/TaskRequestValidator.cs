using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    public class TaskRequestValidator : AbstractValidator<TaskRequest>
    {
        public TaskRequestValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Status).Must(s => new[] { "TODO", "IN_PROGRESS", "DONE" }.Contains(s))
                .WithMessage("Status must be TODO, IN_PROGRESS, or DONE.");
            RuleFor(x => x.Priority).Must(p => new[] { "LOW", "MEDIUM", "HIGH" }.Contains(p))
                .WithMessage("Priority must be LOW, MEDIUM, or HIGH.");
        }
    }
}
