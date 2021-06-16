import { query, withSession } from "hooks";
import { USER_CHECK_TOKEN } from "gql";

const handler = withSession(async (req: any, res: any) => {
  const {
    query: { token },
  } = req;
  try {
    const { data, error } = await query(USER_CHECK_TOKEN, { token });
    if (error || !data?.user[0]) {
      res.status(500).json({ error: "invalid token" });
      return;
    }
    const user = data?.user[0];
    const session = { token, id: user.id, name: user.name, role: user.role };
    req.session.set("user", session);
    await req.session.save();
    res.redirect("/");
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    res.status(500).json(error);
  }
});

export default handler;
