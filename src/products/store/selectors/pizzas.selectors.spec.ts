import { TestBed } from "@angular/core/testing";
import { StoreModule, Store, combineReducers } from "@ngrx/store";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";

import * as fromRoot from "../../../app/store/reducers";
import * as fromReducers from "../reducers";
import * as fromActions from "../actions";
import * as fromSelectors from "../selectors/pizzas.selector";

import { Pizza } from "../../models/pizza.model";

describe("Pizzas Selector", () => {
  let store: Store<fromReducers.ProductsState>;
  const pizza1: Pizza = {
    id: 1,
    name: "Fish 'n Chips",
    toppings: [
      { id: 1, name: "fish" },
      { id: 2, name: "chips" },
      { id: 3, name: "cheese" }
    ]
  };

  const pizza2: Pizza = {
    id: 2,
    name: "Aloha",
    toppings: [
      { id: 1, name: "ham" },
      { id: 2, name: "pineapple" },
      { id: 3, name: "cheese" }
    ]
  };

  const pizza3: Pizza = {
    id: 3,
    name: "Burrito",
    toppings: [
      { id: 1, name: "beans" },
      { id: 2, name: "beef" },
      { id: 3, name: "rice" },
      { id: 4, name: "cheese" },
      { id: 5, name: "avocado" }
    ]
  };

  const pizzas = [pizza1, pizza2, pizza3];

  const entities = {
    1: pizzas[0],
    2: pizzas[1],
    3: pizzas[2]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducres)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe("getPizzaState", () => {
    it("shoould return state of the pizza store slice", () => {
      let result;

      store.select(fromSelectors.getPizzaState).subscribe(value => {
        result = value;
      });

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false
      });

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result).toEqual({
        entities,
        loading: false,
        loaded: true
      });
    });
  });

  describe("getPizzaEntities", () => {
    it("should return pizzas as entities", () => {
      let result;

      store.select(fromSelectors.getPizzasEntities).subscribe(v => {
        result = v;
      });

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result).toEqual(entities);
    });
  });

  describe("getSelectedPizza", () => {
    it("should return selected pizza", () => {
      let result, params;

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      store.dispatch({
        type: "ROUTER_NAVIGATION",
        payload: {
          routerState: {
            url: "/products",
            queryParams: {},
            params: { pizzaId: "2" }
          },
          event: {}
        }
      });

      store.select(fromRoot.getRouterState).subscribe(routerState => {
        params = routerState.state.params;
      });

      expect(params).toEqual({ pizzaId: "2" });

      store.select(fromSelectors.getSelectedPizza).subscribe(v => (result = v));

      expect(result).toEqual(entities[2]);
    });
  });

  describe("getPizzaVisualised", () => {
    it("should return selected pizza with selected toppings", () => {
      let result, params;
      let toppings = [
        {
          id: 6,
          name: "Bacon"
        },
        {
          id: 7,
          name: "Tomato"
        },
        {
          id: 9,
          name: "Onion"
        }
      ];

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));
      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));
      store.dispatch(new fromActions.VisualiseToppings([9, 7, 6]));

      store.dispatch({
        type: "ROUTER_NAVIGATION",
        payload: {
          routerState: {
            url: "/products",
            queryParams: {},
            params: { pizzaId: "2" }
          },
          event: {}
        }
      });

      store
        .select(fromSelectors.getPizzaVisualised)
        .subscribe(selectedPizza => {
          result = selectedPizza;
        });
      const expectedToppings = [toppings[2], toppings[1], toppings[0]];
      expect(result).toEqual({ ...entities[2], toppings: expectedToppings });
    });
  });

  describe("getAllPizzas", () => {
    it("should return all pizzas as an array", () => {
      let result;

      store.select(fromSelectors.getAllPizzas).subscribe(v => {
        result = v;
      });

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result).toEqual(pizzas);
    });
  });

  describe("getPizzasLoaded", () => {
    it("should return pizzas loaded state", () => {
      let result;

      store.select(fromSelectors.getAllPizzasLoaded).subscribe(v => {
        result = v;
      });

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoadPizzasSuccess([]));

      expect(result).toEqual(true);
    });
  });

  describe("getPizzaLoading", () => {
    it("should return pizza loading state", () => {
      let r;

      store.select(fromSelectors.getAllPizzasLoading).subscribe(v => {
        r = v;
      });

      expect(r).toEqual(false);

      store.dispatch(new fromActions.LoadPizzas());

      expect(r).toEqual(true);
    });
  });
});
