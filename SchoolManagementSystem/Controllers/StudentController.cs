using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SchoolManagementSystem.Controllers
{
    [Authorize]

    public class StudentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Schedule()
        {
            return View();
        }

        public IActionResult Grades()
        {
            return View();
        }

        public IActionResult Attendance()
        {
            return View();
        }

        public IActionResult Tests()
        {
            return View();
        }

        public IActionResult Level()
        {
            return View();
        }

        public IActionResult Assignments()
        {
            return View();
        }

        public IActionResult Edit()
        {
            return View();
        }
    }
}
