using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SchoolManagementSystem.ViewModel;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace SchoolManagementSystem.Services
{
    
    public enum UserTypeEnum
    {
        Student = 1, Teacher, Parent, Admin, Supervisor, Headmaster
    }
    public class UserService
    {

        static public bool isEmailExist(string Email)
        {
            var checkEmailExist = clsDB.DBContext.Users.FirstOrDefault(u => u.Email == Email);
            return (checkEmailExist != null);
        }

        static public bool isSSNExist(string SSN)
        {
            var checkSSNExist = clsDB.DBContext.Users.FirstOrDefault(u => u.SSN == SSN);
            return (checkSSNExist != null);
        }

        static public bool isPhoneExist(string Phone)
        {
            var checkPhoneExist = clsDB.DBContext.Users.FirstOrDefault(u => u.Phone == Phone);
            return (checkPhoneExist != null);
        }
        static public int AddBaseUser(BaseUserViewModel model, byte typeId)
        {
            
            
            if (isEmailExist(model.Email))
                throw new Exception("Email already exists.");

           

            if (isSSNExist(model.SSN))
                throw new Exception("SSN already exists.");

           
            if (isPhoneExist(model.Phone))
                throw new Exception("Phone already exists");
     
            string hashedPassword = clsBCrypt.GetHash(model.Password);

           
            var user = new User
            {
               FirstName= model.FirstName,
              SecondName = model.SecondName,
              ThirdName = model.ThirdName,
              LastName = model.LastName,
              Phone = model.Phone,
              Email = model.Email,
              Password = hashedPassword,
              ProfilPhotoURL = model.ProfilePhotoURL,
              SSN = model.SSN,
              BirthDate = model.BirthDate,
              AddedDate = model.AddedDate,
              Governorate = model.Governorate,
              City = model.City,
              Street = model.Street,
              Area = model.Area,
              Gender = model.Gender,
              Nationality = model.Nationality
            };
                
            

           
                //  add to database
                clsDB.DBContext.Add(user);
                clsDB.DBContext.SaveChanges();
           

            // Return generated User ID
          
            return user.ID;
        }




    }
}
