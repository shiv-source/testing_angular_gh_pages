import { Question } from 'src/app/interfaces/question.interface';
import { Quiz } from 'src/app/interfaces/quiz.interface';

const questions: Question[] = [
  {
    id: '13482086c-cf68-420d-950d-169a197b08c9',
    questionText: 'This photograph, ____ I took five years ago, shows the harbour quite well.',
    options: [
      {
        value: 'who',
        isCorrect: false,
      },
      {
        value: 'when',
        isCorrect: true,
      },
      {
        value: 'which',
        isCorrect: false,
      },
      {
        value: 'what',
        isCorrect: false,
      },
    ],
  },
  {
    id: '28cfbac2-c205-45e7-8fde-17b68ed93cce',
    questionText: 'The patient ____ by the doctor.',
    options: [
      {
        value: 'has being examined',
        isCorrect: false,
      },
      {
        value: 'when',
        isCorrect: false,
      },
      {
        value: 'which',
        isCorrect: true,
      },
      {
        value: 'what',
        isCorrect: false,
      },
    ],
  },
];

export const defaultQuiz: Quiz = {
  totalTime: 60,
  questions: questions,
};
