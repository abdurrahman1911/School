using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SchoolManagementSystem.Models;

namespace SchoolManagementSystem.Configuration
{
    public class LevelConfiguration : IEntityTypeConfiguration<Level>
    {
        public void Configure(EntityTypeBuilder<Level> builder)
        {
            builder.HasKey(l=>l.ID);
            builder.Property(l=>l.ID).ValueGeneratedOnAdd();
        }
    }
}
