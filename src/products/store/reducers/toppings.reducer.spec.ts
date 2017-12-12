import * as fromToppings from "./toppings.reducer";
import * as fromActions from "../actions/toppings.action";
import { Topping } from "../../models/topping.model";

describe("ToppingReducer", () => {
  describe("undefine action", () => {
    it("should return the default state", () => {
      const { initialState } = fromToppings;
      const action = {} as any;
      const state = fromToppings.reducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe("LOAD_TOPPINGS action", () => {
    it("should set loadings to true", () => {
      const { initialState } = fromToppings;
      const action = new fromActions.LoadToppings();
      const state = fromToppings.reducer(initialState, action);

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
      expect(state.entities).toEqual(initialState.entities);
    });
  });

  describe("LOAD_TOPPINGS_SUCCESS action", () => {
    it("should populate toppings array", () => {
      const toppings: Topping[] = [
        { id: 1, name: "Bacon" },
        { id: 2, name: "Papper" },
        { id: 3, name: "Tomato" }
      ];

      const entities = {
        1: toppings[0],
        2: toppings[1],
        3: toppings[2]
      };
      const { initialState } = fromToppings;
      const action = new fromActions.LoadToppingsSuccess(toppings);
      const state = fromToppings.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });

  describe("LOAD_TOPPINGS_FAIL action", () => {
    it("should return the initial state", () => {
      const { initialState } = fromToppings;
      const action = new fromActions.LoadToppingsFail({});
      const state = fromToppings.reducer(initialState, action);

      expect(state).toEqual(initialState);
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
    });

    it("should return the previous state", () => {
      const { initialState } = fromToppings;
      const previousState = { ...initialState, loading: true };
      const action = new fromActions.LoadToppingsFail({});
      const state = fromToppings.reducer(previousState, action);

      expect(state).toEqual(initialState);
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
    });
  });

  describe("VISUALISE_TOPPINGS action", () => {
    it("should set an array of number ids", () => {
      const { initialState } = fromToppings;
      const action = new fromActions.VisualiseToppings([1, 2, 3]);
      const state = fromToppings.reducer(initialState, action);

      expect(state.selectedToppings).toEqual([1, 2, 3]);
    });
  });
});

describe("ToppingsReducer Selectors", () => {
  describe("getToppingsEntities", () => {
    it("should return the .entities", () => {
      const entities: { [key: number]: Topping } = {
        1: { id: 1, name: "Bacon" },
        2: { id: 2, name: "Tomato" },
        3: { id: 3, name: "Papper" }
      };

      const { initialState } = fromToppings;
      const previousState = { ...initialState, entities };
      const slice = fromToppings.getToppingEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe("getSelectedtoppings", () => {
    it("should return .selectedToppings", () => {
      const selectedToppings = [1, 3, 5, 6, 7];
      const { initialState } = fromToppings;
      const previousState = { ...initialState, selectedToppings };
      const slice = fromToppings.getSelectedToppings(previousState);

      expect(slice).toEqual(selectedToppings);
    });
  });

  describe("getToppingsLoading", () => {
    it("should return .loading", () => {
      const { initialState } = fromToppings;
      const previousState = { ...initialState, loading: true };
      const slice = fromToppings.getToppingsLoading(previousState);
      expect(slice).toEqual(true);
    });
  });

  describe("getToppingsLoaded", () => {
    it("should return .loaded", () => {
      const { initialState } = fromToppings;
      const pstate = { ...initialState, loaded: true };
      const slice = fromToppings.getToppingsLoaded(pstate);
      expect(slice).toEqual(true);
    });
  });

  describe("getSelectedToppings", () => {
    it("should return .selectedtoppings", () => {
      const { initialState } = fromToppings;
      const pstate = { ...initialState };
      const slice = fromToppings.getSelectedToppings(pstate);
      expect(slice).toEqual([]);
    });
  });
});
