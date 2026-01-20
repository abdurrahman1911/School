namespace SchoolManagementSystem.Models
{
    public class StudentExamDegree
    {
        public int ID { get; set; }
        public int ExamId { get; set; }
        public int StudentId { get; set; }
        public decimal Degree { get; set; }

        // Many-To-One
        public Exam Exam { get; set; }
        public Student Student { get; set; }
    }
}
