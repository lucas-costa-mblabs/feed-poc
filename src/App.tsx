import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Preview from "./pages/Preview";
import Templates from "./pages/Templates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/builder/:id" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
