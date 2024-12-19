"use client";
import { useActionState } from "react";
// import MainContainer from "@/components/common/main";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/shared/schemas";
import Layout from "@/components/common/layout";


const OnboardingPage = () => {
  const [result, action] = useActionState(onboardUser, undefined);

  const [form, fields] = useForm({
    lastResult: result,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">You are almost finished!</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4"
              action={action}
              id={form.id}
              onSubmit={form.onSubmit}
              noValidate
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>First Name</Label>
                  <Input
                    name={fields.firstName.name}
                    key={fields.firstName.key}
                    defaultValue={fields.firstName.initialValue}
                    placeholder="David"
                  />
                  <p className="text-red-500 text-sm">
                    {fields.firstName.errors}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label>Last Name</Label>
                  <Input
                    name={fields.lastName.name}
                    key={fields.lastName.key}
                    defaultValue={fields.lastName.initialValue}
                    placeholder="Paul"
                  />
                  <p className="text-red-500 text-sm">
                    {fields.lastName.errors}
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Address</Label>
                <Input
                  name={fields.address.name}
                  key={fields.address.key}
                  defaultValue={fields.address.initialValue}
                  placeholder="643-83 Hinasecho Sogo"
                />
                <p className="text-red-500 text-sm">{fields.address.errors}</p>
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OnboardingPage;
