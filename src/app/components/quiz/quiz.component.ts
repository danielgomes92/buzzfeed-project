import { Component } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz_questions.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMax: number = 0;
  finished: boolean = false;

  ngOnInit() {
    if (quiz_questions) {
      this.finished = false;
      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMax = this.questions.length;
    }
  }

  selectOption(value: string) {
    this.answers.push(value);
    this.nextQuestion();
  }

  async nextQuestion() {
    this.questionIndex++;
    if (this.questionIndex < this.questionMax) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalResult: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quiz_questions.results[
          finalResult as keyof typeof quiz_questions.results];
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((
      previous, current, index, arr) => {
        if (arr.filter((item) => item === previous).length >
            arr.filter((item) => item === current).length)
            {
              return previous;
            } else {
              return current;
            }
      }
    )
    return result;
  }
}
