import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [sub,setSub]=useState("")
    const [detail,setDetail]=useState({name:"",date:"",email:""})

    const navigate=useNavigate();
    useEffect(()=>{
        window.history.pushState({}, undefined, "/");
        if(detail.date==="" || detail.date===null){
            document.getElementById("date").style.color="gray";
        }
        else{
            document.getElementById("date").style.color="black";
        }
        if(sub===""){
            document.getElementById("subject").style.color="gray";
        }
        else{
            document.getElementById("subject").style.color="black";
        }
    })
    useEffect(()=>{
        if(localStorage.getItem('name')!=="" || localStorage.getItem('date')!=="" || localStorage.getItem('email')!==""){
            setDetail({"name":localStorage.getItem('name'),
                        "date":localStorage.getItem('date'),
                        "email":localStorage.getItem('email')})
        }
    },[])
    function handleChange(e){
        e.preventDefault();
        setSub(e.target.value)
    }
    function handleClick(e){
        e.preventDefault();
        if(sub==="" || detail.name.trim()==="" || detail.date.trim()===""){
            alert("Fill The Details First")
        }
        else{
            if(localStorage.getItem('name')!==detail.name){
                localStorage.setItem("total",0);
            }
            localStorage.setItem("sub",sub);
            localStorage.setItem("name",detail.name);
            localStorage.setItem("date",detail.date);
            localStorage.setItem("email",detail.email);
            localStorage.setItem("index",0)
            localStorage.setItem("marks",0)
            localStorage.setItem("last","no")
            if(localStorage.getItem("time")!==null){
                localStorage.removeItem("time");
            }
            navigate("/quiz")
        }
    }
    function handleDetail(e){
        e.preventDefault();
        setDetail({...detail,[e.target.id]:e.target.value})
    }
    function handleClear(){
        localStorage.setItem("name","");
        localStorage.setItem("date","");
        localStorage.setItem("email","");
        localStorage.setItem("total",0);
        setDetail({name:"",date:"",email:""})
    }
    return (
        <div className={styles.box}>
        
                <div className={styles.marks}>
                <div className={styles.names}>{localStorage.getItem("name")===null || localStorage.getItem("name")===""?"Your Name":<span style={{ fontSize: '2.2vw',color:"aqua"}}>{localStorage.getItem("name")}</span>}</div>
                <div className={styles.quiznames}>Quiz Time</div>
                <div className={styles.quizscore}>Total : <span style={{ fontSize: '3vw',color:"aqua"}}>{localStorage.getItem("total")===null?"0":localStorage.getItem("total")}</span></div>
            </div>
            <form action="" className={styles.form}>
                {/* <div className={styles.quiz}>Quiz Time</div> */}
                <div><input type="text" onChange={handleDetail} id="name" placeholder='Enter Your Name' value={detail.name} className={styles.input}/></div>
                <div><input type="date" id='date' onChange={handleDetail} className={styles.inputdate} value={detail.date}/></div>
                <div><input type="email" id='email' onChange={handleDetail} placeholder='Enter Your Email' className={styles.inputemail} value={detail.email}/></div>
                <div>
                <select name="" id="subject" className={styles.option} onChange={handleChange}>
                    <option selected value="" disabled >Choose the Subject</option>
                    <option value="Maths">Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                </select>
                </div>
                <div>
                <button className={styles.subbtn} onClick={handleClick}>Start The Quiz</button>
                </div>
                <br />
                {detail.name!=="" && detail.name!==null?<button className={styles.subbtn} onClick={handleClear}>Reset</button>:""}
            </form>
        </div>
    )
}