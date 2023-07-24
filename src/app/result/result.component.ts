import { Component } from '@angular/core';
import { UtilsService } from '../services/utils.Service';
import { Quiz } from '../interfaces/quiz.interface';
import { Question } from '../interfaces/question.interface';
import { isNil } from 'lodash';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  questions: Question[] = [];
  correctQuestions: Question[] = [];
  incorrectQuestions: Question[] = [];

  constructor(private utilsService: UtilsService) {
    const myQuiz = this.utilsService.getMyQuiz();
    if (!isNil(myQuiz) && myQuiz.questions.length) {
      this.questions = myQuiz.questions.reverse();
      this.correctQuestions = this.questions.filter((q) => q.isAnswerCorrect);
      this.incorrectQuestions = this.questions.filter((q) => !q.isAnswerCorrect);
    }
  }
}
