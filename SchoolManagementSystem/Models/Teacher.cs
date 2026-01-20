using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolManagementSystem.Models
{
    public class Teacher
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime? ExiteDate { get; set; }

        // One-To-One
        public virtual User User { get; set; }
        // One-To-Many
        public virtual ICollection<TimeTableSession> TimeTableSessions { get; set; }
        public virtual ICollection<Homework>Homeworks { get; set; }
        public virtual ICollection<TeacherSubject>TeacherSubjects { get; set; }
        public virtual ICollection<StudentsSubjectsEnrollment> StudentsSubjectsEnrollments { get; set; }
    }
}
