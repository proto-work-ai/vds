import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { appRoutePath } from '../../app.routes';

@Component({
  selector: 'app-article-list',
  templateUrl: 'article-list.component.html',
  styleUrl: 'article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class ArticleListComponent {
  protected readonly articles = toSignal(inject(ArticleService).getAll());
  protected appRoute = appRoutePath;
}
