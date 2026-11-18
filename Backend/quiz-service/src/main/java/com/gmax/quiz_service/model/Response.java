package com.gmax.quiz_service.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@RequiredArgsConstructor
public class Response {
    private Long quizId;
    private String response;
}
