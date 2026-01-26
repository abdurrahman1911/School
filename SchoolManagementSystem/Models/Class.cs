namespace SchoolManagementSystem.Models
{
    public class Class
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int GradeId { get; set; }
        // One-To-Many
        public virtual ICollection<TimeTableSession>TimeTableSessions { get; set; }
        public ICollection<Homework> Homeworks { get; set; }
        public virtual ICollection<StudentClassEnrollment>StudentClassEnrollments { get; set; }
        public virtual ICollection<ExtraSubjectMaterial> ExtraSubjectMaterials { get; set; }
        public virtual ICollection<Exam>Exams { get; set; }

        // Many-To-One
        public virtual Grade Grade { get; set; }

        
    }
}
