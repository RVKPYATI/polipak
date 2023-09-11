import React, { forwardRef } from "react";

const PrintLabel = ({ dataForPrint }, ref) => {
  return (
    <div className="flex-col w-96 mx-1 my-3  p-2 gap-2 border-2" ref={ref}>
      <style>
        {`
          @page {
            size: auto;
            orientation: portrait;
            margin: 1cm;
          }
        `}
      </style>
      <img src="./logo.png" alt="Logo Polipack" className="mb-2" />
      <div>
        Продукт:{" "}
        {dataForPrint.currentWorkOrder + "-" + dataForPrint.response.serial}
      </div>
      <div>Серийный номер: {dataForPrint.response.serial}</div>
      <div>
        Дата производства:{" "}
        {dataForPrint.response.date
          .split("T")[0]
          .split("-")
          .reverse()
          .join(".")}
      </div>
    </div>
  );
};

export default forwardRef(PrintLabel);
