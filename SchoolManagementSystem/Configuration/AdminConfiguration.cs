using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SchoolManagementSystem.Models;

namespace SchoolManagementSystem.Configuration
{
    public class AdminConfiguration : IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> builder)
        {
            builder.HasKey(u => u.ID);
            builder.Property(u => u.ID).ValueGeneratedOnAdd();
            builder
               .HasOne(a => a.User)
               .WithOne(u => u.Admin)
               .HasForeignKey<Admin>(a => a.UserId)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
