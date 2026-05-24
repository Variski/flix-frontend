import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

import flixLogo from "../../assets/flix-logo.png";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const buildUsername = (email) => {
    const fallback = `user${Date.now().toString().slice(-5)}`;
    const localPart = email.split("@")[0]?.trim().toLowerCase();
    const cleanName = localPart?.replace(/[^a-z0-9_]/g, "");

    return cleanName || fallback;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Password dan confirm password tidak sama");
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage("Kamu harus menyetujui Terms dan Privacy Policies");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        username: buildUsername(form.email),
        email: form.email,
        password: form.password,
      };

      const apiUrl = import.meta.env.VITE_API_URL || "";

      // Register
      const registerRes = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let registerJson;
      const regContentType = registerRes.headers.get("content-type");
      if (regContentType && regContentType.includes("application/json")) {
        registerJson = await registerRes.json();
      } else {
        throw new Error("Koneksi ke server gagal. Pastikan backend berjalan.");
      }

      if (!registerRes.ok) {
        throw new Error(registerJson.message || "Register gagal");
      }

      // Auto-login after register
      const loginRes = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      let loginJson = {};
      const loginContentType = loginRes.headers.get("content-type");
      if (loginContentType && loginContentType.includes("application/json")) {
        loginJson = await loginRes.json();
      }

      const token = loginJson.data?.token;
      const user = loginJson.data?.user;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message || "Register gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar mode="absolute" activeKey="" />
      <main
        className="
          relative grid min-h-screen min-h-[100svh] place-items-center
          overflow-x-hidden bg-[#232323] px-[52px] pb-12 pt-24 text-white
          max-[760px]:block max-[760px]:px-[18px] max-[760px]:pb-10 max-[760px]:pt-7
        "
      >
        <Link to="/" aria-label="FLIX Home">
          <img
            src={flixLogo}
            alt="FLIX"
            className="
            absolute left-[52px] top-[42px] block h-12 w-[52px]
            object-contain object-left
            max-[760px]:static
          "
          />
        </Link>

        <section className="mx-auto w-[640px] max-w-full max-[760px]:mt-12">
          <h1 className="m-0 text-[40px] font-medium leading-[1.1] text-white max-[760px]:text-4xl">
            Sign Up
          </h1>

          <p className="mb-[42px] mt-4 text-[21px] font-normal leading-[25px] text-[#f1f1f1]/75 max-[760px]:mb-[30px] max-[760px]:text-lg">
            Daftar untuk akses FLIX - Website Rekomendasi Film
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] ">
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />

            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              showPassword={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
              ariaLabel={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              showPassword={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((prev) => !prev)}
              ariaLabel={
                showConfirmPassword
                  ? "Sembunyikan confirm password"
                  : "Tampilkan confirm password"
              }
            />

            <label className="mt-px inline-flex cursor-pointer items-center gap-[11px] text-white">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="
                relative h-[21px] w-[21px] shrink-0 cursor-pointer
                appearance-none rounded-[3px] border-2 border-white
                bg-[#232323]
                checked:after:absolute checked:after:left-1/2 checked:after:top-1/2
                checked:after:h-[11px] checked:after:w-[11px]
                checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                checked:after:rounded-[2px] checked:after:bg-[#f20712]
              "
              />

              <span className="text-sm font-normal">
                I agree to all the Terms and Privacy Policies
              </span>
            </label>

            {errorMessage && (
              <p className="mt-[-6px] text-sm text-[#ff7b7b]">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
              mt-2.5 h-14 w-full cursor-pointer rounded-[20px]
              border-0 bg-[#e50914] px-[18px] font-medium text-white
              transition hover:bg-[#f20712]
              disabled:cursor-not-allowed disabled:opacity-75
            "
            >
              {loading ? "Loading..." : "Create Account"}
            </button>

            <p className="mb-[38px] mt-[-1px] text-center text-sm font-normal text-[#e5e5e5]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-white transition hover:text-[#f20712]"
              >
                Login
              </Link>
            </p>
          </form>

          <div
            className="
            mb-[29px] flex items-center gap-4 text-sm font-normal
            text-[#e5e5e5]/50
            before:h-px before:flex-1 before:bg-[#e5e5e5]/25
            after:h-px after:flex-1 after:bg-[#e5e5e5]/25
          "
          >
            Or Sign Up with
          </div>

          <div
            aria-label="Social sign up options"
            className="grid grid-cols-3 gap-4 max-[760px]:grid-cols-1"
          >
            <button
              type="button"
              className="
              grid h-14 cursor-pointer place-items-center rounded border
              border-white bg-transparent p-0 text-[23px] text-[#1877f2]
              transition hover:bg-white/10
            "
            >
              <FaFacebookF />
            </button>

            <button
              type="button"
              className="
              grid h-14 cursor-pointer place-items-center rounded border
              border-white bg-transparent p-0 text-[23px]
              transition hover:bg-white/10
            "
            >
              <FcGoogle />
            </button>

            <button
              type="button"
              className="
              grid h-14 cursor-pointer place-items-center rounded border
              border-white bg-transparent p-0 text-[23px] text-[#f2f2f2]
              transition hover:bg-white/10
            "
            >
              <FaApple />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FormInput({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <label className="relative block">
      <span
        className="
          absolute left-3 top-[-10px] z-[1] bg-[#232323]
          px-1 text-base font-normal leading-5 text-white
        "
      >
        {label}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        className="
          h-14 w-full rounded-[20px] border border-[#79747e]
          bg-[#232323] px-4 text-lg leading-[22px] text-white
          outline-none transition duration-150
          placeholder:text-[#8f8f8f]
          focus:border-white focus:bg-[#232323]
        "
      />
    </label>
  );
}

function PasswordInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
  showPassword,
  onToggle,
  ariaLabel,
}) {
  return (
    <label className="relative block">
      <span
        className="
          absolute left-3 top-[-10px] z-[1] bg-[#232323]
          px-1 text-base font-normal leading-5 text-white
        "
      >
        {label}
      </span>

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        className="
          h-14 w-full rounded-[20px] border border-[#79747e]
          bg-[#232323] px-4 pr-14 text-lg leading-[22px] text-white
          outline-none transition duration-150
          placeholder:text-[#8f8f8f]
          focus:border-white focus:bg-[#232323]
        "
      />

      <button
        type="button"
        onClick={onToggle}
        aria-label={ariaLabel}
        className="
          absolute right-[13px] top-1/2 grid h-9 w-9
          -translate-y-1/2 cursor-pointer place-items-center
          rounded-full border-0 bg-transparent p-0 text-[22px] text-white
          transition hover:bg-white/10
        "
      >
        {showPassword ? <FiEye /> : <FiEyeOff />}
      </button>
    </label>
  );
}

export default RegisterPage;