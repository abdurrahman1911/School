using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Models;
using SchoolManagementSystem.Services;
using SchoolManagementSystem.ViewModel;

namespace SchoolManagementSystem.Controllers
{
     [Authorize (Roles ="Admin")] 
    public class AdminController : Controller
    {
        [HttpGet]
        public IActionResult Addadmin()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Addadmin(AdminViewModel admin)
        {
            if (!ModelState.IsValid)
            {
                return View(admin);
            }

            if (!AdminService.AddNewAdmin(admin))
            {
                //failed
                return View(admin);
            }

            //added successfully
            return View();
        }

        public IActionResult Attendance() => View();

        public IActionResult Dashboard() => View();

        public IActionResult Editdata() => View();


        public IActionResult Student() => View();

        public IActionResult Successandfailure() => View();

        public IActionResult Supervisors() => View();

        public IActionResult Teachers() => View();
    }
}