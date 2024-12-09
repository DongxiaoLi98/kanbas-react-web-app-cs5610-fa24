//import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAutoFixHigh } from "react-icons/md";
import { MdClass } from "react-icons/md";
import { useState } from "react";
//import * as userClient from "./Account/client";
//import * as courseClient from "./Courses/client"

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment}: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean; 
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [edit, setEdit] = useState(false);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  {/*const [displayAllCourses, setDisplayAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);*/}

  {/*const toogleDisplayView = () => {
    setDisplayAllCourses(!displayAllCourses);
  };
  
  // display all courses
  const fetchAllCourses = async () => {
    try {
      const fetchedCourses = await courseClient.fetchAllCourses();
      setAllCourses(fetchedCourses)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isStudent)
    {fetchAllCourses();}
  }, [currentUser]);

  //const enrolleCourseIds = courses.map((course) => course._id);
  const coursesToDisplay = displayAllCourses ? allCourses : courses;*/}

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        <b> Dashboard  </b>
        
        <button 
          onClick={() => setEnrolling(!enrolling)} 
          className="float-end btn btn-primary">

            {enrolling ? "My Courses" : "All Courses"}

        </button>
      </h1><hr />
      <h5>
        <MdAutoFixHigh className="text-success"/>
        <b> Before delete </b> 
        Please make sure you are not enrolled
      </h5><hr />

      {/* Faculty has the ability to create/delete/update courses */}
      {isFaculty && (
        <div>
          {/*<h2 id="wd-dashboard-published"> Enrolled Courses ({courses.length})</h2>*/}
          <h5>
            <MdClass className="text-danger"/> 
            <b> Courses... </b>
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}> 
              Add New Course
            </button>

            <button 
              className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update Existing Course
            </button>
          </h5>
          <br />

          {!edit && 
            <div>
            <input 
              defaultValue={course.name} 
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}/>

            <textarea 
              defaultValue={course.description} 
              className="form-control"
              onChange={(e) => setCourse({ ...course, description: e.target.value })}/>
            </div>}
          
            {edit && 
            <div>
            <input 
              value={course.name} 
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}/>

            <textarea 
              value={course.description} 
              className="form-control"
              onChange={(e) => setCourse({ ...course, description: e.target.value })}/>
            </div>}
          <hr />
        </div> )
      }
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">

          {courses
            .map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  {/*<img src={course.image} width="100%" height={160} />*/}
                  <img src="/images/reactjs.jpg" width="100%" height={160} />
                  <div className="card-body">

                    <h5 className="wd-dashboard-course-title card-title">
                      {enrolling && (
                        <button 
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);}}

                          className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`}>

                            {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>)}

                        {course.name} 
                    </h5>

                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} 
                    </p>

                  {isFaculty && ( 
                    <div>
                      <button className="btn btn-primary"> Go </button>
                      <button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);}} 
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>

                      <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                          setEdit(true);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button>
                    </div>)
                  }

                  {isStudent && (
                    <div>
                      <button className="btn btn-primary me-2"> Go </button>
                    {/*enrolleCourseIds.includes(course._id) ? 
                     ( <button className="btn btn-success float-end me-2" id="wd-unenroll-course-click"
                        onClick={(event)=> {event.preventDefault(); handleUnEnroll(course._id)}}> Unenroll </button>)
                        :
                      (<button className="btn btn-danger float-end me-2" id="wd-enroll-course-click"
                    onClick={(event)=> {event.preventDefault(); handleEnroll(course._id)}}> Enroll </button>)*/}
                      
                    </div>)
                  }
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>);}

{/*
        isStudent && (
          <div>
          <button className="btn btn-primary float-end"
                  id="wd-enroll-new-course-click"
                  onClick = {toogleDisplayView}> {displayAllCourses? "My Enrollments":"Click to View all courses for enrollment"} </button>
          <h2 id="wd-dashboard-published">Published Courses ({coursesToDisplay.length})</h2><hr /></div>
        )
*/}