namespace SchoolManagementSystem.Models
{
    public class UserType
    {
        public Byte ID { get; set; }
        public string TypeName { get; set; }

        public virtual ICollection<User> Users { get; set; }

        
    }
}
