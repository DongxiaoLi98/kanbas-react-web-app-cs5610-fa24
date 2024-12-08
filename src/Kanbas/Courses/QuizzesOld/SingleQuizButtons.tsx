import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import UnpublishedMark from "./UnpublishedMark";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteQuiz, updateQuiz, addQuiz } from "./reducer";
import { courses } from "../../Database";

// Define the type for the component props
interface SingleQuizButtonsProps {
  isPublished: boolean;
  quizId: string;
}

export default function SingleQuizButtons({ isPublished, quizId}: SingleQuizButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get quizzes from the Redux store
  const quizzes = useSelector((state) => (state as any).quizzesReducer.quizzes);

  // Find the specific quiz in the Redux store
  const quiz = quizzes.find((q: any) => q._id === quizId);

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Handle the "Edit" action
  const handleEdit = () => {
    if (quiz) {
      navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/edit`);
    }
  };

  // Handle the "Delete" action
  const handleDelete = () => {
    if (quiz) {
      dispatch(deleteQuiz(quiz._id));
    }
  };

  // Handle the "Publish/Unpublish" action
  const handleTogglePublish = () => {
    if (quiz) {
      dispatch(updateQuiz({ ...quiz, published: !quiz.published }));
    }
  };

  // Handle the "Copy" action
  const [targetCourseId, setTargetCourseId] = useState("");
  const handleCopy = () => {
    if (quiz && targetCourseId) {
      const newQuiz = {
        ...quiz,
        _id: new Date().getTime().toString(), // Generate a new unique ID
        course: targetCourseId,
        title: `${quiz.title} (Copy)`,
      };
      dispatch(addQuiz(newQuiz));
      alert(`Quiz copied to Course Id: ${targetCourseId}`);
    }
  };

  return (
    <div className="float-end position-relative">
      {/* Conditionally render the checkmark based on availability */}
      {/*isAvailable ? <GreenCheckmark /> : <GrayCheckmark />*/}
      {isPublished ? <GreenCheckmark /> : <UnpublishedMark />}

      {/* Dropdown Trigger */}
      <IoEllipsisVertical
        className="fs-4 dropdown-toggle"
        style={{ cursor: "pointer" }}
        onClick={toggleDropdown}
      />

      {/* Dropdown Menu */}
      {showDropdown && (
        <ul className="dropdown-menu show position-absolute end-0 mt-2">
          <li className="dropdown-item" onClick={handleEdit}>
            Edit
          </li>
          <li className="dropdown-item" onClick={handleDelete}>
            Delete
          </li>
          <li className="dropdown-item" onClick={handleTogglePublish}>
            {quiz?.published ? "Unpublish" : "Publish"}
          </li>
          <li className="dropdown-item"
              data-bs-toggle="modal" data-bs-target="#wd-copy-quizzes-dialog">
            Copy
          </li>
          <li className="dropdown-item" 
            data-bs-toggle="modal" data-bs-target="#wd-sort-quizzes-dialog">
            Sort
          </li>
        </ul>
      )}

        <div id="wd-copy-quizzes-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Copy Quiz </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-footer">
                          <label htmlFor="selectCourses"> Select Target Courses: </label>
                          <select id="selectCourses" className="form-select" value={targetCourseId}
                                  onChange={(e)=>setTargetCourseId(e.target.value)}>
                            <option value="">Select the Course Id</option>
                            {courses.map((course : any) => (
                              <option key={course._id} value={course._id}>
                                {course.name} (ID: {course._id})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                Cancel 
                            </button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick = {handleCopy}
                                disabled={!targetCourseId}>
                                Copy 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}
