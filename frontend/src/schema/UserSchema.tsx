import {z} from "zod";

export const UserSignupSchema=z.object({
    fullname:z.string().min(1,"FullName is required"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password must be atleast 6 digits"),
    contact:z.string().min(10,"Contact number must be 10 digit")

});

export type SignupInputState=z.infer<typeof UserSignupSchema>

export const UserLoginSchema=z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password must be atleast 6 digits"),

});

export type LoginInputState=z.infer<typeof UserLoginSchema>