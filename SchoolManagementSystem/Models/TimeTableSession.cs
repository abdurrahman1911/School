namespace SchoolManagementSystem.Models
{
    public class TimeTableSession
    {
        public int ID { get; set; }
        public int ClassId { get; set; }
        public int TeacherId { get; set; }
        public int SubjectId { get; set; }
        public byte DayOfWeekOredr { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        // Many-To-One
        public virtual Teacher Teacher { get; set; }
        public virtual Class Class { get; set; }
        public virtual Subject Subject { get; set; }

    }
}
