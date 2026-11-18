import React from 'react'
import { useState } from 'react'
const QuestionsForm = () => {
  const [question,setQuestion]=useState({
    questionTitle:"",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: ""
  });
  function handleChange(e){
    setQuestion({
        ...question,
        [e.target.name]:e.target.value
    });
    console.log("question : ",question);
}
    async function handleSubmit(e)
    {
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:8091/quiz/add",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(question)
            });
            if(!response.ok){
                console.log("failed to add the question");
            }
            else{
                console.log("added question successfully");
            }
        }
        catch(error){
            console.log(error);
            
        }
        console.log("final question : ",question);
    }
  
    return (
    <div>
        <form className='question-form' onSubmit={(e)=>handleSubmit(e)}>
            <h2 className='question'>Question</h2>
            <div>
                <label>Category</label>
                <input type="text" name='category' 
                onChange={handleChange}/>
            </div>
            <div className='question-title'>
                <label htmlFor="title">Question</label>
                <input type="text" name='questionTitle' 
                onChange={handleChange}/>
            </div>
            <div>
                <label>option 1</label>
                <input type="text" name='option1' onChange={(e)=>setQuestion({...question,option1:e.target.value})}/>
            </div>
            <div>
                <label>option 2</label>
                <input type="text" name='option2' onChange={handleChange}/>
            </div>
            <div>
                <label>option 3</label>
                <input type="text" name='option3' onChange={handleChange}/>
            </div>
            <div>
                <label>option 4</label>
                <input type="text" name='option4' onChange={handleChange}/>
            </div>
        
            <div>
                    <label>Correct Answer:</label>
                    <select
                        name="correctAnswer"
                        value={question.correctAnswer}
                        onChange={handleChange}
                    >
                        <option value="">Select Answer</option>
                        <option value={question.option1}>Option 1:{question.option1}</option>
                        <option value={question.option2}>Option 2:{question.option2}</option>
                        <option value={question.option3}>Option 3:{question.option3}</option>
                        <option value={question.option4}>Option 4::{question.option4}</option>
                    </select>
                </div>

            <button type='submit'>Add Question</button>
        </form>
    </div>
  )
}

export default QuestionsForm