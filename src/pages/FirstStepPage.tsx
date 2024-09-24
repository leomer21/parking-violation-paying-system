import { FC } from "react";
import { LprSessionData } from "../types";
import { NoticeComponent } from "../components";
import { useAppSelector } from "../redux";

interface FirstStepProps {
  setActives: (arg1: LprSessionData[]) => void;
  actives: LprSessionData[];
}

const FirstStepPage: FC<FirstStepProps> = ({ setActives, actives }) => {
  const { violations } = useAppSelector(({ app }) => app);

  return (
    <div className="p-4">
      <div className="text-[#ffffff] text-base font-medium px-4 py-2 bg-[#091C62] rounded-[10px]">
        Search / Step 1
      </div>
      <div className="text-xl px-4 font-lg font-medium tracking-tight mt-4 mb-2">
        Select Parking Charge Notice to Pay
      </div>
      <p className="text-base w-full tracking-tight mx-1">
        The following Parking Charge Notice(s) were found for the information
        entered. Please verify the Parking Charge Notices you would like to pay
        and select options
      </p>
      <p className="mt-4 mx-1 mb-2 text-base">Parking Charge Notice(s)</p>
      <div className="px-1">
        {violations.map((item: LprSessionData, index) => (
          <NoticeComponent
            key={index}
            violation={item}
            actives={actives}
            setActives={setActives}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstStepPage;
