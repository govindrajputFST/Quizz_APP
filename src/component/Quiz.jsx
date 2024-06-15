import React, { useEffect, useState } from 'react'
import styles from './Quiz.module.css'
import chemistry from './data/chemistry'
import physics from './data/physics'
import maths from './data/maths'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import wrong from "./data/wronganswer-37702.mp3"
import corr from "./data/rightanswer-95219.mp3"
import noans from "./data/notification-5-140376.mp3"

export default function Quiz() {
    const [ind, setInd] = useState(0);
    const navigate = useNavigate();
    let detail = { name: localStorage.getItem("name"), date: localStorage.getItem("date"), email: localStorage.getItem("email") };
    const [subject, setsubject] = useState({
        "category": "",
        "questions": [
            {
                "question": "",
                "options": [""],
                "correct_answer": ""
            },]
    });
    const [marks, setMarks] = useState(0);
    const [submit, setSubmit] = useState(true);
    const [correct, setCorrect] = useState("");
    const [answer, setAnswer] = useState("");
    const [total, setTotal] = useState(0);
    const [time, settime] = useState(30)

    useEffect(() => {
        let sub = localStorage.getItem("sub");

        if (localStorage.getItem("total") !== null) {
            setTotal(parseInt(localStorage.getItem("total")))
        }
        if (sub === "Maths") {
            setsubject(maths)
        }
        else if (sub === "Physics") {
            setsubject(physics)
        }
        else if (sub === "Chemistry") {
            setsubject(chemistry)
        }
        if (localStorage.getItem("time") !== null) {
            settime(localStorage.getItem("time"));
        }
    }, [])
    function play(sound) {
        new Audio(`${sound}`).play();
    }
    useEffect(() => {
        setCorrect(subject.questions[ind].correct_answer);
        window.history.pushState({}, undefined, "/quiz");
        setInd(parseInt(localStorage.getItem("index")))
        setMarks(parseInt(localStorage.getItem("marks")))
        if (localStorage.getItem('last') === "yes") {
            handlesubmit();
        }
        
    })
    function handleNext() {
        if (submit) {
            setSubmit(false)
            for (let i = 1; i <= 4; i++) {
                if (document.getElementById(`opt${i}`).innerText === answer) {
                    document.getElementById(`opt${i}`).style.backgroundColor = "red"
                }
                if (document.getElementById(`opt${i}`).innerText === correct) {
                    document.getElementById(`opt${i}`).style.backgroundColor = "lightgreen"
                }
            }
            if (answer === correct) {
                setTotal(total + 2)
                localStorage.setItem("marks", marks + 2)
                success("Right Answer '+2 Marks' ")
                play(corr)
            }
            else if (answer !== "" && answer !== correct) {
                localStorage.setItem("marks", marks - 1)
                setTotal(total - 1)
                error("Wrong Answer '-1 Marks' ")
                play(wrong)
            }
            else if (answer === "") {
                warning("You Won't Get Marks For This")
                play(noans)
            }
            setTimeout(() => {
                if (ind < 9) {
                    setInd(ind + 1);
                    localStorage.setItem("index", ind + 1)
                    setSubmit(true)
                    settime(30)
                }
                if (ind === 9) {
                    handlesubmit();
                }
                white()
                setAnswer("")
            }, 1000)
        }

    }
    function handleAnswer(e) {
        e.preventDefault();
        if (submit) {
            if (answer === document.getElementById(e.target.id).innerText) {
                document.getElementById(e.target.id).style.backgroundColor = "white"
                setAnswer("")
            }
            else {
                white();
                document.getElementById(e.target.id).style.backgroundColor = "#ddab5d"
                setAnswer(document.getElementById(e.target.id).innerText)
            }
        }

    }
    function white() {
        document.getElementById("opt1").style.backgroundColor = "white"
        document.getElementById("opt2").style.backgroundColor = "white"
        document.getElementById("opt3").style.backgroundColor = "white"
        document.getElementById("opt4").style.backgroundColor = "white"
    }
    function handlesubmit() {
        if (submit) {
            setSubmit(false);
            document.getElementById('result').style.visibility = 'visible'
            localStorage.setItem("total", `${total}`);
            localStorage.setItem("last", "yes");
            localStorage.removeItem("time");
        }
    }
    function handleMenu(e) {
        e.preventDefault();
        localStorage.setItem("total", `${total}`)
        localStorage.setItem("last", "no")
        navigate("/");
    }
    const warning = (message) => {
        toast.warning(message, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const error = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const success = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    useEffect(() => {
        
        if (time !== 0 && submit) {
            setTimeout(() => {
                if (time !== 0 && submit) {
                    settime(time - 1);
                    localStorage.setItem("time", time-1);
                }
            }, 1000);
        }
        if (time === 0) {
            error("Your Time is Up")
            handleNext();
        }
        if(time===10){
            warning("Only 10 second remaining")
        }
        if (time <= 10) {
            document.getElementById("time").style.backgroundColor = "red";
        }
        else {
            document.getElementById("time").style.backgroundColor = "black";
        }
    }, [time])
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className={styles.box}>
                <div className={styles.marks}>
                    <div className={styles.ques}><span className={styles.numb}> Ques : </span>{ind + 1}</div>
                    <div className={styles.quizname}>Quiz Time</div>
                    <div className={styles.mar}><span className={styles.numb}>Marks : </span>{marks}</div>
                </div>
                <div className={styles.quizbox}>
                    <input type="range" className={styles.range} value={ind + 1} max={10} />
                    <div className={styles.questions}>
                        <div className={styles.question}>{subject.questions[ind].question}</div>
                    </div>
                    <div className={styles.options}>
                        <div className={styles.row}>
                            <div className={styles.opt} onClick={handleAnswer} id="opt1">{subject.questions[ind].options[0]}</div>
                            <div className={styles.opt} onClick={handleAnswer} id="opt2">{subject.questions[ind].options[1]}</div>
                        </div>
                        <div className={styles.time} id='time'>{time}</div>
                        
                        <div className={styles.row}>
                            <div className={styles.opt} onClick={handleAnswer} id="opt3">{subject.questions[ind].options[2]}</div>
                            <div className={styles.opt} onClick={handleAnswer} id="opt4">{subject.questions[ind].options[3]}</div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={handlesubmit}>Submit</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                    <div className={styles.result} id='result'>
                        <div>
                            <div className={styles.cert}>CERTIFICATE</div>
                            <div className={styles.part}>OF PARTICIPATION</div>
                            <div>PROUDLY REPRESENTED TO</div>
                            <div className={styles.name}>{detail.name}</div>
                            <div className={styles.proud}>{subject.category} </div>
                            <div className={styles.proud}>{marks} / 20 ({marks >= 10 ? "Passed" : "Failed"})</div>
                            <div className={styles.succ}>For Successfully Using Quiz Time App</div>
                            <div className={styles.comp}>Competition ({new Date().toDateString()}) </div>
                            <div>We Acknowledge Your Effort Keep Participating</div>
                        </div>
                        <div className={styles.sign}>
                            <div>Govind Rajput</div>
                            <button onClick={handleMenu}>Go To Main Menu</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}