using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SchoolManagementSystem.Controllers
{
    [Authorize (Roles ="Supervisor")]

    public class SupervisorController : Controller
    {
        public IActionResult EditProfile()
        {
            return View();
        }

        public IActionResult Notes()
        {
            return View();
        }


        public IActionResult StudentPage()
        {
            return View();
        }


        public IActionResult StudentsAbsence()
        {
            return View();
        }

        public IActionResult StudentsTable()
        {
            return View();
        }


        public IActionResult SupervisorProfile()
        {
            return View();
        }


        public IActionResult TeacherPerformance()
        {
            return View();
        }


        public IActionResult TeachersAbsence()
        {
            return View();
        }


        public IActionResult TeachersPage()
        {
            return View();
        }



        public IActionResult TeachersTable()
        {
            return View();
        }



    }
}
