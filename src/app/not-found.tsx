import LinkElement from "@/components/ui/link";
import Section from "@/components/common/section";
import BackButton from "@/components/common/back-button";

export default function Custom404() {
  return (
    <Section classes="grid place-items-center min-h-screen p-10">
      <div className="p-5 max-w-lg grid place-items-center">
        <h1 className="text-8xl font-semibold text-center text-gray-500 mb-8">
          ☹️ <br />
          404
        </h1>
        <p className="font-semibold text-2xl text-center mb-5">
          Page not found!
        </p>
        <LinkElement classes="w-full mb-4" href="/">
          Go to Home
        </LinkElement>
        <BackButton classes="w-full justify-center" />
      </div>
    </Section>
  );
}
