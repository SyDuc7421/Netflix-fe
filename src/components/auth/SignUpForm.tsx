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
import { Info, Key, Mail, User, UserRoundPlus } from "lucide-react";
import { signup } from "../../services/authService";
import { toast } from "sonner";

const schema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
});

interface SignUpFormProps {
  setIsLogin: (value: boolean) => void;
}

export const SignUpForm = ({ setIsLogin }: SignUpFormProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const response = await signup(values);
    if (response && response.status === 201) {
      toast.success("Account registration successfully.");
      setIsLogin(true); // Move to sign in form
    } else {
      toast.error("Account registration failed", {
        description: response.message,
      });
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-50 mt-[150px] h-fit min-w-[400px] space-y-[30px] rounded-sm bg-primary p-8 text-primary-foreground placeholder-opacity-95"
        >
          <div className="space-y-2">
            <h2 className="flex items-center gap-2 text-3xl font-semibold text-white">
              <UserRoundPlus size={30} />
              Sign up
            </h2>
            <p className="flex w-[360px] items-baseline gap-1 text-wrap text-sm text-zinc-400">
              <Info size={14} strokeWidth={1} />
              Provide the most accurate information fields for account
              registration
            </p>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        className="bg-zinc-400 ps-6"
                        placeholder="Username"
                        {...field}
                      />
                      <User
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
            Register
          </Button>
          <p className="text-sm text-slate-400">
            Already have an account,{" "}
            <button
              type="button"
              className="cursor-pointer text-white underline"
              onClick={() => setIsLogin(true)}
            >
              Sign in now
            </button>
          </p>
        </form>
      </Form>
    </>
  );
};
