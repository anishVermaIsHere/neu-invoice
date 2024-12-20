import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth";
import Image from "next/image";

export function Login() {
  
  const handleSubmit = async (formdata: FormData) => {
    "use server";
    await signIn('nodemailer', { email: formdata.get("email") as string });
  };

  // const handleSubmit = async () => {
  //   "use server";
  //   await signIn('google');
  // };


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <div className="p-2 mb-3 flex items-center justify-center text-2xl rounded">
            <span><Image src="/neu-invoice.png" alt="logo" width={120} height={100} /></span>
          </div>
          <div className="text-center">Login</div>
        </CardTitle>
        <CardDescription>
          Submit your email and it sent a login link to your email
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input type="email" name="email" placeholder="davidpaul@test.com" required/>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
