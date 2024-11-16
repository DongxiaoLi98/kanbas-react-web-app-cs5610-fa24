import GreenCheckmark from "./GreenCheckmark";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import {BsGripVertical} from "react-icons/bs";
import { useParams } from "react-router";
import * as db from "../../Database";
import React, { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  //const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);
  
  const saveModule = async (module: any) => {  await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };




  const isFaculty = currentUser?.role === "FACULTY";
  
  {/*const addModule = () => {
    setModules([ ...modules, { _id: new Date().getTime().toString(),
                                     name: moduleName, course: cid, lessons: [] } ]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));};
  
  const updateModule = (module: any) => {
      setModules(modules.map((m) => (m._id === module._id ? module : m)));
    };*/}
  

    return (
      <div className="container">
       {isFaculty && ( <div><ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse} /></div>)}
        <br /><br /><br /><br />
        {/* Implement Collapse All button, View Progress button, etc. */}
        
        <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} 
              {!module.editing && module.name}
      { module.editing && (
        <input className="form-control w-50 d-inline-block"
               onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                  saveModule({ ...module, editing: false });
                 }
               }}
               defaultValue={module.name}/>
      )}

             { isFaculty && (<ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => removeModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}/>)}

            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </li>
                  ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>    

      </div>
  );}
  