import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
import Label from "../form/Label";
import Checkbox from "../form/input/Checkbox";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthServiceImpl } from "../../../infrastructure/services/AuthServiceImpl";
import { RegisterUseCase } from "../../../core/useCases/RegisterUseCase";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
      })
    ),
  });

  const handleSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const authService = new AuthServiceImpl();
    const registerUseCase = new RegisterUseCase(authService);

    const fullName = `${data.firstName} ${data.lastName}`.trim();

    const user = await registerUseCase.execute(
      fullName,
      data.email,
      data.password
    );

    if (user) {
      alert("Registration successful!");
      localStorage.setItem("token", user.token);
      window.location.href = "/signin";
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Login
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                {/* Google SVG icon */}
                Sign up with Google
              </button>
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                {/* X SVG icon */}
                Sign up with X
              </button>
            </div>

            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">Or</span>
              </div>
            </div>

            <form>
              <div className="space-y-5">
                {/* First Name */}
                <div className="sm:col-span-1">
                  <Label>
                    First Name <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="Enter your first name"
                    error={!!form.formState.errors.firstName}
                    onChange={(e) => form.setValue("firstName", e.target.value)}
                  />
                </div>
                {/* Last Name */}
                <div className="sm:col-span-1">
                  <Label>
                    Last Name <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="Enter your last name"
                    error={!!form.formState.errors.lastName}
                    onChange={(e) => form.setValue("lastName", e.target.value)}
                  />
                </div>
                {/* Email */}
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    error={!!form.formState.errors.email}
                    onChange={(e) => form.setValue("email", e.target.value)}
                  />
                </div>
                {/* Password */}
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      error={!!form.formState.errors.password}
                      onChange={(e) => form.setValue("password", e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox className="w-5 h-5" checked={isChecked} onChange={setIsChecked} />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">Terms and Conditions</span>{" "}
                    and{" "}
                    <span className="text-gray-800 dark:text-white">Privacy Policy</span>.
                  </p>
                </div>
                {/* Submit */}
                <div>
                  <Button className="w-full" size="sm" onClick={form.handleSubmit(handleSubmit)}>
                    Sign Up
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?{" "}
                <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}