import * as fromPizzas from "./pizzas.action";

describe("Pizzas Actions", () => {
  describe("LoadPizzas Actions", () => {
    describe("LoadPizzas", () => {
      it("should create an action", () => {
        const action = new fromPizzas.LoadPizzas();
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS
        });
      });
    });

    describe("LoadPizzasFail", () => {
      it("should Fail", () => {
        const payload = { message: "Load Erorr" };
        const action = new fromPizzas.LoadPizzasFail(payload);
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_FAIL,
          payload
        });
      });
    });

    describe("LoadPizzasSuccess", () => {
      it("should success", () => {
        const payload = [
          {
            name: "Blazin' Inferno",
            toppings: [
              {
                id: 3,
                name: "basil"
              },
              {
                id: 4,
                name: "chili"
              },
              {
                id: 6,
                name: "mushroom"
              },
              {
                id: 5,
                name: "mozzarella"
              },
              {
                id: 1,
                name: "anchovy"
              },
              {
                id: 9,
                name: "pepper"
              }
            ],
            id: 1
          },
          {
            name: "Seaside Surfin'",
            toppings: [
              {
                id: 6,
                name: "mushroom"
              },
              {
                id: 7,
                name: "olive"
              },
              {
                id: 2,
                name: "bacon"
              },
              {
                id: 3,
                name: "basil"
              },
              {
                id: 1,
                name: "anchovy"
              },
              {
                id: 8,
                name: "onion"
              },
              {
                id: 11,
                name: "sweetcorn"
              },
              {
                id: 10,
                name: "pepperoni"
              }
            ],
            id: 2
          },
          {
            name: "Plain Ol' Pepperoni",
            toppings: [
              {
                id: 10,
                name: "pepperoni"
              }
            ],
            id: 3
          }
        ];
        const action = new fromPizzas.LoadPizzasSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_SUCCESS,
          payload
        });
      });
    });
  });
});
