import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/Observable/of";
import { map, switchMap, catchError } from "rxjs/operators";

import * as fromRoot from "../../../app/store";
import * as PizzasActions from "../actions/pizzas.action";
import * as fromService from "../../services";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromService.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(PizzasActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(
          map(pizzas => new PizzasActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new PizzasActions.LoadPizzasFail(error)))
        );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(PizzasActions.CREATE_PIZZA).pipe(
    map((action: PizzasActions.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .createPizza(pizza)
        .pipe(
          map(pizza => new PizzasActions.CreatePizzaSuccess(pizza)),
          catchError(error => of(new PizzasActions.CreatePizzaFail(error)))
        );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(PizzasActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: PizzasActions.CreatePizzaSuccess) => action.payload),
      map(
        pizza =>
          new fromRoot.Go({
            path: ["/products", pizza.id]
          })
      )
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(PizzasActions.UPDATE_PIZZA).pipe(
    map((action: PizzasActions.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .updatePizza(pizza)
        .pipe(
          map(pizza => new PizzasActions.UpdatePizzaSuccess(pizza)),
          catchError(error => of(new PizzasActions.UpdatePizzaFail(error)))
        );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(PizzasActions.REMOVE_PIZZA).pipe(
    map((action: PizzasActions.RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService
        .removePizza(pizza)
        .pipe(
          map(() => new PizzasActions.RemovePizzaSuccess(pizza)),
          catchError(error => of(new PizzasActions.RemovePizzaFail(error)))
        );
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      PizzasActions.REMOVE_PIZZA_SUCCESS,
      PizzasActions.UPDATE_PIZZA_SUCCESS
    )
    .pipe(map(pizza => new fromRoot.Go({ path: ["/products"] })));
}
