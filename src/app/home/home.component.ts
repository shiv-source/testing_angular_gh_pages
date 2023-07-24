import { Component } from '@angular/core';
import { UtilsService } from '../services/utils.Service';
import { isNil } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private readonly utilsService: UtilsService, private readonly router: Router) {}

  startQuiz() {
    const quiz = this.utilsService.getQiz();
    const myQuiz = this.utilsService.getMyQuiz();
    if(!isNil(quiz)){
      this.utilsService.updateMyQuiz(quiz);
    }
    this.router.navigateByUrl('/question');
  }
}
