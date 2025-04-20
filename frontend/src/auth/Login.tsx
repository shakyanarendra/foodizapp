import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginInputState, UserLoginSchema } from "@/schema/UserSchema";
import { useUserStore } from "@/zustand/useUserStore";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const [errors, setError] = useState<Partial<LoginInputState>>({});
  const { login, loading } = useUserStore();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = UserLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {
       throw new Error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full text-center max-w-md rounded-lg md:border border-grey-200 mx-4 "
      >
        <div className="mb-4 ">
          <h1 className="fond-bold text-2xl">Foodie's Paradise</h1>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 focus-visible:ring-1"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
            <Mail className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500"> {errors.email}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 focus-visible:ring-1"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500"> {errors.password}</span>
            )}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button
              disabled
              className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black  w-full"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black  w-full"
            >
              Login
            </Button>
          )}
          <div className="mt-4">
            <Link
              to="/forgot-password"
              className="hover:text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an Account?{" "}
          <Link to="/signup" className="text-blue-500 mt-4">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
