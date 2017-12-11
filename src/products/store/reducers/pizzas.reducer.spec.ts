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
});
