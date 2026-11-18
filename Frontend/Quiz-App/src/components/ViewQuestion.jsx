import React, { useEffect, useState } from "react";

const ViewQuestion = () => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8091/question/all")
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, []);

    return (
        <div>

            <h1>All Questions</h1>

            {questions.map((item) => (

                <div key={item.id}>

                    <h2>
                        Question: {item.questionTitle}
                    </h2>

                    <p>Option 1: {item.option1}</p>

                    <p>Option 2: {item.option2}</p>

                    <p>Option 3: {item.option3}</p>

                    <p>Option 4: {item.option4}</p>

                    <hr />

                </div>

            ))}

        </div>
    );
};

export default ViewQuestion;
