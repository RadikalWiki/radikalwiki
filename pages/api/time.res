let default = (req, res) => {
  res->Res.json({"time": Js.Date.make()})
}
