import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { mockupById } from '../mockups';

@Component({
  selector: 'app-mockup-description',
  imports: [RouterLink],
  templateUrl: './description.html',
  styleUrl: './description.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockupDescription {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    {
      initialValue: '',
    },
  );

  protected readonly mockup = computed(() => mockupById(this.id()));
  protected readonly description = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id') ?? ''),
      switchMap((id) => {
        const entry = mockupById(id);
        if (!entry?.descriptionPath) return of('Описание переноса ещё не добавлено.');

        return this.http.get(entry.descriptionPath, { responseType: 'text' }).pipe(
          catchError(() => of('Не удалось загрузить landing.md.')),
          startWith('Загрузка описания…'),
        );
      }),
    ),
    { initialValue: 'Загрузка описания…' },
  );
}
