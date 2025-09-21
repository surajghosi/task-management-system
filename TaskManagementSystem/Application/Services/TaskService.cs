using Application.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class TaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _taskRepository.GetAllAsync();

        }
        public async Task<IEnumerable<TaskItem>> GetTasksAsync(string? status, int? assigneeId)
        {
            return await _taskRepository.GetAllAsync(status, assigneeId);

        }


        public async Task<TaskItem?> CreateTaskAsync(TaskItem task)
        {
            await _taskRepository.AddAsync(task);
            return task;
        }

        public async Task<TaskItem?> UpdateTaskAsync(TaskItem task)
        {
            await _taskRepository.UpdateAsync(task);
            return task;
        }

        public async Task DeleteTaskAsync(TaskItem task)
        {
            await _taskRepository.DeleteAsync(task);
        }
    }

}
