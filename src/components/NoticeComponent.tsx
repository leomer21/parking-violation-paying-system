import { FC, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { format } from "date-fns";

import { LprSessionData } from "../types";
import DetailComponent from "./DetailComponent";

interface NoticeProps {
  violation: LprSessionData;
  setActives?: (arg1: LprSessionData[]) => void;
  actives: LprSessionData[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,
};

const NoticeComponent: FC<NoticeProps> = ({
  violation,
  setActives,
  actives,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleActive = (item: LprSessionData) => {
    if (!setActives) return; // Fixed this line
    const index = actives.findIndex((active) => active._id === item._id);

    if (index >= 0) {
      let tempActives = [...actives];
      tempActives.splice(index, 1);
      setActives(tempActives);
    } else setActives([...actives, item]);
  };

  return (
    <div className="flex sm:flex-row sm:gap-0 gap-4 flex-col justify-between border border-[#FFAD92] relative p-2 my-1">
      <div className="flex flex-col">
        <p className="text-base font-bold">
          FLL - Failure to Pay ${violation.fine || violation.lot.fine}
        </p>
        <p className="text-sm">
          Issue Date : {format(violation.entryTime ?? "", "MM/dd/yyyy")}
        </p>
        <p className="text-sm">Plate : {violation.plateNumber}</p>
        <button
          className="text-base font-medium text-[#FA551D]"
          onClick={() => setModalOpen(true)}
        >
          View More Information
        </button>
      </div>
      {setActives && (
        <Button variant="contained" onClick={() => handleActive(violation)}>
          {actives.find((active) => active._id === violation._id)
            ? "UnSelect"
            : "Pay"}
        </Button>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ ...style, height: "100%", overflowY: "scroll" }}>
          <DetailComponent
            violation={violation}
            setActives={setActives}
            onClose={() => setModalOpen(false)}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default NoticeComponent;
