package com.gmax.question_service.controller;

import com.gmax.question_service.model.Question;
import com.gmax.question_service.model.QuestionWrapper;
import com.gmax.question_service.model.Response;
import com.gmax.question_service.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/add")
    public void addQuestion(@RequestBody Question question){
        questionService.addQuestion(question);
    }

    @GetMapping("/all")
    public List<Question> getQuestions(){
        return questionService.getAll();
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> findByCategory(@PathVariable String category){
        return questionService.findByCategory(category);
    }
    @GetMapping("generate")
    public ResponseEntity<List<Long>> getQuestionsForQuiz
            (@RequestParam String categoryName, @RequestParam Integer numQuestions ){
        return questionService.getQuestionsForQuiz(categoryName, numQuestions);
    }

    @PostMapping("getQuestions")
    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Long> questionIds){
//        System.out.println(environment.getProperty("local.server.port"));
        return questionService.getQuestionsFromId(questionIds);
    }

    @PostMapping("getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses)
    {
        return questionService.getScore(responses);
    }


    // generate
    // getQuestions (questionid)
    // getScore

}
