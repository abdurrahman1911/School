using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Data;
using SchoolManagementSystem.ViewModel;
using SchoolManagementSystem.Services;

namespace SchoolManagementSystem.Controllers
{

    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View("Login");
        }
       
        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = clsDB.DBContext.Users.FirstOrDefault(u=> u.SSN == model.SSN);

            

            if (user == null || user.Password != model.Password/* clsBCrypt.VerifyPassword(model.Password, user.Password)==false*/)
            {
                
                ModelState.AddModelError("", "كلمه المروراو الرقم القومي خطا");
              
                return View("~/Views/Home/Login.cshtml",model);
            }

                var type = (UserTypeEnum)user.TypeID;
                if (type == UserTypeEnum.Supervisor)
                {
                    var supervisor = clsDB.DBContext.Supervisors.FirstOrDefault(s => s.UserId == user.ID);
                    return View("~/Views/Supervisor/SupervisorProfile.cshtml", supervisor);

                }
                if (type == UserTypeEnum.Headmaster)
                {
                    var headmaster = clsDB.DBContext.Headmasters.FirstOrDefault(s => s.UserId == user.ID);
                    return View("~/Views/SchoolManager/Home.cshtml", headmaster);

                }
                if (type == UserTypeEnum.Student)
                {
                    var student = clsDB.DBContext.Students.FirstOrDefault(s => s.UserId == user.ID);
                    return View("~/Views/Student/Index.cshtml", student);

                }
                if (type == UserTypeEnum.Teacher)
                {
                    var teacher = clsDB.DBContext.Teachers.FirstOrDefault(s => s.UserId == user.ID);
                    return View("~/Views/Teacher/Main.cshtml", teacher);

                }
                if (type == UserTypeEnum.Parent)
                {
                    var parent = clsDB.DBContext.Parents.FirstOrDefault(s => s.UserId == user.ID);
                    return View("~/Views/Parent/Index.cshtml", parent);

                }
                if (type == UserTypeEnum.Admin)
                {
                    var admin = clsDB.DBContext.Headmasters.FirstOrDefault(s => s.UserId == user.ID);
                    return View("~/Views/Admin/Dashboard.cshtml", admin);

                }
             
            
            return View();





        }
    }
}
