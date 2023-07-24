import { Component, OnInit } from '@angular/core';
import { Question } from '../interfaces/question.interface';
import { Quiz } from '../interfaces/quiz.interface';
import { UtilsService } from '../services/utils.Service';
import { isNil } from 'lodash';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { defaultQuiz } from '../schema/quiz';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  quiz: Quiz | undefined;
  questions: Question[] = [];
  currentQuestion: Question | undefined;
  questionNumber = 1;
  currentQuestionIndex = 0;
  quizTotalTime = 0;

  constructor(private readonly utilsService: UtilsService, private readonly router: Router) {
    let quiz = this.utilsService.getQiz();
    let myQuiz = this.utilsService.getMyQuiz();
    if (!isNil(quiz)) {
      if (!isNil(myQuiz)) {
        this.quiz = myQuiz;
      } else {
        this.utilsService.updateMyQuiz(quiz);
      }
    } else {
      this.utilsService.updateQuiz(defaultQuiz);
      quiz = this.utilsService.getQiz();
      if (quiz) {
        this.utilsService.updateMyQuiz(quiz);
        myQuiz = this.utilsService.getMyQuiz();
        if (myQuiz) this.quiz = myQuiz;
      }
    }
  }
  ngOnInit(): void {
    if (!isNil(this.quiz)) {
      this.quizTotalTime = this.quiz.totalTime;
      if (this.quiz.questions?.length) {
        this.questions = this.quiz.questions.reverse();
        this.currentQuestion = this.questions[0];
      }
    }
  }

  selectOption(currentQuestion: Question, value: string, index: number) {
    console.log(currentQuestion, value);
    if (currentQuestion) {
      const questions = this.questions.map((q) => {
        let isAnswerCorrect = false;
        const correctOption = q.options.find((option) => option.isCorrect);

        if (q.id === currentQuestion.id) {
          if (!isNil(correctOption) && correctOption?.value === value) {
            isAnswerCorrect = true;
          }

          return { ...q, answer: value, isAnswerCorrect };
        } else {
          return q;
        }
      });

      this.questions = questions;
    }
  }
  previousQuestion(index: number) {
    const previousIndex = index - 1;

    if (previousIndex < 0) {
      return;
    }
    const previousQuestion = this.questions[previousIndex];
    this.currentQuestion = previousQuestion;
    this.currentQuestionIndex = previousIndex;
    this.questionNumber = previousIndex + 1;
  }
  nextQuestion(index: number) {
    const nextIndex = index + 1;
    if (nextIndex > this.questions.length - 1) {
      return;
    }
    const nextQuestion = this.questions[nextIndex];
    this.currentQuestion = nextQuestion;
    this.currentQuestionIndex = nextIndex;
    this.questionNumber = nextIndex + 1;
  }

  onSubmit() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to sumit this quiz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!isNil(this.quiz)) {
          this.utilsService.updateMyQuiz({ ...this.quiz, questions: this.questions.reverse() });
        }
        Swal.fire('Submitted!', 'Your quiz has been submitted.', 'success').then(() => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/result');
          }
        });
      }
    });
  }
}
