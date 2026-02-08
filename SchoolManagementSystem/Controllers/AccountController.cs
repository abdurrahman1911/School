using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Services;
using SchoolManagementSystem.ViewModel;
using System.Security.Claims;

namespace SchoolManagementSystem.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View("Login");
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return View("Login", model);

            var user = clsDB.DBContext.Users
                .FirstOrDefault(u => u.SSN == model.SSN);

            if (user == null || user.Password != model.Password)
            {
                ModelState.AddModelError("", "كلمة المرور أو الرقم القومي خطأ");
                return View("Login", model);
            }

            var userType = clsDB.DBContext.UserUserTypes
                .FirstOrDefault(u => u.UserId == user.ID && u.UserTypeId == model.UserType);

            if (userType == null)
            {
                ModelState.AddModelError("", "ليس مسموح لك بالدخول بهذا التخصص");
                return View("Login", model);
            }

            //Claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Role, model.UserType.ToString()),
                new Claim("UserTypeId", model.UserType.ToString())
            };

            var identity = new ClaimsIdentity(claims, "MyCookieAuth");
            var principal = new ClaimsPrincipal(identity);

            // SignIn using correct scheme
            await HttpContext.SignInAsync("MyCookieAuth", principal);

            //RedirectToAction based on UserType
            switch ((UserTypeEnum)model.UserType)
            {
                case UserTypeEnum.Supervisor:
                    return RedirectToAction("SupervisorProfile", "Supervisor");

                case UserTypeEnum.Headmaster:
                    return RedirectToAction("Home", "SchoolManager");

                case UserTypeEnum.Student:
                    return RedirectToAction("Index", "Student");

                case UserTypeEnum.Teacher:
                    return RedirectToAction("Main", "Teacher");

                case UserTypeEnum.Parent:
                    return RedirectToAction("Index", "Parent");

                case UserTypeEnum.Admin:
                    return RedirectToAction("Dashboard", "Admin");

                default:
                    return RedirectToAction("Index", "Home");
            }
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("MyCookieAuth");
            return RedirectToAction("Index","Home");
        }
    }
}
