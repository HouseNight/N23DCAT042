using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunCare.Api.Data;
using SunCare.Api.Dtos;
using SunCare.Api.Models;

namespace SunCare.Api.Controllers;

[ApiController]
[Route("api/specialties")]
public class SpecialtiesController : ControllerBase
{
    private readonly AppDbContext _context;

    public SpecialtiesController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/specialties
    [HttpGet]
    public async Task<ActionResult<List<Specialty>>> GetAll()
    {
        var specialties = await _context.Specialties
            .AsNoTracking()
            .OrderBy(x => x.Id)
            .ToListAsync();

        return Ok(specialties);
    }

    // GET /api/specialties/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Specialty>> GetById(int id)
    {
        var specialty = await _context.Specialties.FindAsync(id);

        if (specialty is null)
        {
            return NotFound(new
            {
                message = "Không tìm thấy chuyên khoa."
            });
        }

        return Ok(specialty);
    }

    // POST /api/specialties
    [HttpPost]
    public async Task<ActionResult<Specialty>> Create(
        [FromBody] SpecialtyRequest request)
    {
        var specialty = new Specialty
        {
            Name = request.Name.Trim(),
            Description = request.Description.Trim()
        };

        _context.Specialties.Add(specialty);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = specialty.Id },
            specialty
        );
    }

    // PUT /api/specialties/1
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Specialty>> Update(
        int id,
        [FromBody] SpecialtyRequest request)
    {
        var specialty = await _context.Specialties.FindAsync(id);

        if (specialty is null)
        {
            return NotFound(new
            {
                message = "Không tìm thấy chuyên khoa."
            });
        }

        specialty.Name = request.Name.Trim();
        specialty.Description = request.Description.Trim();

        await _context.SaveChangesAsync();

        return Ok(specialty);
    }

    // DELETE /api/specialties/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var specialty = await _context.Specialties.FindAsync(id);

        if (specialty is null)
        {
            return NotFound(new
            {
                message = "Không tìm thấy chuyên khoa."
            });
        }

        _context.Specialties.Remove(specialty);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}