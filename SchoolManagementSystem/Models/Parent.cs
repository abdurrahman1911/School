using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementSystem.Models
{
    public class Parent
    {
        public int ID { get; set; }
        public int UserId { get; set; }

        public virtual ICollection<Student> Students { get; set; }
        public virtual User User { get; set; }
    }
}
