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
import { toast } from "sonner";
import { Info, Key, LogIn, Mail } from "lucide-react";
import { signin } from "../../services/authService";
import { useDispatch } from "react-redux";
import { add } from "../../store/authSlice";

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
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const response = await signin(values);
    if (response.status === 200) {
      dispatch(add(response.data));
      toast.success("Logged in successfully");
    } else {
      toast.error("Login failed", {
        description: response.message,
      });
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-50 mt-[150px] h-fit min-w-[400px] space-y-6 rounded-sm bg-primary p-8 text-primary-foreground placeholder-opacity-95"
        >
          <div className="space-y-2">
            <h2 className="flex items-center gap-2 text-3xl font-semibold text-white">
              <LogIn size={30} className="-ml-1 mr-1" />
              Sign in
            </h2>
            <p className="flex items-center gap-1 text-sm text-zinc-400">
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
              className="cursor-pointer text-white underline"
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
