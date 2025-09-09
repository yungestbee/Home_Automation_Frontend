import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoorControl from './controller';
import Email from './Email';
import LoginPage from './LoginPage'




function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/controls" element={<DoorControl />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/update-email" element={<Email />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

