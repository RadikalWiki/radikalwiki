module Api.Time
  ( default
  ) where

import Prelude
import Data.Function.Uncurried (Fn0, Fn2, runFn0, mkFn2)

type Request
  = {
    }

type Response
  = { json :: String -> Unit
    }

foreign import date :: Fn0 String

default ∷ ∀ (t12 ∷ Type) (t14 ∷ Type) (t16 ∷ Row Type). Fn2 t12 { json ∷ String -> t14 | t16 } t14
default = mkFn2 $ \_ res -> res.json (runFn0 date)
