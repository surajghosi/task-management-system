namespace Application.Common.Models
{
    public class Result
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;

        public List<string> Errors { get; set; } = new();

        public static Result Ok(string message = "")
        {
            return new Result { Success = true, Message = message };
        }
        public static Result Fail(string message, List<string>? errors = null)
        {
            return new Result { Success = false, Message = message, Errors = errors ?? new List<string>() };
        }


    }
    public class Result<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public List<string> Errors { get; set; } = new();

        public static Result<T> Ok(T data, string message = "")
        {
            return new Result<T> { Success = true, Data = data, Message = message };
        }


        public static Result<T> Fail(string message, List<string>? errors = null)
        {
            return new Result<T> { Success = false, Message = message, Errors = errors ?? new List<string>() };
        }
    }
}
