import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "./Database";
import { useSelector } from "react-redux";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse}: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void;}) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const [enrollments, setEnrollments] = useState<any[]>(db.enrollments);
  const [displayAllCourses, setDisplayAllCourses] = useState(true);
  const changeEnrollmentState = () => {
    setDisplayAllCourses(!displayAllCourses);
  };

  const isEnrolled = (courseID:string) => {
    return enrollments.some((enrollment)=>enrollment.user === currentUser._id && enrollment.course === courseID);
  }

  const handleEnroll = (courseID:string) => {
    const newEnrollment = {user: currentUser._id, course: courseID};
    setEnrollments([...enrollments, {user:currentUser._id, course: courseID}])
  };

  const handleUnEnroll = (courseID:string) => {
    const updateEnrollment = enrollments.filter(
        (enrollment) => ! (enrollment.user === currentUser._id && enrollment.course === courseID)
    );
    setEnrollments(updateEnrollment)
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {
        isStudent && (
          <div>
          <button className="btn btn-primary float-end"
                  id="wd-enroll-new-course-click"
                  onClick = {changeEnrollmentState}> Enrollments </button></div>
        )
      }
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />

      {isFaculty && (<div><h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
          Update </button>
      </h5><br />
        <input defaultValue={course.name} className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
        <textarea defaultValue={course.description} className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr /></div>)}
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.filter((course) => displayAllCourses ? true :
                enrollments.some(
                  (enrollment) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                  )).map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={course.image} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>

                   {isFaculty && ( 
                    <div>
                      <button className="btn btn-primary"> Go </button>
                      <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                      }} className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                    </button>

                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button>
                  </div>)
                }

                {isStudent && (
                  <div>
                      <button className="btn btn-primary me-2"> Go </button>
                    {isEnrolled(course._id) ? (
                      <button className="btn btn-success float-end me-2" id="wd-unenroll-course-click"
                        onClick={(event)=> {event.preventDefault(); handleUnEnroll(course._id)}}> Unenroll </button>):
                   (<button className="btn btn-danger float-end me-2" id="wd-enroll-course-click"
                    onClick={(event)=> {event.preventDefault(); handleEnroll(course._id)}}> Enroll </button>)}
                      
                  </div>
                )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>);}