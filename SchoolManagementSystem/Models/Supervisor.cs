using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementSystem.Models
{
    public class Supervisor
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime? ExiteDate { get; set; }


        public virtual User User { get; set; }
    }
}
