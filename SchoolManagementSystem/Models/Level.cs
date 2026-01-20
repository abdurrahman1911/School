namespace SchoolManagementSystem.Models
{
    public class Level
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public byte Order { get; set; }

        // One-To-Many
        public virtual ICollection<Grade> Grades { get; set; }
    }
}
