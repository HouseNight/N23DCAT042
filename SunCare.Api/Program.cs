using Microsoft.EntityFrameworkCore;
using SunCare.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký controller.
builder.Services.AddControllers();

// Đọc cấu hình kết nối database.
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "Chưa cấu hình DefaultConnection."
    );

// Đăng ký EF Core với SQLite.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString)
);

// Cho phép frontend của project gọi API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseRouting();

app.UseCors("Frontend");

app.MapControllers();

app.Run();