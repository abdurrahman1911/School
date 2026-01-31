using SchoolManagementSystem.Models;
using SchoolManagementSystem.ViewModel;
using System.Transactions;

namespace SchoolManagementSystem.Services
{
   
        static public class TeacherService
        {
            static private int AddTeacher(TeacherViewModel model, int userID)
            {
                Teacher teacher = new Teacher
                {
                    UserId = userID,
                    HireDate=model.HireDate,
                    ExiteDate=model.ExiteDate,
                };




                clsDB.DBContext.Add(teacher);
                clsDB.DBContext.SaveChanges();


                return teacher.ID;

            }
            static public bool AddNewTeacher(TeacherViewModel model)
            {

                try
                {
                    using (TransactionScope scope = new TransactionScope())
                    {
                        int userID = UserService.AddBaseUser(model, (byte)UserTypeEnum.Teacher);

                        AddTeacher(model, userID);

                        scope.Complete();
                    }

                }
                catch (Exception ex)
                {
                    return false;
                }



                return true;

            }
        }
}

