import { Input } from "@/components/ui/input";
import { Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUserStore } from "@/zustand/useUserStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const { forgotPassword, loading } = useUserStore();
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 text-center md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center ">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-grey-600 ">
            Enter your Email Address to reset your Password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="pl-10 focus-visible:ring-1"
          />
          <Mail className="absolute inset-y-2 left-2 text-grey-600 pointer-events-node" />
        </div>
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
            onClick={() => forgotPassword(email)}
            type="submit"
            className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black  w-full"
          >
            Send reset Link
          </Button>
        )}
        <span>
          Back to{" "}
          <Link to="/login" className="text-blue-500 mt-4">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
