import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, catchError, switchMap } from "rxjs/Operators";

import * as toppingsAction from "../actions/toppings.action";
import * as fromServices from "../../services/toppings.service";
import { Action } from "@ngrx/store/src/models";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsAction.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingService.getToppings().pipe(
        map(toppings => {
          console.log(toppings);
          return new toppingsAction.LoadToppingsSuccess(toppings);
        }),
        catchError(error => {
          console.log(error);
          return of(new toppingsAction.LoadToppingsFail(error));
        })
      );
    })
  );
}
