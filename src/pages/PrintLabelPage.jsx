import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import PrintLabel from "../components/PrintLabel/PrintLabel";

export const PrintLabelPage = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Этикетка",
  });

  return (
    <div>
      <PrintLabel ref={componentRef} />
      <button
        className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white ml-10 -mt-6"
        onClick={handlePrint}
      >
        Печать
      </button>
    </div>
  );
};
