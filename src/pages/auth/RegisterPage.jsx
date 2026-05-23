import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-card text-card-foreground border border-border p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Create Account
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Join the Flix community
        </p>
        <RegisterForm />
        <p className="text-center text-muted-foreground mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
