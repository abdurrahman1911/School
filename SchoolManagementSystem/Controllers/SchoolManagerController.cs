using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SchoolManagementSystem.Controllers
{
    [Authorize]

    public class SchoolManagerController : Controller
    {
        public IActionResult Attendance()
        {
            return View();
        }   
        
        public IActionResult EditProfile()
        {
            return View();
        } 
        
        public IActionResult Home()
        {
            return View();
        }

        
        public IActionResult SchoolManagerProfile()
        {
            return View();
        }


                
        public IActionResult Students()
        {
            return View();
        }

     
        public IActionResult SuccessFailure()
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
