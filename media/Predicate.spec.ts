/** Typeclass law tests for the `Predicate` datatype. */
import {
  getMonoidEqv,
  getMonoidEvery,
  getMonoidSome,
  getMonoidXor,
  Invariant,
} from '@effect/typeclass/data/Predicate'
import {Boolean as BO, pipe} from 'effect'
import {
  getMonoUnaryEquivalence,
  Mono,
  predicate,
  testMonoids,
  testTypeclassLaws,
} from 'effect-ts-laws'
import {PredicateTypeLambda} from 'effect/Predicate'

const Arbitrary = predicate<Mono>()
const Equivalence = getMonoUnaryEquivalence(BO.Equivalence)

describe('@effect/typeclass/data/Predicate', () => {
  pipe(
    {Invariant},
    testTypeclassLaws.contravariant<PredicateTypeLambda>({
      Arbitrary,
      Equivalence,
    }),
  )

  describe('Semigroup/monoid', () => {
    pipe(
      {
        eqv: getMonoidEqv<Mono>(),
        some: getMonoidSome<Mono>(),
        xor: getMonoidXor<Mono>(),
        every: getMonoidEvery<Mono>(),
      },
      testMonoids(Arbitrary, Equivalence),
    )
  })
})
