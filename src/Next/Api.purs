module Next.Api where

import Prelude(Unit)
import Data.Function.Uncurried (Fn2, mkFn2)

type Request
  = {
    }

type Response
  = { json :: String -> Unit
    }


type Api = Fn2 Request Response Unit


handler ∷ (Request -> Response -> Unit) → Api
handler api = mkFn2 api