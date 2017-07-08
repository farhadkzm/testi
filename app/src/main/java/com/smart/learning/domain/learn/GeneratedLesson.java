package com.smart.learning.domain.learn;

import com.smart.learning.domain.User;
import com.smart.learning.domain.util.StringBaseDateModel;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;

/**
 * Represents a term, Lesson is a group of contents customized
 * for a specific student and generated by our algorithms
 */
@Document(collection = "generated_lessons")
public class GeneratedLesson extends StringBaseDateModel {

    private static final long serialVersionUID = -6879130667532994415L;
    private User student;
    //subject that this lessons is linked to
    private Subject subject;
    @DBRef
    private List<Content> contents = new LinkedList<>();

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public List<Content> getContents() {
        return contents;
    }

    public void setContents(List<Content> contents) {
        this.contents = contents;
    }

}
