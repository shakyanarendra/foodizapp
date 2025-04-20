import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useUserStore } from "@/zustand/useUserStore";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const { token } = useParams(); 
  const { loading, resetPassword } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return; 
    if (newPassword.length < 6) return; 

    await resetPassword(token, newPassword); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center gap-5 md:p-8 w-full max-w-md rounded-lg mx-4"
      >
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password below.</p>
        </div>

        {/* Password Input */}
        <div className="relative w-full">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter New Password"
            className="pl-10 focus-visible:ring-1"
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600" />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </>
          ) : (
            "Reset Password"
          )}
        </Button>

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

export default ResetPassword;
