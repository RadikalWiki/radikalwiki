// next.config.js

type rule = {"test": Js.Re.t, "type": string, "resolve": {"fullySpecified": bool}}

type config = {"module": {@set "rules": array<rule>}}

let default = {
  "images": {
    "domains": ["backend-cec17a36.nhost.app"],
  },
  "headers": () =>
    {
      [
        {
          // matching all API routes
          "source": "/api/:path*",
          "headers": [
            {"key": "Access-Control-Allow-Credentials", "value": "true"},
            {"key": "Access-Control-Allow-Origin", "value": "*"},
            {
              "key": "Access-Control-Allow-Methods",
              "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              "key": "Access-Control-Allow-Headers",
              "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ]
    }->Js.Promise.resolve,
}
