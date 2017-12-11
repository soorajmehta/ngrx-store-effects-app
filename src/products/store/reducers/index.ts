import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPizzas from "./pizza.reducer";
import * as fromToppings from "./toppings.reducer";

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

export const reducres: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);
