import React, { useEffect, useState } from 'react';
import QuizzesControls from "./QuizzesControls";
import { VscTriangleDown } from "react-icons/vsc";
import { IoRocketOutline } from "react-icons/io5";
import SingleQuizButtons from "./SingleQuizButtons";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {BsGripVertical} from "react-icons/bs";
import { addQuiz } from './reducer';

export default function Quizzes() {
    const { cid } = useParams(); // Get the course ID from the URL

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentDate = new Date();
    const [newQuizId, setNewQuizId] = useState<string | null>(null);

    // Get quizzes and questions from the store using useSelector with inline type assertion
    const quizzes = useSelector((state) => (state as any).quizzesReducer.quizzes);

    const questions = useSelector((state) => (state as any).quizzesReducer.questions);
    const currentUser = useSelector((state) => (state as any).accountReducer.currentUser);

    // Filter quizzes by the current course ID
    const courseQuizzes = quizzes.filter((quiz: any) => quiz.course === cid);

    // Use Effect to monitor the addition of a new quiz
    useEffect(() => {
        if (newQuizId) {
            const quizExists = quizzes.some((quiz: any) => quiz._id === newQuizId);
            if (quizExists) {
                // Navigate to the new quiz detail page once it exists in the state
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizId}`);
                setNewQuizId(null);
            }
        }
    }, [quizzes, newQuizId, navigate, cid]);

    // Function to handle adding a new quiz
    const addNewQuiz = () => {
        const newQuizId = new Date().getTime().toString(); // Generate a unique ID
        const newQuiz = {
            _id: newQuizId,
            course: cid || "",
            title: "Unnamed Quiz",
            type: "Graded Quiz",
            points: 0,
            assignmentGroup: "QUIZZES",
            published: false,
            description: "",
            cloneable: false,
            shuffleAnswer: true,
            timeLimit: "20",
            allowMultiAttempts: false,
            numberOfAttempts: 1,
            showCorrectAnswers: "Immediately",
            oneQuestionaTime: true,
            accessCode: "",
            webCam: false,
            lockQuestionsAfterAnswering: false,
            availableFromDate: new Date().toISOString().split('T')[0],
            dueDate: new Date().toISOString().split('T')[0],
            availableUntilDate: new Date().toISOString().split('T')[0],
        };

        // Dispatch the action to add the new quiz to the Redux state
        dispatch(addQuiz(newQuiz));

        // Logic to add quiz using Redux would be added here, for now we'll navigate
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuizId}`);
    };

    // Function to determine quiz availability status
    const getAvailabilityStatus = (quiz: any) => {
        const availableFromDate = new Date(quiz.availableFromDate);
        const availableUntilDate = new Date(quiz.availableUntilDate);

        if (currentDate < availableFromDate) {
            return {status: "Not Available Until", isAvailable: false };
        } else if (currentDate >= availableFromDate && currentDate <= availableUntilDate) {
            return { status: "Available", isAvailable: true };
        } else {
            return { status: "Closed", isAvailable: false };
        }
    };

    // Function to get the count of questions for a specific quiz
    const getQuestionsCount = (quizId: string) => {
        return questions.filter((question: any) => question.quiz === quizId).length;
    };

    const getPublishedStatus = (quiz: any) => {
        return quiz.published;
    };

    // Sorted Quizzes
    const [sortedCriteria, setSortedCriteria] = useState<"Name" | "DueDate" | "AvailableDate" | null>(null);

    const sortedQuizzes = [...courseQuizzes].sort((a,b) => {
        if (sortedCriteria === "Name") {
            return a.title.localeCompare(b.title);
        } 
        if (sortedCriteria === "DueDate") {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } 
        if (sortedCriteria === "AvailableDate") {
            return new Date(a.availableFromDate).getTime() - new Date(b.availableFromDate).getTime();
        } 
        return 0;
    });

    return (
        <div className="container-fluid">
            <div id="wd-quizzes">
                {currentUser?.role === "FACULTY" && (
                    <QuizzesControls addNewQuiz={addNewQuiz} />
                )}
                <br />
                <hr />
                <br />

                {/* Conditional Rendering */}
                {courseQuizzes.length === 0 ? (
                    <div className="alert alert-warning" role="alert">
                        <b>Click the '+ Quiz' button to Create a New Quiz !!!!</b>
                    </div>
                ) : (
                    <ul id="wd-assignment-list" className="list-group rounded-0 w-100">
                        <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                <VscTriangleDown className="me-2 fs-5" />
                                <span style={{ fontWeight: "bold", color: "black" }}>ASSIGNMENTS QUIZZES</span>
                            </div>

                            {/* Dynamic List of Quizzes */}
                            <ul className="wd-lessons list-group rounded-0">
                                {sortedQuizzes.map((quiz: any) => {
                                    const { status, isAvailable } = getAvailabilityStatus(quiz);
                                    const questionCount = getQuestionsCount(quiz._id);
                                    return (
                                        <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
                                            <div className="d-flex justify-content-between align-items-center">
                                           
                                                <div className="d-flex align-items-center">
                                                    <BsGripVertical className="me-3 fs-3 text-success" />
                                                    <IoRocketOutline className="me-4 fs-3 text-success" />
                                                </div>

                                                {/* Quiz Details */}
                                                <div className="text-left flex-grow-1">
                                                    <a
                                                        className="wd-assignment-link"
                                                        href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                                                        style={{ textDecoration: "none", color: "black" }}
                                                    >
                                                        {quiz.title}
                                                    </a>
                                                    <br />
                                                    {/* Availability, Due Date, Points, and Questions Count */}
                                                    <div>
                                                        {status === "Not Available Until" ?
                                                            (<><b>{status} </b>
                                                                {new Date(quiz.availableFromDate).toLocaleDateString("en-US", {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        hour: 'numeric',
                                                                        minute: 'numeric'
                                                                    })} </>)
                                                        : 
                                                            <b>{status} </b>}
                                                        |  
                                                            <b> Due </b>
                                                        {new Date(quiz.dueDate).toLocaleDateString("en-US", {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric'
                                                        })}
                                                        {" | "}
                                                        {quiz.points} <b>pts</b> | {questionCount} <b>Questions</b>
                                                    </div>
                                                </div>

                                                {/* Quiz Action Buttons with availability status */}
                                                {currentUser?.role === "FACULTY" && (
                                                    <SingleQuizButtons isPublished={getPublishedStatus(quiz)} quizId={quiz._id} />
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                )}
                <br />
            </div>
            {/* Sorted quizzes based on chosen criteria */}
            <div id="wd-sort-quizzes-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Which criteria do you want to choose? </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick = {() => setSortedCriteria("DueDate")}>
                                DueDate 
                            </button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                onClick = {() => setSortedCriteria("AvailableDate")}>
                                AvailableDate 
                            </button>
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                                onClick = {() => setSortedCriteria("Name")}>
                                Name 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
