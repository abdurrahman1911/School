using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SchoolManagementSystem.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.ID);
            builder.Property(u=>u.ID).ValueGeneratedOnAdd();

            builder
                 .HasOne(u => u.UserType)
                 .WithMany(t => t.Users)
                 .HasForeignKey(u => u.TypeID)
                 .OnDelete(DeleteBehavior.Restrict);
            
            
            
                
        }
    }
}
