import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LinkElement from "@/components/ui/link";
import Section from "@/components/common/section";

export default function Custom404() {
  return (
    <Section classes="grid place-items-center min-h-screen p-10">
      <Alert className="max-w-lg flex justify-center items-center flex-col shadow-lg">
        <AlertTitle className="font-semibold text-xl">Error</AlertTitle>
        <AlertDescription className="mb-5 text-xl">404. Page not found</AlertDescription>

        <LinkElement href="/">Go to Home</LinkElement>
      </Alert>
    </Section>
  );
}
