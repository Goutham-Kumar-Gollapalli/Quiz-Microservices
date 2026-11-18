package com.gmax.quiz_service.service;

import com.gmax.quiz_service.Feign.QuizInterface;
import com.gmax.quiz_service.Repository.QuizRepository;
import com.gmax.quiz_service.model.Question;
import com.gmax.quiz_service.model.QuestionWrapper;
import com.gmax.quiz_service.model.Quiz;
import com.gmax.quiz_service.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    QuizRepository quizRepository;

    @Autowired
    QuizInterface quizInterface;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Long>questions= quizInterface.getQuestionsForQuiz(category,numQ).getBody();
        Quiz q=new Quiz();
        q.setTitle(title);
        q.setQuestionsIds(questions);
        quizRepository.save(q);
        return new ResponseEntity<>("successfully created quiz", HttpStatus.OK);
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
