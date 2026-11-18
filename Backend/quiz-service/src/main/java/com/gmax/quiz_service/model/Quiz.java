package com.gmax.quiz_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @ElementCollection
    private List<Long> questionsIds;
}
