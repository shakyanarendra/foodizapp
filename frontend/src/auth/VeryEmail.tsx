import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/zustand/useUserStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VeryEmail = () => {
  const navigate = useNavigate();
  const [Otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputref = useRef<any>([]);
  const { verifyEmail, loading } = useUserStore();
  const handlechange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value == "") {
      const newOtp = [...Otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    // move to the next input field if the digit is entered
    if (value != " " && index < 5) {
      inputref.current[index + 1].focus();
    }
  };

  const handlekeydown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key == "Backspace" && !Otp[index] && index > 0) {
      inputref.current[index - 1].focus();
    }
  };

  const submithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode: string = Otp.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
     
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-full   ">
      <div className="p-8 rounded-md w-full text-center max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Veryfy Your Email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code send to your email
          </p>
        </div>
        <form onSubmit={submithandler}>
          <div className="flex justify-between">
            {Otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => (inputref.current[idx] = element)}
                maxLength={1}
                type="text"
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handlechange(idx, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handlekeydown(idx, e)
                }
                className="md:w-12 md:h-12 w-8 h-8 text-sm md:text-2xl fond-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          
          {loading ? (
            <Button
              disabled
              className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black  w-full mt-6 "
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black  w-full mt-6"
            >
              
              Verify 
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VeryEmail;
