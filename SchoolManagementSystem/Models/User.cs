using SchoolManagementSystem.Models;

public class User
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string ThirdName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ProfilPhotoURL { get; set; }
    public string SSN { get; set; }
    public int TypeID { get; set; }
    public DateTime BirthDate { get; set; }
    public DateTime AddedDate { get; set; }
    public string Governorate { get; set; }
    public string City { get; set; }
    public string Street { get; set; }
    public string Area { get; set; }
    public bool Gender { get; set; }
    public string Nationality { get; set; }

    // One-to-One 
    public virtual Student Student { get; set; }        
    public virtual Parent Parent { get; set; }          
    public virtual Teacher Teacher { get; set; }       
    public virtual Supervisor Supervisor { get; set; }  
    public virtual Admin Admin { get; set; }            
    public virtual Headmaster Headmaster { get; set; }  

    // Many-To-One
    public virtual UserType UserType { get; set; }    
    
    // One-to-Many

    public virtual ICollection<Log> Logs { get; set; } = new List<Log>();
    public virtual ICollection<Note> WrittenNotes { get; set; } = new List<Note>();
    public virtual ICollection<Note> ReceivedNotes { get; set; } = new List<Note>();
    public virtual ICollection<Absence> Absences { get; set; }
}
