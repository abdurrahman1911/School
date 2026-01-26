using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SchoolManagementSystem.Models;

namespace SchoolManagementSystem.Configuration
{
    public class ExamConfiguration : IEntityTypeConfiguration<Exam>
    {
        public void Configure(EntityTypeBuilder<Exam> builder)
        {
            builder.HasKey(s => s.ID);
            builder.Property(s => s.ID).ValueGeneratedOnAdd();

            builder
                .HasOne(e => e.Subject)
                .WithMany(s => s.Exams)
                .HasForeignKey(e => e.SubjectId)
                .OnDelete(DeleteBehavior.Restrict);
            builder
                .Property(e => e.TotalDegree)
                .HasPrecision(5, 2);
            builder
                .HasOne(e=>e.Teacher)
                .WithMany(t=>t.Exams)
                .HasForeignKey(e=>e.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(e => e.Class)
                .WithMany(t => t.Exams)
                .HasForeignKey(e => e.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
