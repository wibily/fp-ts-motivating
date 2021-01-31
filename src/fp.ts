import { pricing, inventory, legal } from "./api";
import { constant, flow, pipe } from "fp-ts/lib/function";

import * as O from "fp-ts/lib/Option";
import * as T from "fp-ts/lib/Task";
import { getApplicativeComposition } from "fp-ts/lib/Applicative";

// string -> Task<Option<boolean>>>
const isIllegal = (id: string): T.Task<O.Option<boolean>> =>
  pipe(
    legal(id).then(
      (value) => O.fromNullable(value?.isIllegal),
      constant(O.none)
    ),
    constant
  );

const isLTZero = (n: number): O.Option<number> => (n > 0 ? O.some(n) : O.none);

// string -> Task<Option<number>>>
const getPricing = (id: string): T.Task<O.Option<number>> =>
  pipe(
    pricing(id).then(
      (value) => pipe(O.fromNullable(value?.pricing), O.chain(isLTZero)),
      constant(O.none)
    ),
    constant
  );
//string -> Task<Option<number>>>
const getInventory = (id: string): T.Task<O.Option<number>> =>
  pipe(
    inventory(id).then(
      (value) => O.fromNullable(value?.number),
      constant(O.none)
    ),
    constant
  );

const maxValue = (isIllegal: boolean) => (price: number) => (qty: number) =>
  isIllegal ? 0 : price * qty;

const A = getApplicativeComposition(T.task, O.option);

const maxProfit = (id:string) => A.ap(A.ap(A.map(isIllegal(id), maxValue), getPricing(id)), getInventory(id))();

maxProfit('a').then(console.log)
maxProfit('b').then(console.log)
maxProfit('c').then(console.log)
maxProfit('d').then(console.log)