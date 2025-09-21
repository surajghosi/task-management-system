using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Moq;

namespace TaskManagementSystemTests
{
    public class TaskServiceTests
    {
        private readonly Mock<ITaskRepository> _taskRepoMock;
        private readonly Mock<ICurrentUserService> _currentUserMock;
        private readonly TaskService _taskService;

        public TaskServiceTests()
        {
            _taskRepoMock = new Mock<ITaskRepository>();
            _currentUserMock = new Mock<ICurrentUserService>();

            _taskService = new TaskService(_taskRepoMock.Object);
        }

        [Fact]
        public async Task CreateTask_ShouldSetCreatorId()
        {
            // Arrange
            var task = new TaskItem { Title = "New Task" };
            _currentUserMock.Setup(c => c.UserId).Returns(1);

            // Act
            await _taskService.CreateTaskAsync(task);

            // Assert
            _taskRepoMock.Verify(r => r.AddAsync(It.Is<TaskItem>(t => t.Title == "New Task")), Times.Once);
        }

        [Fact]
        public async Task UpdateTask_ShouldUpdateFields()
        {
            // Arrange
            var task = new TaskItem { Id = 1, Title = "Old", Description = "Old desc" };
            var updated = new TaskItem { Id = 1, Title = "New", Description = "New desc" };

            _taskRepoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(task);

            // Act
            await _taskService.UpdateTaskAsync(updated);

            _taskRepoMock.Verify(r => r.UpdateAsync(It.Is<TaskItem>(t =>
             t.Id == updated.Id &&
             t.Title == updated.Title &&
             t.Description == updated.Description
         )), Times.Once);
        }
    }
}
