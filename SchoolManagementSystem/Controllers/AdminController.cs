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
            return View();
        }
        public IActionResult Attendance()
        {
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }

        public IActionResult Editdata()
        {
            return View();
        }


        public IActionResult Logout()
        {
            return View();
        }



        public IActionResult Student()
        {
            return View();
        }


        public IActionResult Successandfailure()
        {
            return View();
        }


        public IActionResult Supervisors()
        {
            return View();
        }



        public IActionResult Teachers()
        {
            return View();
        }




    }
}
