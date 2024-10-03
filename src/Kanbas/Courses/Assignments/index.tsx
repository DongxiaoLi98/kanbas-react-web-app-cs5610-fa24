import React from "react";
import { FaCheckCircle} from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import {BsGripVertical} from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControl from "./AssignmentControl";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";

export default function Assignments() {
    return (
      <div id="wd-assignments" className="container">

      <AssignmentControl /> <br /><br /><br />

    
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
          <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ps-1">
            <div className="d-flex">
              <div>
                <BsGripVertical className="me-3 fs-3 text-success" />
              <GiNotebook className="me-3 fs-3 text-success" />
              </div>
              
                <div className="col container">
                    <a className="wd-assignment-link text-black"
                      href="#/Kanbas/Courses/1234/Assignments/123">
                      A1
                    </a>
                <div>
                  <span style={{color:"red"}}>Multiple Modules</span><span>| <b>Not Avaliable Until</b> May 6 at 12:00am|</span>
                </div >
              
              <b>Due</b> May 13 at 11:59pm | 100 pts
              </div>
            <div className="float-end me-3">
              <FaCheckCircle className="text-success me-3"/>
              <IoEllipsisVertical />
            </div>
            </div>
          </li>

          <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ps-1">
            <div className="d-flex">
              <div>
                <BsGripVertical className="me-3 fs-3 text-success" />
              <GiNotebook className="me-3 fs-3 text-success" />
              </div>
              
                <div className="col container">
                    <a className="wd-assignment-link text-black"
                      href="#/Kanbas/Courses/1234/Assignments/123">
                      A2
                    </a>
                <div>
                  <span style={{color:"red"}}>Multiple Modules</span><span>| <b>Not Avaliable Until</b> May 13 at 12:00am|</span>
                </div >
              
              <b>Due</b> May 20 at 11:59pm | 100 pts
              </div>
            <div className="float-end me-3">
              <FaCheckCircle className="text-success me-3"/>
              <IoEllipsisVertical />
            </div>
            </div>
          </li>

          <li className="wd-assignment-list-item wd-lesson list-group-item p-3 ps-1">
            <div className="d-flex">
              <div>
                <BsGripVertical className="me-3 fs-3 text-success" />
              <GiNotebook className="me-3 fs-3 text-success" />
              </div>
              
                <div className="col container">
                    <a className="wd-assignment-link text-black"
                      href="#/Kanbas/Courses/1234/Assignments/123">
                      A3
                    </a>
                <div>
                  <span style={{color:"red"}}>Multiple Modules</span><span>| <b>Not Avaliable Until</b> May 20 at 12:00am|</span>
                </div >
              
              <b>Due</b> May 27 at 11:59pm | 100 pts
              </div>
            <div className="float-end me-3">
              <FaCheckCircle className="text-success me-3"/>
              <IoEllipsisVertical />
            </div>
            </div>
          </li>
        </ul>
            </li>

        </ul>
      </div>
  );}
  