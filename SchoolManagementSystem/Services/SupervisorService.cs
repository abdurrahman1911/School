using SchoolManagementSystem.Models;
using SchoolManagementSystem.ViewModel;
using System.Transactions;

namespace SchoolManagementSystem.Services
{
   static public class SupervisorService
    {
        static private int AddSupervisor(SupervisorViewModel model, int userID)
        {
            Supervisor supervisor = new Supervisor
            {
                UserId = userID,
                HireDate = model.HireDate,
                ExiteDate = model.ExiteDate,
            };




            clsDB.DBContext.Add(supervisor);
            clsDB.DBContext.SaveChanges();


            return supervisor.ID;

        }
        static public bool AddNewSupervisor(SupervisorViewModel model)
        {

            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    int userID = UserService.AddBaseUser(model, (byte)UserTypeEnum.Supervisor);

                    AddSupervisor(model, userID);

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
