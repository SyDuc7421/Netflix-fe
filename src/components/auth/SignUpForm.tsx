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

const schema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

interface SignUpFormProps {
  setIsLogin: (value: boolean) => void;
}

export const SignUpForm = ({ setIsLogin }: SignUpFormProps) => {
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
          className="z-50 h-fit mt-[150px] min-w-[360px] space-y-[30px] p-8 bg-primary text-primary-foreground placeholder-opacity-95 rounded-sm"
        >
          <h2 className="text-white font-semibold text-3xl">Sign up</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-zinc-400"
                      placeholder="Username"
                      {...field}
                    />
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
                    <Input
                      type="email"
                      className="bg-zinc-400"
                      placeholder="Email"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      className="bg-zinc-400"
                      placeholder="Password"
                      {...field}
                    />
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
          <p className="text-xs text-slate-500">
            Already have an account,{" "}
            <button
              type="button"
              className="underline text-white cursor-pointer"
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
