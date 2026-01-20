using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementSystem.Models
{
    public class Admin
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}


