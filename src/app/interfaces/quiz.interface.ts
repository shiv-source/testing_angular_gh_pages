import { Question } from './question.interface';

export interface Quiz {
  totalTime: number; //In minutes
  questions: Question[];
}
