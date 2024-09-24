import { FC, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  InputTextComponent,
  NoticeComponent,
  SelectComponent,
  StripeComponent,
} from "../components";

import { LprSessionData } from "../types";
import { getClientSecret, payForParking } from "../redux/slice/appReducer";
import { useAppDispatch, useAppSelector } from "../redux";

import { states, appearance } from "../config";

interface SecondStepProps {
  actives: LprSessionData[];
}

const SecondStepPage: FC<SecondStepProps> = ({ actives }) => {
  const dispatch = useAppDispatch();
  const { clientSecret } = useAppSelector(({ app }) => app);

  const [amount, setAmount] = useState<number>(0);
  const [ids, setIds] = useState<string[]>([]);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState("Florida");
  const [zipCode, setZipCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const amount = actives.reduce(
      (total, item) => total + (item.fine || item.lot.fine),
      0
    );
    setAmount(amount);

    setIds(actives.map((item) => item.noticeNumber || ""));
    dispatch(getClientSecret(amount * 100));
  }, [actives]);

  const handlePay = (email: string) => {
    dispatch(
      payForParking({
        ids,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        phoneNumber,
      })
    );
  };

  return (
    <>
      <div className="py-4 px-4">
        <div className="text-[#ffffff] text-base font-medium px-4 py-2 bg-[#091C62] rounded-[10px]">
          Search / Step 1 / Step 2
        </div>
        <p className="text-base tracking-tight mx-1 mt-4">
          Please complete all fields with your payment card details and then
          click "Pay Now"
        </p>
        <p className="mt-4 mx-1 mb-2 text-base">Parking Charge Notice(s)</p>
        <div className="px-1 mb-4">
          {actives.map((item: LprSessionData, index) => (
            <NoticeComponent key={index} violation={item} actives={actives} />
          ))}
        </div>
        <div className="h-auto border border-[#091C62] flex flex-col items-end px-4 py-2 mx-1">
          <p className="text-base font-medium">
            Parking Charge Notice: ${amount}
          </p>
          <p className="text-base font-medium">
            Online Payment Convenience: $4.99
          </p>
          <p className="text-base font-medium">
            Total Parking Charge Notice: ${amount + 4.99}
          </p>
        </div>
        <div>
          <div className="w-full h-auto px-1 mt-4">
            <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-md tracking-tight">
              Payment Information
            </div>
            <div className="flex flex-col border border-[#091C62] rounded-b-md p-4">
              <InputTextComponent
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                size="small"
              />
              <div className="mt-4">
                <InputTextComponent
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  size="small"
                />
              </div>
              <div className="mt-4">
                <InputTextComponent
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  size="small"
                />
              </div>
              <div className="mt-4">
                <InputTextComponent
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  size="small"
                />
              </div>
              <div className="mt-4">
                <SelectComponent
                  items={states}
                  value={state}
                  onChange={(e) => setState(e.target.value as string)}
                  size="small"
                />
              </div>
              <div className="mt-4">
                <InputTextComponent
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zipcode"
                  size="small"
                />
              </div>
              <div className="mt-4">
                <InputTextComponent
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  size="small"
                />
              </div>
              <div className="flex justify-center items-center mt-4 w-full">
                <hr className="w-[30%] h-auto border-[#FA551D] opacity-100" />
                <div className="mx-4 text-[#FA551D] italic text-xl font-medium font-sans tracking-tighter">
                  Stripe
                </div>
                <hr className="w-[30%] h-auto border-[#FA551D] opacity-100" />
              </div>
              {clientSecret && (
                <Elements
                  options={{ clientSecret, appearance }}
                  stripe={loadStripe(import.meta.env.VITE_API_STRIPE_TEST)}
                >
                  <StripeComponent
                    clientSecretKey={clientSecret}
                    handlePay={handlePay}
                    ids={ids}
                    amount={amount}
                  />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondStepPage;
