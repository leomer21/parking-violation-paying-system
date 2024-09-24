import { FC, useEffect, useState } from "react";
import { Stripe } from "@stripe/stripe-js";
import { format } from "date-fns";

import success from "../assets/Success.gif";

interface CompletionPageProps {
  stripePromise: Promise<Stripe | null>;
}

const CompletionPage: FC<CompletionPageProps> = ({ stripePromise }) => {
  const [emial, setEmail] = useState<string | null>(null);
  // const [ids, setIds] = useState<string[]>([]);
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      if (!stripe) {
        return;
      }

      const url = new URL(window.location.href);

      // const ids = url.searchParams.get("ids");
      // ids && setIds(ids.split(","));
      const amount = url.searchParams.get("amount");
      amount && setAmount(amount);
      const receiptEmail = url.searchParams.get("receiptEmail");
      receiptEmail && setEmail(receiptEmail);
    });
  }, [stripePromise]);

  return (
    <div className="flex items-center justify-center w-full h-full completion">
      <div className="rounded-2xl bg-[#FFFAF9] py-4 pb-8 px-8 sm:px-20 shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <div className="mt-5">
            <img
              src={success}
              width={100}
              alt="Success"
              className="success-img"
            />
          </div>
          <p className="sm:text-4xl text-2xl text-[#FA551D] font-bold mt-4">
            Payment succeeded!
          </p>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Amount:{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              ${amount}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Receipt Email:{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              {emial}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="sm:text-xl text-md text-[grey] font-bold mt-4">
              Payment Date (EDT):{" "}
            </p>
            <p className="sm:text-xl text-md text-[#091C62] font-bold mt-4 ml-2">
              {format(new Date(), "MM/dd/yyyy HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl text-[red] font-bold mt-6">
            Thanks for your park!
          </p>
          <a href="/" className="text-xl text-[#091C62] underline mt-4">
            HOME
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;
