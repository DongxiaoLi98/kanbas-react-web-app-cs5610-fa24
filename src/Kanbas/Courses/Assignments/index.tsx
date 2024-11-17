import React from "react";
import { FaCheckCircle, FaTrash} from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import {BsGripVertical} from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControl from "./AssignmentControl";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import {setAssignments, deleteAssignment, editAssignment}from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";


export default function Assignments() {
  const {cid} = useParams(); // get course's parameter in order to display all assignment for this specified course
  const dispatch = useDispatch()

  const { assignments } = useSelector((state: any) => state.assignmentReducer); // get initial assignment from reducer, now is []
  const { currentUser } = useSelector((state: any) => state.accountReducer); // get current user from reducer
  const isFaculty = currentUser?.role === "FACULTY"; // check the role of current user

  const fetchAssignments = async () => {
    // requesting data from server 
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments)); // assign the data to current assignment state in reducer
  };
  // display the assignments
  useEffect(() => {
    fetchAssignments();
  }, []);

  // function to display the date as string on screen
  const dateObjectToHtmlDateString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${
      date.getMonth() + 1
    }-${date.getDate() + 1 < 10 ? 0 : ""}${date.getDate() + 1}`;
  };

  // remove assignment
  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const [deleteAssignmentId, setDeleteAssignmentId] = useState<any>(null) // initiate delete assignment's id is null

  return (
      <div id="wd-assignments" className="container">

    {isFaculty && ( <div><AssignmentControl /></div>)}
    <br /><br /><br />
    <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-1 fs-3" />
              <b>ASSIGNMENTS</b>
              <IoEllipsisVertical className="float-end me-2 fs-3" />
              <BsPlus className="float-end fs-3 me-2" />
              <div className="rounded-pill border border-dark float-end me-2 p-1.5"> 40% of Total</div>
              </div>
    

        <ul id="wd-assignment-list"className="wd-lesson list-group rounded-0">
        {assignments
          .map((assignment: any) => (
            <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex">
            <div>
                <BsGripVertical className="me-3 fs-3 text-success" />
              <GiNotebook className="me-3 fs-3 text-success" />
              </div>
              <div className="col container">
                    <Link key={assignment._id} to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    className={"wd-assignment-link text-black"}
                    onClick={()=>dispatch(editAssignment(assignment._id))}>
                      {assignment.title}
                    </Link>
                <div>
                  <span style={{color:"red"}}>Multiple Modules</span><span>| <b>Not Avaliable </b>  
                  {assignment.avaliable? dateObjectToHtmlDateString(new Date(assignment.avaliable)) : dateObjectToHtmlDateString(new Date())}|
                  <b> Until  </b>{assignment.until? dateObjectToHtmlDateString(new Date(assignment.until)) : dateObjectToHtmlDateString(new Date())} </span>
                </div >
              
              <b>Due</b> {assignment.due? dateObjectToHtmlDateString(new Date(assignment.due)) : dateObjectToHtmlDateString(new Date())} 
              | <b> Points</b> {assignment.points ? assignment.points : 100}
              </div>

            <div className="float-end me-3">
            <FaTrash className="text-danger me-2 mb-1"
                data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" 
                onClick={() => {setDeleteAssignmentId(assignment._id)}}/> {/*If choose to delete an assignment, update the deleteAssignmentId */}
              <FaCheckCircle className="text-success me-3"/>
              <IoEllipsisVertical />
            </div>
            </div>
              </li>
            ))}
        </ul>
        </li>
        </ul>
        <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Do you confirm to delete this assignment? </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  No </button>
                <button onClick={()=>{
                  if (deleteAssignmentId) {
                    removeAssignment(deleteAssignmentId);
                  }
                  setDeleteAssignmentId(null);
                }} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Yes </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );}
  