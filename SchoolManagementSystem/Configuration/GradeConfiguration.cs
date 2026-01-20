using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SchoolManagementSystem.Models;

namespace SchoolManagementSystem.Configuration
{
    public class GradeConfiguration : IEntityTypeConfiguration<Grade>
    {
        public void Configure(EntityTypeBuilder<Grade> builder)
        {
            builder.HasKey(g=>g.ID);
            builder.Property(g=>g.ID).ValueGeneratedOnAdd();

            builder
                .HasOne(g=>g.Level)
                .WithMany(l=>l.Grades)
                .HasForeignKey(l=>l.LevelId)
                .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}
