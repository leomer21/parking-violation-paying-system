import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import FirstStepPage from "./FirstStepPage";
import { useAppSelector } from "../redux";
import SecondStepPage from "./SecondStepPage";
import { LprSessionData } from "../types";

const PayPage = () => {
  const navigate = useNavigate();
  const { notice, plate, violations } = useAppSelector(({ app }) => app);

  const [actives, setActives] = useState<LprSessionData[]>([]);

  useEffect(() => {
    !notice && !plate && navigate("/");
  }, [notice, plate]);

  return (
    <div className="bg-[#EFF3FF] h-full">
      <div className="flex items-center justify-between sm:justify-start p-4">
        <a href="/">
          <img
            src="https://i.ibb.co/HBQk2wd/logo.png"
            alt="logo"
            className="h-[80px] cursor-pointer"
          ></img>
        </a>
      </div>

      {actives.length ? (
        <div className="flex justify-center gap-16 w-full bg-[#9ec5ff] py-4 absolute">
          <div className="text-[#091C62] pr-6 text-lg font-semibold pt-2">
            Amount To Pay: $
            {actives.reduce(
              (total, item) => total + (item.fine || item.lot.fine),
              0
            )}
          </div>
          <Button variant="contained" onClick={() => navigate("/pay/second")}>
            Pay Now
          </Button>
        </div>
      ) : (
        <></>
      )}

      {violations.length ? (
        <div className="flex justify-center px-4 py-24">
          <div className="flex flex-col w-[420px] max-w-[420px] bg-white rounded">
            <div className="bg-[#FA551D] w-full py-3 px-5 text-white text-xl rounded-t-md">
              Parking Charge Notice Results
            </div>
            <div className="border-x border-[#FA551D] w-full">
              <Routes>
                <Route
                  path="first"
                  element={
                    <FirstStepPage setActives={setActives} actives={actives} />
                  }
                />
                <Route
                  path="second"
                  element={<SecondStepPage actives={actives} />}
                />
              </Routes>
            </div>
            <div className="flex bg-[#FA551D] w-full rounded-b-md items-center">
              <div className="  py-3 pl-5 text-white text-lg  font-medium">
                Copyright 2024
              </div>
              <a
                href="https://pkg-shared-files.s3.amazonaws.com/brands/etico/docs/privacy.pdf"
                className="text-base text-white hover:text-[blue] px-4"
              >
                Privacy Policy
              </a>
              <a
                href="https://pkg-shared-files.s3.amazonaws.com/brands/etico/docs/terms.pdf"
                className="text-base text-white hover:text-[blue]"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-16">
          <p
            className="text-2xl font-bold text-red-500 tracking-normal uppercase relative"
            style={{
              fontFamily: "'Georgia', serif", // Using Georgia for a more traditional feel
              letterSpacing: "0.05em", // Adjust letter spacing
            }}
          >
            No violations
          </p>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default PayPage;
