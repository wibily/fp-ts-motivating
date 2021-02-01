export type Price =
  | {
      id: string;
      pricing?: number;
    }
  | null
  | undefined;

export const pricing = (id: string): Promise<Price> => {
  switch (id) {
    case "a":
      return Promise.resolve({
        id: "a",
        pricing: 10
      });
    case "b":
      return Promise.resolve({
        id: "b",
        pricing: 20
      });
    case "c":
      return Promise.resolve({
        id: "c",
        pricing: undefined
      });
    case "d":
      return Promise.reject("no pricing for you");
  }
  return Promise.resolve(null);
};

export type Inventory =
  | {
      id: string;
      units?: number;
    }
  | null
  | undefined;

export const inventory = (id: string): Promise<Inventory> => {
  switch (id) {
    case "a":
      return Promise.resolve({
        id: "a",
        number: 10
      });
    case "b":
      return Promise.resolve({
        id: "b",
        number: 10
      });
    case "c":
      return Promise.resolve({
        id: "c",
        number: undefined
      });
    case "d":
      return Promise.reject("no inventory for you");
  }
  return Promise.resolve(undefined);
};

export type Legal =
  | {
      id: string;
      isIllegal?: boolean;
    }
  | null
  | undefined;

export const legal = (id: string): Promise<Legal> => {
  switch (id) {
    case "a":
      return Promise.reject({
        id: "a",
        isIllegal: false
      });
    case "b":
      return Promise.resolve({
        id: "b",
        isIllegal: true
      });
    case "c":
      return Promise.resolve({
        id: "c"
      });
    case "d":
      return Promise.reject("no legal for you");
  }
  return Promise.resolve(null);
};
