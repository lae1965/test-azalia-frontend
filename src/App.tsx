import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';

import { MessageBoard } from './Components/MessageBoard';
import { Digits } from './Components/Digits';
import { NotFound } from './Components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MessageBoard />} />
        <Route path="/digits" element={<Digits />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
