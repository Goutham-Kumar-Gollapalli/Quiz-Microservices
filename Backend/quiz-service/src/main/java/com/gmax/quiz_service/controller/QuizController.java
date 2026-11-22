package com.gmax.quiz_service.controller;


import com.gmax.quiz_service.model.QuestionWrapper;
import com.gmax.quiz_service.model.Quiz;
import com.gmax.quiz_service.model.QuizDto;
import com.gmax.quiz_service.model.Response;
import com.gmax.quiz_service.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class QuizController {
    @Autowired
    QuizService quizService;
    @PostMapping("create")
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizDto quizDto){
        return quizService.createQuiz(quizDto.getCategory(), quizDto.getNumQ(), quizDto.getTitle());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Quiz>> getAll() {
        return quizService.getAll();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizById(@PathVariable Long id){
        return quizService.getQuestions(id);
    }
    @PostMapping("/submit/{id}")
    public ResponseEntity<Integer>submitQuiz(@PathVariable Long id,@RequestBody List<Response> responses)
    {
        return quizService.getScore(id,responses);
    }
}
