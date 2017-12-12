import * as fromPizzas from "./pizza.reducer";
import * as fromActions from "../actions/pizzas.action";
import { Pizza } from "../../models/pizza.model";

describe("PizzaReducer", () => {
  describe("Undefined Action", () => {
    it("should return the default state", () => {
      const { initialStae } = fromPizzas;
      const action = {} as any;
      const state = fromPizzas.reducer(undefined, action);

      expect(state).toBe(initialStae);
    });
  });

  describe("LOAD_PIZZAS Action", () => {
    it("should set loading to true", () => {
      const { initialStae } = fromPizzas;
      const action = new fromActions.LoadPizzas();
      const state = fromPizzas.reducer(initialStae, action);

      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe("LOAD_PIZZAS_SUCCESS Action", () => {
    it("should map an array to entities", () => {
      const pizzas: Pizza[] = [
        { id: 1, name: "Pizza #1", toppings: [] },
        { id: 2, name: "Pizza #2", toppings: [] },
        { id: 3, name: "Pizza #3", toppings: [] }
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1],
        3: pizzas[2]
      };
      const { initialStae } = fromPizzas;
      const action = new fromActions.LoadPizzasSuccess(pizzas);
      const state = fromPizzas.reducer(initialStae, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });

  describe("LOAD_PIZZA_FAIL Action", () => {
    it("shoild return the initial state", () => {
      const { initialStae } = fromPizzas;
      const action = new fromActions.LoadPizzasFail({});
      const state = fromPizzas.reducer(initialStae, action);

      expect(state).toEqual(initialStae);
    });

    it("should return previous state", () => {
      const { initialStae } = fromPizzas;
      const previousState = { ...initialStae, loading: true };
      const action = new fromActions.LoadPizzasFail({});
      const state = fromPizzas.reducer(previousState, action);
      expect(state).toEqual(initialStae);
    });
  });

  describe("CREATE_PIZZA_SUCCESS Action", () => {
    it("Add  a new pizz to entities", () => {
      const pizzas: Pizza[] = [
        { id: 1, name: "Pizza1", toppings: [] },
        { id: 2, name: "Pizza1", toppings: [] }
      ];

      const newPizza: Pizza = {
        id: 3,
        name: "Pizza #3",
        toppings: [
          { id: 1, name: "t1" },
          { id: 2, name: "t2" },
          { id: 3, name: "t3" }
        ]
      };

      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      };

      const { initialStae } = fromPizzas;
      const previousState = { ...initialStae, entities };
      const action = new fromActions.CreatePizzaSuccess(newPizza);
      const state = fromPizzas.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({ ...entities, 3: newPizza });
    });
  });

  describe("UPDATE_PIZZA_SUCCESS Action", () => {
    it("should update the pizza", () => {
      const pizzas: Pizza[] = [
        { id: 1, name: "Pizzas #1", toppings: [] },
        { id: 2, name: "Pizzas #2", toppings: [] }
      ];

      const updatedPizza = {
        id: 2,
        name: "Pizza #2",
        toppings: [{ id: 1, name: "t1" }]
      };

      const entities = {
        1: pizzas[0],
        2: pizzas[1]
      };

      const { initialStae } = fromPizzas;
      const previousState = { ...initialStae, entities };
      const action = new fromActions.UpdatePizzaSuccess(updatedPizza);
      const state = fromPizzas.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({ ...entities, 2: updatedPizza });
    });
  });

  describe("REMOVE_PIZZA_SUCCESS Action", () => {
    it("should remove the pizza", () => {
      const pizzas: Pizza[] = [
        { id: 1, name: "Pizza#1", toppings: [] },
        { id: 2, name: "Pizza#2", toppings: [] },
        { id: 3, name: "Pizza#3", toppings: [] }
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1],
        3: pizzas[2]
      };

      const { initialStae } = fromPizzas;
      const previousState = { ...initialStae, entities };
      const action = new fromActions.RemovePizzaSuccess(pizzas[0]);
      const state = fromPizzas.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({
        2: pizzas[1],
        3: pizzas[2]
      });
    });
  });
});

describe("PizzaReducer Selectors", () => {
  describe("getPizzaEntities", () => {
    it("should return .entities", () => {
      const entities: { [key: number]: Pizza } = {
        1: { id: 1, name: "Pizza#1", toppings: [] },
        2: { id: 2, name: "Pizza#1", toppings: [] }
      };

      const { initialStae } = fromPizzas;
      const previousState = { ...initialStae, entities };
      const slice = fromPizzas.getPizzasEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe("getPizzaLoading", () => {
    it("should return .loading", () => {
      const { initialStae } = fromPizzas;
      const previousState = { ...initialStae, loading: true };
      const slice = fromPizzas.getPizzasLoading(previousState);
      expect(slice).toEqual(true);
    });
  });

  describe("getPizzasLoaded", () => {
    it("should return .loaded", () => {
      const { initialStae } = fromPizzas;
      const previousState = { ...initialStae, loaded: true };
      const slice = fromPizzas.getPizzasLoaded(previousState);
      expect(slice).toEqual(true);
    });
  });
});
