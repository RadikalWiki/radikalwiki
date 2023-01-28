module Api.Time
  ( default
  ) where

import Data.Function.Uncurried (Fn0, runFn0)
import Next.Api (Api, handler)

foreign import date :: Fn0 String

default ∷ Api
default = handler \_ res -> res.json (runFn0 date)
