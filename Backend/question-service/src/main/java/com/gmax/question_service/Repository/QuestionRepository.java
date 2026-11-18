package com.gmax.question_service.Repository;

import com.gmax.question_service.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategory(String category);

    @Query(value = "SELECT q.id FROM question q Where q.category=:category ORDER BY RAND() LIMIT :numQ", nativeQuery = true)
    List<Long> findRandomQuestionsByCategory(String category, int numQ);
}
