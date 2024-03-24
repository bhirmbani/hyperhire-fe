"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H3Component from "@/components/ui/h3";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import useSWRMutation from "swr/mutation";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

const formSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
  })
  .required();

export default function LoginModule() {
  const [login, storeLogin] = useLocalStorage("login", false);
  const [userId, storeUserId] = useLocalStorage("userId", 0);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    triggerLogin({ username: values.username, password: values.password });
  }

  const { trigger: triggerLogin, isMutating: isLoginMutating } = useSWRMutation(
    "/user/login",
    loginUser,
    {
      onError: (err) => {
        toast.error(err.message, {
          duration: 1500,
        });
      },
      onSuccess: (data) => {
        storeLogin(true);
        storeUserId(data.data!.id);
        toast.success("Logged in!", {
          duration: 1500,
        });
        router.replace("/app");
      },
    }
  );
  return (
    <div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col p-6 space-y-1">
          <H3Component>Login</H3Component>
          <p className="text-sm text-muted-foreground">
            Enter your username and password to login
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={() => (
                <div className="p-6 pt-0 grid gap-4">
                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="myusername"
                          {...form.register("username")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <div className="grid gap-2">
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...form.register("password")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </div>
              )}
            />
            <div className="grid">
              <Button disabled={isLoginMutating} type="submit">
                {isLoginMutating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
