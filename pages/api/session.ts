import { withSession } from "hooks";

export default withSession(
  async (req: any, res: any) => {
    const user = req.session.get("user");

    if (user) {
      res.json({
        isLoggedIn: true,
        ...user,
      });
    } else {
      res.json({
        isLoggedIn: false,
      });
    }
  }
);
