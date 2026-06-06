import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import FindBusinessPages from "./pages/FindBusinessPage";
import EditBusinessPage from "./pages/EditBusinessPage";
import ViewDocumentPage from "./pages/ViewDocumentPage";

import './App.css'

function AppContent() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
        <Route path="/find" element={<FindBusinessPages />}/>
        <Route path="/edit-business/:id" element={<EditBusinessPage />} />
        <Route path="/view-business/:id" element={<ViewDocumentPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
