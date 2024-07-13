import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Info, Key, LogIn, Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

interface SignInFormProps {
  setIsLogin: (value: boolean) => void;
}

export const SignInForm = ({ setIsLogin }: SignInFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-50 h-fit mt-[150px] min-w-[400px] space-y-6 p-8 bg-primary text-primary-foreground placeholder-opacity-95 rounded-sm"
        >
          <div className="space-y-2">
            <h2 className="text-white font-semibold text-3xl flex items-center gap-2">
              <LogIn size={30} className="mr-1 -ml-1" />
              Sign in
            </h2>
            <p className="text-sm text-zinc-400 flex items-center gap-1">
              <Info size={14} strokeWidth={1} />
              Provide your details below to log in
            </p>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        className="bg-zinc-400 ps-6"
                        placeholder="Email"
                        {...field}
                      />
                      <Mail
                        size={16}
                        className="absolute left-1 top-2.5 stroke-[1.5px] text-zinc-600"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="password"
                        className="bg-zinc-400 ps-6"
                        placeholder="Password"
                        {...field}
                      />
                      <Key
                        size={16}
                        className="absolute left-1 top-2.5 stroke-[1.5px] text-zinc-600"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-red-800 text-white hover:bg-red-900"
          >
            Login
          </Button>
          <p className="text-sm text-zinc-400">
            First time using Netflix,{" "}
            <button
              type="button"
              className="underline text-white cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Create an account
            </button>
          </p>
        </form>
      </Form>
    </>
  );
};
