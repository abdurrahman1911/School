using SchoolManagementSystem.Models;
using SchoolManagementSystem.ViewModel;
using System.Transactions;

namespace SchoolManagementSystem.Services
{
    public class AdminService
    {
        static private int AddAdmin(AdminViewModel model, int userID)
        {
            Admin admin = new Admin
            {
                UserId = userID,
               
            };




            clsDB.DBContext.Add(admin);
            clsDB.DBContext.SaveChanges();


            return admin.ID;

        }
        static public bool AddNewAdmin(AdminViewModel model)
        {

            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    int userID = UserService.AddBaseUser(model, (byte)UserTypeEnum.Admin);

                    AddAdmin(model, userID);

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
