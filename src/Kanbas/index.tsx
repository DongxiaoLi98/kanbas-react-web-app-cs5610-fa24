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
  // get currentUser from accountReducer, the user is updated by setCurrentUser when signin
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log(currentUser) // check in console
 
  // current courses are an empty list []
  const [courses, setCourses] = useState<any[]>([]);
  
  // signle course is an object with default properties
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course Title", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "Faculty members will automatically enroll in the new courses.",
  });

  // handle enrolling status
  const [enrolling, setEnrolling] = useState<boolean>(false);

  // find courses for logged in users
  const findCoursesForUser = async () => {
    try {
      // find current user's courses
      const courses = await userClient.findCoursesForUser(currentUser._id); // fuction from Account/client.ts
      console.log(`The upload id is: ${currentUser._id}`) // check in console
      setCourses(courses); // set courses list
      console.log(courses); // check in console
    } catch (error) {
      console.error(error);
    }
  };

  // handle enrollment status
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId); // fuction from Account/client.ts
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId); // fuction from Account/client.ts
    }
    setCourses(
      courses.map((course) => {
        // find course matches input courseId
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled }; // update enrollment status
        } else {
          return course;
        }
      })
    );
  };
  
  // fetch courses
  const fetchCourses = async () => {
    try {
      // get all courses, no matter who use is
      const allCourses = await courseClient.fetchAllCourses(); // fuction from Courses/client.ts
      // get current user's courses
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id); // fuction from Account/client.ts

      // find from all courses, check if current user enrolled in the courses
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true }; // if enrolled, update the enrollment status
        } else {
          return course;
        }
      });

      // set courses <--- enrolled courses
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
 
  // Function to delete course
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    //setCourses(courses.filter((course) => course._id !== courseId));
  }; 

  // Function to add New Course, send request to server, add new courses to [courses list]
  const addNewCourse = async() => {
    //const newCourse = await userClient.createCourse(course);
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  useEffect(() => {
    // if click button for enrolling
    if (enrolling) {
      fetchCourses(); // fetch all courses, with enrolled status
    } else {
      findCoursesForUser(); // otherwise, only display enrolled courses for current user
    }
  }, [currentUser, enrolling]);
 
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
{// get all courses for that user
  /*const fetchCourses = async () => {
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
    findCoursesForUser();
  }, [currentUser]);*/}
  {/*// Function to enroll to course
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
*/}