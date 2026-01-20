namespace SchoolManagementSystem.Models
{
    public class StudentClassEnrollment
    {
        public int ID { get; set; }
        public int StudentId { get; set; }
        public int ClassId { get; set; }
        public int GradeId { get; set; }
        public int AcademicTermId { get; set; }
        public bool IsPassed { get; set; }
        public bool IsDeleted { get; set; }

        // Many-To-One
        public Student Student { get; set; }
        public Class Class { get; set; }
        public Grade Grade { get; set; }
        public AcademicTerm AcademicTerm { get; set; }
    }
    
}
