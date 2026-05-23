import { LoginForm } from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-card text-card-foreground border border-border p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Login to your Flix account
        </p>
        <LoginForm />
        <p className="text-center text-muted-foreground mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
