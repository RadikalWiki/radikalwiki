@send external json: ('a, 'b) => unit = "json"

let default = (
  req,
  res
) => {
	res->json({ "time": Js.Date.make()})
  //return res.json({
  //  time: new Date(),
  //});
}

