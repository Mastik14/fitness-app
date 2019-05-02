import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from '../../../../store';

import { Observable, of } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`).valueChanges()
    .pipe(
        tap(result => this.store.set('meals', result))
    );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    console.log(this.authService.user.uid);
    return this.authService.user.uid;
  }

  getMeal(key: string) {
    if (!key) {
      return of({});
    }

    return this.store.select<Meal[]>('meals')
      .pipe(filter(Boolean), map(meals => meals.find((meal: Meal) => meal.$key === key)));
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }

}
