import { Button } from "@/components/ui/button";
import H3Component from "@/components/ui/h3";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginModule() {

  return (
    <div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col p-6 space-y-1">
          <H3Component>Login</H3Component>
          <p className="text-sm text-muted-foreground">
            Enter your username and password to continue
          </p>
        </div>
        <form>
          <div className="p-6 pt-0 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                required
                id="username"
                name="username"
                placeholder="myusername"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input required id="password" name="password" type="password" />
            </div>
          </div>
          <div className="flex items-center p-6 pt-0">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
