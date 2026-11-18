package com.gmax.question_service.model;
import jakarta.persistence.*;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String questionTitle;
    @Column(nullable = false)
    private String option1;
    @Column(nullable = false)
    private String option2;
    @Column(nullable = false)
    private String option3;
    @Column(nullable = false)
    private String option4;
    @Column(nullable = false)
    private String correctAnswer;
    private String category;
}
