import { Option } from './option.interface';

export interface Question {
  id: string;
  questionText: string;
  options: Option[];
  answer?: string;
  isAnswerCorrect?: boolean;
}
