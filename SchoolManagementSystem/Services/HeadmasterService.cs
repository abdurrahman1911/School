using SchoolManagementSystem.Models;
using SchoolManagementSystem.ViewModel;
using System.Transactions;

namespace SchoolManagementSystem.Services
{
    static public class HeadmasterService
    {
        static private int AddHeadmaster(HeadmasterViewModel model, int userID)
        {
            Headmaster headmaster = new Headmaster
            {
                UserId = userID,
                HireDate = model.HireDate,
                ExiteDate = model.ExiteDate,
            };




            clsDB.DBContext.Add(headmaster);
            clsDB.DBContext.SaveChanges();


            return headmaster.ID;

        }
        static public bool AddNewHeadmaster(HeadmasterViewModel model)
        {

            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    int userID = UserService.AddBaseUser(model, (byte)UserTypeEnum.Headmaster);

                    AddHeadmaster(model, userID);
                    UserTypeService.AddUserType(userID, (byte)UserTypeEnum.Headmaster);
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
