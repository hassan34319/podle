import { redirect } from "next/navigation";
import { getSessionServer } from "../utils/getCurrentUser";



interface StripeProduct {
  id: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  object: string;
  quantity: number | null;
  price: {
    unit_amount: number;
  } | null;
}

async function success({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSessionServer()
  const getStripeProducts = async (sessionId: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/getSession?session_id=${sessionId}`;
    const res = await fetch(url);

    if (!res.ok) return;

    const data = await res.json();
    console.log("=>", data);
    const products = data?.session?.data;

    return  products ;
  };

  const session_id = (searchParams?.session_id as string) || "none";
  const products = await getStripeProducts(session_id!);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <main className="h-max bg-black pb-10 text-white ">
      {/* Hero Section */}
      <div className="bg-white  h-[80vh] md:h-[75vh] lg:h-[100vh] w-full rounded-b-[60px] text-black">
        {/* Header */}
        <h1 className=" text-green-500 md:pt-[10vh] pt-[6vh] font-extrabold text-2xl md:text-4xl lg:text-5xl text-center w-[95%] md:w-[90%] mx-auto ">
          SUCCESS!
        </h1>
        {/* Main Content */}
      </div>
    </main>
  );
}

export default success;
