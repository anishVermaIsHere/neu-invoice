"use server";
import { getAuth, signOut } from "@/auth";
import { updateUser } from "@/lib/prisma/utils";
import { onboardingSchema } from "@/shared/schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";



export const handleLogout = async () => await signOut();

export const onboardUser = async (prevState: any, formData: FormData) => {
  const session = await getAuth();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  await updateUser(session?.user?.id as string, submission.value);

  return redirect("/dashboard");
};
