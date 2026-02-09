using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SchoolManagementSystem.Controllers
{
    [Authorize (Roles ="Teacher")]
    public class TeacherController : Controller
    {
        public IActionResult Assignments() => View();
        public IActionResult Attendance() => View();
        public IActionResult Exams() => View();
        public IActionResult Grades() => View();


        public IActionResult Main() => View();
        public IActionResult Schedule() => View();
        public IActionResult Setting() => View();
        public IActionResult Students() => View();
        public IActionResult Teacherdashboard() => View();
    }
}