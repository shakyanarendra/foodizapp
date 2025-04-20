import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LockKeyhole, Mail, PhoneCall, User } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupInputState, UserSignupSchema } from "@/schema/UserSchema";
import { useUserStore } from "@/zustand/useUserStore";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setError] = useState<Partial<SignupInputState>>({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // form validation check start
    const result = UserSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<SignupInputState>);
      return;
    }
    // login api implementation

    try {
      await signup(input);
      navigate("/login");
    } catch (error) {
     throw new Error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md text-center rounded-lg md:border border-grey-200 mx-4 "
      >
        <div className="mb-4 ">
          <h1 className="fond-bold text-2xl">Foodie's Paradise</h1>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              className="pl-10 focus-visible:ring-1"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
            <User className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500"> {errors.fullname}</span>
            )}
          </div>
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

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact No."
              className="pl-10 focus-visible:ring-1"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
            <PhoneCall className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500"> {errors.contact}</span>
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
              SignUp
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-2">
          Allready have an Account?{" "}
          <Link to="/login" className="text-blue-500 mt-4">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
