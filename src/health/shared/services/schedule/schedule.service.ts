import { Injectable } from '@angular/core';

import { Store } from '../../../../store';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { tap, map } from 'rxjs/operators';

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  // schedule$: Observable<any[]> = this.date$
  //   .do((next: any) => this.store.set('date', next));

  schedule$: Observable<any[]> = this.date$
    .pipe(
        tap((next: any) => this.store.set('date', next))
    );

  constructor(
    private store: Store
  ) {}

  updateDate(date: Date) {
    this.date$.next(date);
  }

}
