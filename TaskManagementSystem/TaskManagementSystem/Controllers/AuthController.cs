using Application.Common.Models;
using Application.DTOs;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace TaskManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {


            var token = await _authService.RegisterAsync(request.Username, request.Email, request.Password);
            if (token == null)
            {
                return BadRequest(Result<string>.Fail("Registration failed . User email already exists."));
            }



            return Ok(Result<string>.Ok(token, "Registration successfully"));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {

            var token = await _authService.LoginAsync(request.Email, request.Password);
            if (token == null)
            {
                return Unauthorized(Result<string>.Fail("Invalid credentials."));
            }

            return Ok(Result<string>.Ok(token, "Login successfully"));
        }
    }
}
