type t = {
  name: string,
  message: string,
  stack: option<string>,
}

let default = ({name, message, stack}) => {
  <>
    <p> {"An error occurred on client"->React.string} </p>
    <p> {`Name: ${name}`->React.string} </p>
    <p> {`Message: ${message}`->React.string} </p>
    <p> {"Stack:"->React.string} </p>
    {switch stack {
    | Some(stack) =>
      stack
      ->Js.String2.split("\n")
      ->Belt.Array.mapWithIndex((index, line) =>
        <p key={index->Belt.Int.toString}> {line->React.string} </p>
      )
      ->React.array
    | _ => React.string("")
    }}
  </>
}