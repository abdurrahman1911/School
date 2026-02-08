using SchoolManagementSystem.Models;

namespace SchoolManagementSystem.Services
{
    public class UserTypeService
    {
        static public void AddUserType(int userId,byte userTypeId)
        { 
            UserUserType userType = new UserUserType
            { 
                UserId = userId,
                UserTypeId = userTypeId,
            };
            clsDB.DBContext.Add(userType);
        }
       


    }
}
