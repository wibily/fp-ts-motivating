import { pricing, inventory, legal } from "./api";
import { constant, pipe } from "fp-ts/lib/function";

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

const maxValue = (isIllegal: boolean) => (price: number) =>
  isIllegal ? 0 : price;

const A = getApplicativeComposition(T.task, O.option);

// const id = "a";
// pipe(A.of(maxValue),
//  A.ap(isIllegal(id)),
//  A.ap(getPricing(id)));

//  import * as T from 'fp-ts/Task'
// import { pipe } from 'fp-ts/function'

declare const fa: T.Task<number>;
declare const fb: T.Task<string>;
declare const f: (a: number) => (b: string) => boolean;

const result1 = pipe(fa, T.map(f), T.ap(fb));

// ..or..
const result2 = pipe(T.of(f), T.ap(fa), T.ap(fb));

console.log(fa);
