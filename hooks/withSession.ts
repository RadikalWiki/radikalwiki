import { withIronSession } from "next-iron-session";

export default function withSession(handler: any) {
  if (!process.env.COOKIE_SECRET)
    throw new Error("Env var `SECRET_COOKIE_PASSWORD` not defined");
  return withIronSession(handler, {
    password: process.env.COOKIE_SECRET,
    cookieName: "radikalwiki-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}
