using SchoolManagementSystem.ViewModel;

namespace SchoolManagementSystem.Models
{
    public class UserType
    {
        public Byte ID { get; set; }
        public string TypeName { get; set; }

        public virtual ICollection<User> Users { get; set; }

        public static explicit operator UserTypeEnum(UserType v)
        {
            throw new NotImplementedException();
        }
    }
}
