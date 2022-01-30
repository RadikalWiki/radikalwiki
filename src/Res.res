type t
@send external json: (t, 'b) => unit = "json"
@send external send: (t, 'b) => unit = "send"
@send external status: (t, int) => t = "status"