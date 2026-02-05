using SchoolManagementSystem.Models;
using SchoolManagementSystem.ViewModel;
using System.Transactions;

namespace SchoolManagementSystem.Services
{
    public class ParentService
    {
        static private int AddParent(ParentViewModel model, int userID)
        {
            Parent parent = new Parent
            {
                UserId = userID,

            };




            clsDB.DBContext.Add(parent);
            clsDB.DBContext.SaveChanges();


            return parent.ID;

        }
        static public bool AddNewParent(ParentViewModel model)
        {

            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    int userID = UserService.AddBaseUser(model, (byte)UserTypeEnum.Parent);

                    AddParent(model, userID);
                    UserTypeService.AddUserType(userID, (byte)UserTypeEnum.Parent);
                    clsDB.DBContext.SaveChanges();

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
