import Layout from "@/components/common/layout";
import LinkElement from "@/components/ui/link";
import Image from "next/image";
export default function Home() {
  return (
    <Layout>
        <h1 className="py-2 px-4 text-center text-5xl text-slate-700 font-bold">
          Create your Invoice with <span className="text-indigo-600">AI</span>
        </h1>
        <Image
          src="https://i.pinimg.com/originals/c0/34/17/c03417ebf4f447610528b07a704e0540.gif"
          alt="invoice"
          width={600}
          height={500}
        />

        <div className="mt-10">
          <LinkElement href="/login" classes="px-4 py-2 block min-w-[250px]">
            Login
          </LinkElement>
        </div>
    </Layout>
  );
}
