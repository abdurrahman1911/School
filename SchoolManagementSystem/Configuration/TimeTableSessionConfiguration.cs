using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SchoolManagementSystem.Models;

namespace SchoolManagementSystem.Configuration
{
    public class TimeTableSessionConfiguration : IEntityTypeConfiguration<TimeTableSession>
    {
        public void Configure(EntityTypeBuilder<TimeTableSession> builder)
        {
            builder.HasKey(t=>t.ID);
            builder.Property(t=>t.ID).ValueGeneratedOnAdd();

            builder
                .HasOne(t => t.Teacher)
                .WithMany(t => t.TimeTableSessions)
                .HasForeignKey(t => t.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(t => t.Class)
                .WithMany(t => t.TimeTableSessions)
                .HasForeignKey(t => t.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
               .HasOne(t => t.Subject)
               .WithMany(s => s.TimeTableSessions)
               .HasForeignKey(t => t.SubjectId)
               .OnDelete(DeleteBehavior.Restrict);




        }
    }
}
