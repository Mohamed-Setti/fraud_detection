import { dbConnect } from "@/lib/mongodb";
import User from "@/Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password }: { email: string; password: string } = await req.json();

    // Validation des champs requis
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400
      });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500 }
    );
  }
}
