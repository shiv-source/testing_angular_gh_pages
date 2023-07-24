import { Injectable } from '@angular/core';
import { Quiz } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getQiz(): Quiz | null {
    const quiz = localStorage.getItem('quiz');
    if (quiz) {
      const quizObj: Quiz = JSON.parse(quiz);
      return quizObj;
    } else {
      return null;
    }
  }

  updateQuiz(quiz: Quiz): void {
    localStorage.setItem('quiz', JSON.stringify(quiz));
  }

  getMyQuiz(): Quiz | null {
    const quiz = sessionStorage.getItem('myQuiz');
    if (quiz) {
      const quizObj: Quiz = JSON.parse(quiz);
      return quizObj;
    } else {
      return null;
    }
  }

  updateMyQuiz(quiz: Quiz): void {
    sessionStorage.setItem('myQuiz', JSON.stringify(quiz));
  }
}
