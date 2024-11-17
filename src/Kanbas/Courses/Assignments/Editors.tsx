import React, {useState} from "react";
import { useParams, Link} from "react-router-dom";
//import * as db from "../../Database";
//import { CgCalendarDates } from "react-icons/cg";
import { addAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch} from "react-redux";
import * as assignmentsClient from "./client";
import * as courseClient from "../client";

export default function AssignmentEditor() {
  // function to convert date to string
  const dateObjectToHtmlDateString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${
      date.getMonth() + 1
    }-${date.getDate() + 1 < 10 ? 0 : ""}${date.getDate() + 1}`;
  };

  const dispatch = useDispatch();
  
  // get parameter for course and assignment
  const { cid, aid} = useParams();

  // select all assignments from reducer
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  // check if this assignemtn editor screen is for an exist assignment or new assignment
  const currentAssignment = assignments.find((a:any)=> a._id === aid) || {}

  const [title, setAssignmentTitle] = useState(currentAssignment.title || "New Title")
  const [description, setDescription] = useState(currentAssignment.description || "New Description")
  const [points, setPoints] = useState(currentAssignment.points || 100)
  const [due, setDueDate] = useState(currentAssignment.due ? new Date(currentAssignment.due) : new Date())
  const [avaliable, setAvaliable] = useState(currentAssignment.avaliable ? new Date(currentAssignment.avaliable) : new Date())
  const [until, setUntil] = useState(currentAssignment.until ? new Date(currentAssignment.until) : new Date())

  const saveAssignment = async (assignment: any) => 
    {await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  }

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { title: title, course: cid };
    const assignment = await courseClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
  };

  const handleSave=() => {
    if (currentAssignment._id) {
      saveAssignment({...currentAssignment,
        title,
        description,
        points,
        due,
        avaliable,
        until}
      );
    }
    else {
      createAssignmentForCourse();
    }
  }

  return (
      <div id="wd-assignments-editor"  className="container">
          <form>
          <div className="mb-4">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          </div>
          <div className="mb-4">
          
          <input id="wd-name" defaultValue = {title} className="form-control rounded-0"
            onChange={(e) => setAssignmentTitle(e.target.value)}/>
          </div>

          <div className="mb-4">
          
            <textarea id="wd-description" rows={6} className="form-control rounded-0" 
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

        <div className="row mb-4">
          <div className="col-4">
          <label htmlFor="wd-points"  className="form-label float-end">Points</label>
          </div>
          <div className="col-8">
          <input id="wd-points" className="form-control rounded-0" defaultValue={points} 
            onChange={(e) => setPoints(parseFloat(e.target.value))}/>
          </div>
        </div>
        
        <div className="row mb-4">
          <div className="col-4">
          <label htmlFor="wd-group" className="form-label float-end">Assignment Group</label>
          </div>
          <div className="col-8">
          <select id="wd-group" className="form-select rounded-0">
                <option>
                    ASSIGNMENTS
                </option>
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-4">
          <label htmlFor="wd-group" className="form-label float-end">Display Grade as</label>
          </div>
          <div className="col-8">
          <select id="wd-group" className="form-select rounded-0">
                <option>
                Percentage
                </option>
            </select>
          </div>
        </div>
      
        <div className="row mb-4">
          <div className="col-4">
            <label htmlFor="wd-group" className="form-label float-end">Submission Type</label>
          </div>

          <div className="col-8 border p-4 rounded-0">
            <div className="mb-3">
              <select id="wd-group" className="form-select rounded-0">
                  <option>
                  Online
                  </option>
              </select></div>

            <div className="mb-3">
              <h5><b>Online Entry Options</b></h5></div>

            <div className="form-check mb-3">
              <input type="checkbox" id="wd-text-entry" className="form-check-input"/>
              <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
            </div>
            
            <div className="form-check mb-3">
              <input type="checkbox" id="wd-website-url" className="form-check-input"/>
              <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
            </div>
            
            <div className="form-check mb-3">
              <input type="checkbox" id="wd-media-recordings" className="form-check-input"/>
              <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" id="wd-student-annotation" className="form-check-input"/>
              <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" id="wd-file-upload" className="form-check-input"/>
              <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-4">
          <label htmlFor="wd-group" className="form-label float-end">Assign</label>
          </div>
          <div className="col-8 rounded-0 border p-4">
            <h5><b>Assign to</b></h5>
            <div className="mb-4">
            <select id="wd-group" className="form-select rounded-0">
              <option selected> Everyone</option>
              </select>
          </div>

          <div className="mb-4">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <div className="input-group">
          <input type="date"
                            id="wd-due-date" defaultValue={dateObjectToHtmlDateString(due)}
                            onChange={(e)=>setDueDate(new Date(e.target.value))} className="form-control"/>
          
          </div>
          </div>

          <div className="mb-4">
            <div className="row">
              <div className="col-4">
              <label htmlFor="wd-available-from" className="form-label">Avaliable From</label>
            </div>
            <div className="col-4">
            <label htmlFor="wd-available-untile" className="form-label">Until</label>
            </div>
            </div>
            
            <div className="row">
              <div className="col-4">
                <div className="input-group"><input type="date"
                            id="wd-due-date"
                            defaultValue={dateObjectToHtmlDateString(avaliable)}
                            onChange={(e)=>setAvaliable(new Date(e.target.value))}  className="form-control"/>
                            </div>
             </div>
              <div className="col-4">
                <div className="input-group">
                  <input type="date"
                            id="wd-available-untile"className="form-control"
                            defaultValue={dateObjectToHtmlDateString(until)}
                            onChange={(e)=>setUntil(new Date(e.target.value))} /> 
                </div>
              
            </div>
         
          </div></div>
        </div>
        </div>
        <hr />
        <div >
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>

           {/*(<button onClick={()=> 
                {dispatch(updateAssignment({...existAssignment, title: title, 
                description: description,
                points: points,
                due: dueDate,
                avaliable: avaliable,
                until: until,
                course:cid}));}}
                className="btn  btn-danger me-1 float-end rounded-0">Save</button>)*/}

          {/* existAssignment._id === aid ? <button onClick={()=> 
                {dispatch(updateAssignment({...existAssignment, title: title, 
                description: description,
                points: points,
                due: dueDate,
                avaliable: avaliable,
                until: until,
                course:cid}));}}
                className="btn  btn-danger me-1 float-end rounded-0">Save</button>
                : (<button onClick={()=> dispatch(addAssignment({...assignments, title: title, 
                    description: description,
                    points: points,
                    due: dueDate,
                    avaliable: avaliable,
                    until: until,
                    course:cid
                  }))}className="btn  btn-danger me-1 float-end rounded-0">Save</button>)*/}
            
            <button type="button" 
                    onClick={handleSave}
                    className="btn  btn-danger me-1 float-end rounded-0">Save</button>
            
            <button className="btn btn-secondary me-1 float-end rounded-0">Cancel</button> 
          </Link>
        </div>
        </form>
        </div>
       );}