using SchoolManagementSystem.Models;
using SchoolManagementSystem.ViewModel;
using System.Transactions;

namespace SchoolManagementSystem.Services
{
    static public class StudentService
    {
        static private int AddStudent(StudentViewModel model,int userID)
        {
            Student student = new Student
            {
                UserId = userID,
                parentId = model.ParentID,
                JoinDate = model.JoinDate,
                ExiteDate = model.ExiteDate,
                ParentRelation = model.ParentRelation,
                IsGraduated = model.isGraduated
            };

          


                clsDB.DBContext.Add(student);
                clsDB.DBContext.SaveChanges();

         
            return student.ID;

        }
        static public bool AddNewStudnet(StudentViewModel model)
        {

            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    int userID = UserService.AddBaseUser(model, (byte)UserTypeEnum.Student);

                    AddStudent(model, userID);
                    UserTypeService.AddUserType(userID, (byte)UserTypeEnum.Student);
                    clsDB.DBContext.SaveChanges();
                    scope.Complete();
                }

            }
            catch (Exception ex) {
                return false;
            }

          

            return true;
          
        }
    }
}
