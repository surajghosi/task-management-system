using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TaskManagementSystem.Filters
{
    public class ValidationFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            foreach (var arg in context.ActionArguments.Values)
            {
                if (arg is null) continue;

                var validatorType = typeof(IValidator<>).MakeGenericType(arg.GetType());
                var validator = context.HttpContext.RequestServices.GetService(validatorType);

                if (validator is not null)
                {
                    var validationContext = new ValidationContext<object>(arg);
                    var validationResult = await ((IValidator)validator).ValidateAsync(validationContext);

                    if (!validationResult.IsValid)
                    {
                        context.Result = new BadRequestObjectResult(validationResult.Errors.Select(e => new
                        {
                            e.PropertyName,
                            e.ErrorMessage
                        }));
                        return; // stop pipeline
                    }
                }
            }

            await next();
        }
    }
}
