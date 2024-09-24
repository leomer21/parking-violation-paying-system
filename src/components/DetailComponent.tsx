import { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { PDFDocument } from "pdf-lib";

import { LprSessionData } from "../types";

import closeBtn from "../assets/Closebtn.svg";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux";
import { fetchTemplePdfFile } from "../redux/slice/appReducer";
import { base64ToBlob } from "../utils";
import { useNavigate } from "react-router-dom";

interface DetailProps {
  violation: LprSessionData;
  onClose: () => void;
  setActives?: (arg1: LprSessionData[]) => void;
}
const DetailComponent: FC<DetailProps> = ({
  violation,
  setActives,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pdf } = useAppSelector(({ app }) => app);
  const [pdfDoc, setPDFDoc] = useState<PDFDocument | null>(null);

  const handlePrint = async () => {
    if (pdfDoc !== null) {
      const form = pdfDoc.getForm();
      const fieldData = [
        {
          name: "Date",
          value: format(violation.entryTime ?? "", "MM/dd/yyyy"),
        },
        { name: "Payment Type", value: "N/A" },
        { name: "Status", value: "Unpaid" },
        { name: "Parking Item", value: "1" },
        { name: "Parking Charge Number", value: violation.noticeNumber },
        { name: "Parking Charge Type", value: "FLL - Failure to Pay" },
        {
          name: "Amount Due",
          value: `$${violation.fine || violation.lot.fine}`,
        },
        { name: "Amount Paid", value: "$0.00" },
        { name: "Total Amount Paid", value: "$0.00" },
        { name: "Total Amount Due", value: "$0.00" },
      ];
      fieldData.forEach(({ name, value }) => {
        const field = form.getTextField(name);
        field.setText(value);
        field.enableReadOnly();
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const blobURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobURL;
      downloadLink.download = `${violation.plateNumber}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  useEffect(() => {
    dispatch(fetchTemplePdfFile());
  }, []);

  useEffect(() => {
    const loadPdf = async () => {
      if (pdf) {
        const blob = base64ToBlob(pdf);
        const pdfDoc = await PDFDocument.load(await blob.arrayBuffer());
        setPDFDoc(pdfDoc);
      }
    };
    loadPdf();
  }, [pdf]);

  return (
    <div className="flex flex-col relative">
      <div className="bg-[#FA551D] p-3 text-white text-2xl rounded-t-md font-medium">
        More Information
      </div>
      <button
        onClick={onClose}
        className="absolute right-[10px] top-3 w-[36px]"
      >
        <img className="close-btn" src={closeBtn} alt="close"></img>
      </button>
      <div className="border-x border-b border-[#FA551D]">
        <div className="p-4 flex flex-col">
          <div className="flex justify-between border rounded-t-md text-base py-2 px-4">
            <div>Parking Charge Notice Number:</div>
            <div>{violation.noticeNumber}</div>
          </div>
          <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>Issue Date:</div>
            <div>{format(violation.entryTime ?? "", "MM/dd/yyyy")}</div>
          </div>
          <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>Location:</div>
            <div>{violation.lot.address}</div>
          </div>
          <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>License Plate:</div>
            <div>{violation.plateNumber}</div>
          </div>
          {/* <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>VIN:</div>
            <div>??</div>
          </div> */}
          <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>Parking Charge Notice:</div>
            <div>FLL-Failure to Pay</div>
          </div>
          {/* <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>Vehicle Color:</div>
            <div>??</div>
          </div>
          <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>Vehicle Make:</div>
            <div>??</div>
          </div>
          <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>Vehicle Model:</div>
            <div>??</div>
          </div>
          <div className="flex justify-between border-x border-b text-base py-2 px-4">
            <div>Officer:</div>
            <div>??</div>
          </div> */}
        </div>
        <div className="border-x px-4">
          <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-md tracking-tight">
            Notes
          </div>
          <div className="flex flex-col border border-[#grey] px-4 py-2 rounded-b-md tracking-tight">
            1. TO PAY OR APPEAL Go to the website below. Unpaid parking notices
            may result in your vehicle being booted or towed at your risk &
            expense at any Professinal Parking Management affiliated locations.
            Any dispute must be subnitted WITHIN 15days of the date of this
            notice.
          </div>
        </div>
        <div className="border-x p-4">
          <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-md tracking-tight">
            <div className="flex justify-between">
              <p>Total Parking Charge Notice</p>
              <p>${violation.fine || violation.lot.fine}</p>
            </div>
          </div>
          <div className="flex flex-col tracking-tight">
            <div className="flex justify-between border-x border-b border-[#grey] px-4 py-2">
              <p>Online Payment Convenience Fee</p>
              <p>${9.98}</p>
            </div>
            <div className="flex justify-between border-x border-b border-[#grey] px-4 py-2 rounded-b-md">
              <p>{new Date().toLocaleDateString()} Late Amount</p>
              <p>${(violation.fine || violation.lot.fine) + 9.98}</p>
            </div>
          </div>
        </div>
        <div className="border-x px-4 pb-2">
          <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-md tracking-tight">
            Notes
          </div>
          <div className="flex flex-col border border-[#grey] bg-[#FFF5F3] px-4 py-2 rounded-b-md tracking-tight">
            You cannot appeal any more. Past the appeal date.
          </div>
        </div>
        <div className="border-x px-4 py-3">
          <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-md tracking-tight">
            Photos:
          </div>
          <div className="flex gap-4 border justify-center border-[#grey] p-4 rounded-b-md tracking-tight">
            <div className="w-[45%] aspect-h-1 aspect-w-1 p-2 border rounded-[10px] border-[#grey]">
              <img
                src={`${import.meta.env.VITE_API_PUBLIC_URL}/${
                  violation.vehicle1
                }`}
                className="h-full object-cover"
                alt="camera"
              ></img>
            </div>
            {violation.vehicle2 && (
              <div className="w-[45%] aspect-h-1 aspect-w-1 p-2 border rounded-[10px] border-[#grey]">
                <img
                  src={`${import.meta.env.VITE_API_PUBLIC_URL}/${
                    violation.vehicle2
                  }`}
                  className="h-full object-cover"
                  alt="camera"
                ></img>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mb-4 mx-4">
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </div>
          <div className="mb-4 mx-4">
            <Button variant="contained" onClick={handlePrint}>
              Print
            </Button>
          </div>
          <div className="mb-4 mx-4">
            {setActives && (
              <Button
                variant="contained"
                onClick={() => {
                  setActives([violation]);
                  navigate("/pay/second");
                }}
              >
                Pay
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
