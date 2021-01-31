import { pricing, inventory, legal } from "./api";

const maxProfit = (id: string): Promise<number> => {
  const doPricingAndInv = () => {
    return pricing(id).then(
      (pricing) => {
        if (pricing?.pricing) {
          const unitPrice = pricing.pricing;
          return inventory(id).then(
            (inv) => {
              if (inv?.number && inv.number > 0) {
                return Promise.resolve(unitPrice * inv.number);
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

// maxProfit("a").then(console.log);
