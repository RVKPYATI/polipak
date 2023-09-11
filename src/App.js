import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useSession } from "./hooks/useSession";
import { Workers } from "./components/WorkOrders/Workers";
import { LoginPage } from "./pages/LoginPage";
import { ArmPage } from "./pages/ArmPage";
import { PrintLabelPage } from "./pages/PrintLabelPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const { getSession } = useSession();

  useEffect(() => {
    const auth = getSession("session");
    if (auth) {
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<LoginPage setIsAuth={setIsAuth} />} />

      {isAuth && (
        <>
          <Route path="/workers" element={<Workers />} />
          <Route path="/workers/label" element={<PrintLabelPage />} />
          <Route path="/arm" element={<ArmPage />} />
        </>
      )}
    </Routes>
  );
}

export default App;
