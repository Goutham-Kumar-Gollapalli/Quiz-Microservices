import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizQuestion = () => {

    // Get quiz ID from URL: /quiz/get/5
    const { id } = useParams();

    // Current question number
    const [index, setIndex] = useState(1);

    const [question, setQuestion] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:8091/quiz/get/${index}`)
            .then(response => response.json())
            .then(data => {
                setQuestion(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, [index]);

    function nextHandle() {
        setIndex(index + 1);
    }

    function prevHandle() {
        if (index > 1) {
            setIndex(index - 1);
        }
    }

    if (question === null) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h2>
                Question {index}: {question.title}
            </h2>

            <div>
                <input type="radio" name="answer" />
                {question.option1}
            </div>

            <div>
                <input type="radio" name="answer" />
                {question.option2}
            </div>

            <div>
                <input type="radio" name="answer" />
                {question.option3}
            </div>

            <div>
                <input type="radio" name="answer" />
                {question.option4}
            </div>

            <button
                onClick={prevHandle}
                disabled={index === 1}
            >
                Prev
            </button>

            <button onClick={nextHandle}>
                Next
            </button>

        </div>
    );
};

export default QuizQuestion;
