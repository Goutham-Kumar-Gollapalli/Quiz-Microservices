package com.gmax.quiz_service.service;

import com.gmax.quiz_service.Feign.QuizInterface;
import com.gmax.quiz_service.Repository.QuizRepository;
import com.gmax.quiz_service.model.QuestionWrapper;
import com.gmax.quiz_service.model.Quiz;
import com.gmax.quiz_service.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    @Autowired
    QuizRepository quizRepository;

    @Autowired
    QuizInterface quizInterface;

    public ResponseEntity<Quiz> createQuiz(String category, Integer numQ, String title) {
        if (category == null || category.isBlank() || title == null || title.isBlank() || numQ == null || numQ <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Long> questions = quizInterface.getQuestionsForQuiz(category, numQ).getBody();
        if (questions == null || questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestionsIds(questions);
        return new ResponseEntity<>(quizRepository.save(quiz), HttpStatus.CREATED);
    }

    public ResponseEntity<List<Quiz>> getAll() {
        return new ResponseEntity<>(quizRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuestions(Long id) {
        Quiz q = quizRepository.findById(id).get();
        List<Long> questionsIds = q.getQuestionsIds();

        ResponseEntity<List<QuestionWrapper>> questions = quizInterface.getQuestionsFromId(questionsIds);
        return questions;
     }

    public ResponseEntity<Integer> getScore(Long id, List<Response> responses) {
        ResponseEntity<Integer> score=quizInterface.getScore(responses);
        return score;
    }
}
