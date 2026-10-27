using System.ComponentModel.DataAnnotations;

namespace SunCare.Api.Dtos;

public class SpecialtyRequest
{
    [Required(ErrorMessage = "Tên chuyên khoa là bắt buộc.")]
    [StringLength(100, ErrorMessage = "Tên không được vượt quá 100 ký tự.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Mô tả là bắt buộc.")]
    [StringLength(1000, ErrorMessage = "Mô tả không được vượt quá 1000 ký tự.")]
    public string Description { get; set; } = string.Empty;
}