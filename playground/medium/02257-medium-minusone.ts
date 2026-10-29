/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */
type Increment<T extends unknown[]> = [...T, T["length"]];

type Times<T, Acc extends unknown[] = []> = 1 extends 0
  ? never
  : Acc["length"] extends T
    ? Acc
    : Times<T, Increment<Acc>>;

type Pop<T extends unknown[]> = T extends [...infer F, infer L] ? F : never;

type MyMinusOne<
  T extends number,
  U extends unknown[] = Times<T>,
> = Pop<U>["length"];

// -------------------------- 2 Solution ----------------------

type PreviousDigit = {
  "0": "9";
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};

type ReverseString<
  S extends string,
  Acc extends string = "",
> = S extends `${infer First}${infer Rest}`
  ? ReverseString<Rest, `${First}${Acc}`>
  : Acc;

type DecrementReversed<S extends string> =
  S extends `${infer Digit}${infer Rest}`
    ? Digit extends keyof PreviousDigit
      ? Digit extends "0"
        ? `9${DecrementReversed<Rest>}`
        : `${PreviousDigit[Digit]}${Rest}`
      : never
    : never;

type Normalize<S extends string> = S extends `0${infer Rest}`
  ? Normalize<Rest>
  : S extends ""
    ? "0"
    : S;

type DecrementString<S extends string> = Normalize<
  ReverseString<DecrementReversed<ReverseString<S>>>
>;

type MinusOne<T extends number | string> =
  DecrementString<`${T}`> extends `${infer Result extends number}`
    ? Result
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9999999999>, 9999999998>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>, // my code fails for this test case
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
