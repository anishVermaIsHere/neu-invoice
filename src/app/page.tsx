import Layout from "@/components/common/layout";
import LinkElement from "@/components/ui/link";
import Image from "next/image";
export default async function Home() {

  return (
    <Layout>
        <div className="flex flex-col justify-center min-h-screen">
          <div className="py-2 px-4 text-center text-7xl text-gray-700 font-bold">
            Make your <span className="text-indigo-600">Invoice</span> simple <br /> 
          </div>
          <div className="py-2 px-4  text-center text-7xl text-slate-700 font-bold">Send <span className="text-indigo-600">Invoice</span> in seconds </div>
          <div className="mt-10 p-4 flex justify-center">
            <LinkElement href="/login" classes="px-4 py-6 block w-1/2 sm:w-1/3"> Get started </LinkElement>
          </div>
        </div>
        {/* <Image
          src="https://i.pinimg.com/originals/aa/74/2b/aa742b56a7ab591a3a068aefe51ca68c.gif"
          alt="invoice"
          // width={600}
          // height={500}
          layout="fill"
          objectFit="cover"
        /> */}
    </Layout>
  );
}
