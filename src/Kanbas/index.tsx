import { Routes, Route, Navigate } from "react-router";
import React, {useEffect} from "react";
import { useSelector} from "react-redux";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css"
import * as userClient from "./Account/client";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";


export default function Kanbas() {
  // current courses are an empty list []
  const [courses, setCourses] = useState<any[]>([]);
  // current course is an object with default properties
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
   try {
     const courses = await userClient.findCoursesForUser(currentUser._id);
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };
 const updateEnrollment = async (courseId: string, enrolled: boolean) => {
  if (enrolled) {
    await userClient.enrollIntoCourse(currentUser._id, courseId);
  } else {
    await userClient.unenrollFromCourse(currentUser._id, courseId);
  }
  setCourses(
    courses.map((course) => {
      if (course._id === courseId) {
        return { ...course, enrolled: enrolled };
      } else {
        return course;
      }
    })
  );
};

 const fetchCourses = async () => {
   try {
     const allCourses = await courseClient.fetchAllCourses();
     const enrolledCourses = await userClient.findCoursesForUser(
       currentUser._id
     );
     const courses = allCourses.map((course: any) => {
       if (enrolledCourses.find((c: any) => c._id === course._id)) {
         return { ...course, enrolled: true };
       } else {
         return course;
       }
     });
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };


  // Function to delete course
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  }; 

  // Function to add New Course, send request to server, add new courses to [courses list]
  const addNewCourse = async() => {
    //const newCourse = await userClient.createCourse(course);
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  // get current from accountReducer, the user is updated by setCurrentUser when signin
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);
 
  // get all courses for that user
  {/*const fetchCourses = async () => {
    //let courses = [];
    try {
      // send request to server, and find all courses from api
      const courses = await courseClient.fetchAllCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  // when current user signin, 
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);*/}

  // Function to update course
  const updateCourse =async() => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  // Function to enroll to course
  const handleEnroll = async(courseId: string) => {
    try {
      await userClient.enrolleCourse(courseId);
      await fetchCourses();
      //alert("Enrolled in Class");
    }catch (error) {
      console.error("Error message:", error);
    }
  };

  // Function to unenroll from course
  const handleUnEnroll = async(courseId: string) => {
    try {
      await userClient.unEnrolleCourse(courseId);
      await fetchCourses();
      //alert("Unenrolled in Class");
    }catch (error) {
      console.error("Error message:", error);
    }
  };

  return (
    <Session>
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
              enrolling={enrolling} 
              setEnrolling={setEnrolling}
              updateEnrollment={updateEnrollment}
              /></ProtectedRoute>

          } />
           <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute> } />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
    </Session>
  );
}
