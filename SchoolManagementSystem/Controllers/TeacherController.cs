using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SchoolManagementSystem.Controllers
{
    [Authorize]

    public class TeacherController : Controller
    {
        public IActionResult Assignments()
        {
            return View();
        }

        public IActionResult Attendance()
        {
            return View();
        }

        public IActionResult Exams()
        {
            return View();
        }


        public IActionResult Grades()
        {
            return View();
        }



        public IActionResult Logout()
        {
            return View();
        }


        public IActionResult Main()
        {
            return View();
        }


        public IActionResult Schedule()
        {
            return View();
        }



        public IActionResult Setting()
        {
            return View();
        }

        public IActionResult Students()
        {
            return View();
        }

        public IActionResult Teacherdashboard()
        {
            return View();
        }




    }
}