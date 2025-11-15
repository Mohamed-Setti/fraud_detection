import { dbConnect } from "@/lib/mongodb";
import User from "@/Models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // CORRECTION : Recevoir 'password' au lieu de 'passwordHash'
    const { name, email, mobile, password, role }: 
      { name: string;
        email: string;
        mobile?: string;
        password: string;
        role: string } = 
      await req.json();

    // Validation des champs requis
    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400 
      });
    }

    // CORRECTION : Hasher 'password' au lieu de 'passwordHash'
    const passwordHash = await bcrypt.hash(password, 10);
    
    const newUser = new User({ 
      name, 
      email, 
      mobile: mobile || "", 
      passwordHash, // Utiliser le mot de passe hashé
      role, 
      isAuthenticated: false // Par défaut false
    });
    
    await newUser.save();
    
    return new Response(JSON.stringify({ message: "User registered successfully" }), { 
      status: 201 
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ 
      error: "Something went wrong",
      details: error instanceof Error ? error.message : "Unknown error"
    }), { 
      status: 500 
    });
  }
}