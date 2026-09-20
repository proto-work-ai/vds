import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuizComponent } from '../../components/quiz.component';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuizComponent],
})
export class QuizPage {}
