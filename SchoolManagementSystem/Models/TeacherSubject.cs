namespace SchoolManagementSystem.Models
{
    public class TeacherSubject
    {
        public int ID { get; set; }
        public int SubjectId { get; set; }
        public int TeacherId { get; set; }

        // Many-To-One
        public virtual Subject Subject { get; set; }
        public virtual Teacher Teacher { get; set; }
    }
}
