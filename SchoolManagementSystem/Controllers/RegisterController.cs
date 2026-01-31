using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.Data;
using SchoolManagementSystem.Models;
using SchoolManagementSystem.Services;
using SchoolManagementSystem.ViewModel;

namespace SchoolManagementSystem.Controllers
{
    public class RegisterController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public IActionResult RegisterStudent(StudentViewModel studnet)
        {

            if (!ModelState.IsValid)
            {
                return View(studnet);
            }

            if (!StudentService.AddNewStudnet(studnet))
            {
                //failed



                return View(studnet);
            }



            //added successfully
            return View();

            
          

        }

        [HttpPost]
        public IActionResult RegisterTeacher(TeacherViewModel teacher)
        {

            if (!ModelState.IsValid)
            {
                return View(teacher);
            }

            if (!TeacherService.AddNewTeacher(teacher))
            {
                //failed



                return View(teacher);
            }



            //added successfully
            return View();




        }


        [HttpPost]
        public IActionResult RegisterParent(ParentViewModel parent)
        {

            if (!ModelState.IsValid)
            {
                return View(parent);
            }

            if (!ParentService.AddNewParent(parent))
            {
                //failed



                return View(parent);
            }



            //added successfully
            return View();




        }

        [HttpPost]
        public IActionResult RegisterSupervisor(SupervisorViewModel supervisor)
        {
            if (!ModelState.IsValid)
            {
                return View(supervisor);
            }
            if (!SupervisorService.AddNewSupervisor(supervisor))
            {
                //failed



                return View(supervisor);
            }



            //added successfully
            return View();




        }


        [HttpPost]
        public IActionResult RegisterHeadmaster(HeadmasterViewModel headmaster)
        {

            if (!ModelState.IsValid)
            {
                return View(headmaster);
            }
            if (!HeadmasterService.AddNewHeadmaster(headmaster))
            {
                //failed



                return View(headmaster);
            }



            //added successfully
            return View();




        }


        

        [HttpPost]
        public IActionResult RegisterAdmin(AdminViewModel admin)
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


     


    }
}
