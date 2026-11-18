import React from 'react'
import { useState,useEffect} from 'react'
const Quiz = () => {
  const [question,setQuestion]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:8091/quiz/all")
    .then((res)=>res.json())
    .then((data)=>setQuestion(data))
    .catch((error)=>{
    console.log("error : ",error);
    });
},[]);
  console.log(question);
  
  
    return (
    <div>
        
    </div>
  )
}

export default Quiz