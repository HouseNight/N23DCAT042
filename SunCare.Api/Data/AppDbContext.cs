using Microsoft.EntityFrameworkCore;
using SunCare.Api.Models;

namespace SunCare.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Specialty> Specialties => Set<Specialty>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Specialty>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(1000);

            entity.HasData(
                new Specialty
                {
                    Id = 1,
                    Name = "Tim mạch",
                    Description =
                        "Tìm hiểu chuyên khoa chăm sóc sức khỏe tim mạch."
                },
                new Specialty
                {
                    Id = 2,
                    Name = "Nhi khoa",
                    Description =
                        "Tìm hiểu chuyên khoa chăm sóc sức khỏe trẻ em."
                },
                new Specialty
                {
                    Id = 3,
                    Name = "Da liễu",
                    Description =
                        "Tìm hiểu chuyên khoa tư vấn và chăm sóc làn da."
                }
            );
        });
    }
}