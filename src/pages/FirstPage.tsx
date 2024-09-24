import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { InputTextComponent, SelectComponent } from "../components";
import { states } from "../config";

import { useAppDispatch } from "../redux";
import {
  fetchViolation,
  fetchViolations,
  setNotice,
  setPlate,
} from "../redux/slice/appReducer";
import { delay } from "../utils";

const First = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [noticeNumber, setNoticeNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [state, setState] = useState("Florida");
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (noticeNumber) {
      setLoading(true);
      dispatch(setNotice(noticeNumber));
      dispatch(fetchViolation(noticeNumber));
      await delay(2000);
      navigate("/pay/first");
    } else if (plateNumber) {
      setLoading(true);
      dispatch(setPlate(plateNumber));
      dispatch(fetchViolations(plateNumber));
      await delay(2000);
      navigate("/pay/first");
    } else {
      setError("Please enter the required information.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full firstPage">
      <div className="flex flex-col justify-around items-center bg-white rounded-md h-full md:w-[500px] w-full">
        <p
          className="text-2xl font-bold text-blue-800 tracking-normal uppercase relative"
          style={{
            fontFamily: "'Georgia', serif", // Using Georgia for a more traditional feel
            letterSpacing: "0.05em", // Adjust letter spacing
            textShadow: `
              1px 1px 3px rgba(0, 0, 0, 0.5), 
              2px 2px 5px rgba(0, 0, 0, 0.3)
            `, // Adjusted shadow for a subtle depth
          }}
        >
          City Park Monitoring
        </p>
        <div className="text-[#091C62] text-xl font-bold font-sans tracking-tighter">
          Manage your notice
        </div>
        <div className="flex flex-col items-center border border-[#FA551D] sm:w-[420px] w-[84%] rounded-md p-4">
          <div className="w-full">
            <InputTextComponent
              label="Violation Notice Number"
              value={noticeNumber}
              onChange={(e) => setNoticeNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center mt-4 w-full">
            <hr className="w-[30%] h-auto border-[#FA551D] opacity-100" />
            <div className="mx-4 text-[#FA551D] italic text-xl font-medium font-sans tracking-tighter">
              OR
            </div>
            <hr className="w-[30%] h-auto border-[#FA551D] opacity-100" />
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-4 mt-4">
            <div className="sm:w-[60%] w-full">
              <InputTextComponent
                label="Plate Number"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <SelectComponent
                items={states}
                value={state}
                onChange={(e) => setState(e.target.value as string)}
              />
            </div>
          </div>
          <div className="flex justify-center w-full mt-4">
            <Button
              className="w-full h-12"
              sx={{ fontSize: 20 }}
              variant="contained"
              onClick={handleContinue}
            >
              {isLoading ? (
                <div className="flex space-x-2 justify-center items-center dark:invert">
                  <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
                </div>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
        <div className="flex flex-col items-center">
          <p className="text-base text-center">
            Etico Parking ©2024. All rights reserved
          </p>
          <div className="flex">
            <a
              href="https://pkg-shared-files.s3.amazonaws.com/brands/etico/docs/privacy.pdf"
              className="text-base text-[blue] underline hover:text-[red]"
            >
              Privacy Policy
            </a>
            <p className="text-base text-[grey] mx-2"> | </p>
            <a
              href="https://pkg-shared-files.s3.amazonaws.com/brands/etico/docs/terms.pdf"
              className="text-base text-[blue] underline hover:text-[red]"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;
