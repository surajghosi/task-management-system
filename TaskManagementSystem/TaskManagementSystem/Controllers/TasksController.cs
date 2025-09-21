using Application.Common.Models;
using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TaskManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;
        private readonly ICurrentUserService _currentUserService;
        public TasksController(TaskService taskService, ICurrentUserService currentUserService)
        {
            _taskService = taskService;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? status, [FromQuery] int? assigneeId)
        {
            if (string.IsNullOrEmpty(status) && assigneeId is null)
            {
                var alltasks = await _taskService.GetAllTasksAsync();
                return Ok(Result<IEnumerable<TaskItem>>.Ok(alltasks, "Data loaded."));
            }
            var tasks = await _taskService.GetTasksAsync(status, assigneeId);
            return Ok(Result<IEnumerable<TaskItem>>.Ok(tasks));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskRequest task)
        {
            var payLoad = new TaskItem
            {
                AssigneeId = task.AssigneeId,
                Title = task.Title,
                Description = task.Description,
                CreatedAt = DateTime.Now,
                CreatorId = _currentUserService.UserId,
                Status = task.Status,
                Priority = task.Priority
            };

            var created = await _taskService.CreateTaskAsync(payLoad);
            return Ok(Result<TaskItem>.Ok(created!, "Task created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskRequest updatedTask)
        {
            var payLoad = new TaskItem
            {
                Id = id,
                AssigneeId = updatedTask.AssigneeId,
                Title = updatedTask.Title,
                Description = updatedTask.Description,
                UpdatedAt = DateTime.Now,
                UpdaterId = _currentUserService.UserId,
                Status = updatedTask.Status
            };

            var result = await _taskService.UpdateTaskAsync(payLoad);
            return Ok(Result<TaskItem>.Ok(result!, "Task updated successfully"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _taskService.GetTasksAsync(null, null);
            var existing = task.FirstOrDefault(t => t.Id == id);
            if (existing == null) return NotFound();
            await _taskService.DeleteTaskAsync(existing);
            return Ok(Result.Ok("Task deleted successfully"));
        }

    }
}
