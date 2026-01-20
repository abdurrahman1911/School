namespace SchoolManagementSystem.Models
{
    public class Subject
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        // One-To-Many
        public virtual ICollection<Exam> Exams { get; set; }
        public virtual ICollection<ExtraSubjectMaterial> ExtraSubjectMaterials { get; set; }
        public virtual ICollection<TimeTableSession> TimeTableSessions { get; set; }
        public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }
        public virtual ICollection<StudentsSubjectsEnrollment> StudentsSubjectsEnrollments { get; set; }

    }
}
