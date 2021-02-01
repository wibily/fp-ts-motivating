import { pricing, inventory, legal } from "./api";

const maxProfit = (id: string): Promise<number> => {
  const doPricingAndInv = () => {
    return pricing(id).then(
      (pricing) => {
        if (pricing?.pricing) {
          const unitPrice = pricing.pricing;
          return inventory(id).then(
            (inv) => {
              if (inv?.units && inv.units > 0) {
                return Promise.resolve(unitPrice * inv.units);
              } else {
                return Promise.resolve(0);
              }
            },
            () => Promise.resolve(0)
          );
        } else {
          return Promise.resolve(0);
        }
      },
      () => Promise.resolve(0)
    );
  };

  return legal(id).then(
    (legal) => {
      if (legal?.isIllegal) {
        return Promise.resolve(0);
      } else {
        return doPricingAndInv();
      }
    },
    () => doPricingAndInv()
  );
};

maxProfit("a").then(res => console.log('vanilla',res));
