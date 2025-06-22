import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
function Protectedd({ children }) {
  const token = localStorage.getItem('authtoken')
  if (token) {
    return children;
  }
  else {
    return <Navigate to="/" replace />;
  }
}
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Protectedd><Dashboard /></Protectedd>} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        icon
        hideProgressBar={true}
        closeButton={false}
        pauseOnHover={true}
        draggable={false}
        theme="light"
        toastStyle={{
          background: "#00000",
          color: "#111",
          fontWeight: "medium",
          borderRadius: "0.7rem",
          padding: "1rem",
          fontSize: '14px',
          fontFamily:'sans-serif',
          fontStyle:'poppins'
        }}
      />
    </>
  );
}
export default App;
