using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Data;
using SchoolManagementSystem.Models;
using SchoolManagementSystem.ViewModel;

namespace SchoolManagementSystem.Controllers
{
    
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View("Login");
        }
        AppDbContext context = new ();
        [HttpPost]
        public IActionResult Login(LoginViewModel model) {
            if (!ModelState.IsValid) {
            return View(model);
            }
            
            var user = context.Users.FirstOrDefault(
                u => u.Password == model.Password 
                && u.Email == model.Email);

            


            var type = (UserTypeEnum)user.UserType;
            if (type == UserTypeEnum.Supervisor) { 
                var supervisor = context.Supervisors.FirstOrDefault(s=>s.UserId==user.ID);
                return View("Supervisor",supervisor);
            
            }
            if (type == UserTypeEnum.Headmaster)
            {
                var headmaster = context.Headmasters.FirstOrDefault(s => s.UserId == user.ID);
                return View("Supervisor", headmaster);

            }
            if (type == UserTypeEnum.Student)
            {
                var student = context.Students.FirstOrDefault(s => s.UserId == user.ID);
                return View("Supervisor", student);

            }
            if (type == UserTypeEnum.Teacher)
            {
                var teacher = context.Teachers.FirstOrDefault(s => s.UserId == user.ID);
                return View("Supervisor", teacher);

            }
            if (type == UserTypeEnum.Parent)
            {
                var parent = context.Parents.FirstOrDefault(s => s.UserId == user.ID);
                return View("Supervisor", parent);

            }
            if (type == UserTypeEnum.Admin)
            {
                var admin = context.Headmasters.FirstOrDefault(s => s.UserId == user.ID);
                return View("Supervisor", admin);

            }
            return View();



        }

    }
}
