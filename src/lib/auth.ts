import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function getUserFromToken(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return null;

    // ✅ safer cookie parsing
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")),
    );

    const token = cookies.token;
    if (!token) return null;

    const decoded: any = jwt.verify(token, JWT_SECRET);

    return {
      _id: decoded.userId,
      username: decoded.username,
    };
  } catch (err) {
    return null;
  }
}
