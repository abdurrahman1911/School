namespace SchoolManagementSystem.Models
{
    public class Grade
    {
        public int ID { get; set; }
        public int LevelId { get; set; }
        public string Name { get; set; }
        public byte Order { get; set; }

        // One-To-Many
        public virtual ICollection<Class> Classes { get; set; }
        public virtual ICollection<StudentClassEnrollment> StudentClassEnrollments { get; set; }


        //Many-To-One
        public virtual Level Level { get; set; }


    }
}
