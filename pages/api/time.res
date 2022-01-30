let default = (_, res) => {
  res->Res.json({"time": Js.Date.make()})
}
