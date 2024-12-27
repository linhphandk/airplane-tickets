"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "./context";
interface ILoginForm {
  email: string;
}
const formSchema = z.object({
  email: z.string().email().default(""),
  password: z.string().min(5),
});
export default function LoginPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<null | string>(null);
  const userContext = useContext(UserContext);
  const onSubmit = async (data: ILoginForm) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status === 404) {
      setSubmitError("Wrong username or password");
      return;
    }

    if (res.status === 200 && userContext !== null) {
      setSubmitError(null);
      const payload = (await res.json()).payload;
      userContext.setUser({ id: payload.id, email: payload.email });
      router.push("/dashboard");
      return;
    } else {
      setSubmitError("Something went wrong...");
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-4 space-y-1"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input data-testid="email" placeholder="Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    data-testid="password"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <p>{submitError}</p>}
          <Button data-testid="signin" className="w-full mt-1/2" type="submit">
            Sign in
          </Button>
        </form>
      </Form>
      <Link href="/register">register</Link>
    </div>
  );
}
