import { useState } from "react";
import LoginModal from "./LoginModal";

interface NavBarProps {
  onOpenRegister: () => void;
}

function NavBar({ onOpenRegister }: NavBarProps) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="nav-wrap">
        <div className="nav-inner">
          <div className="nav-left flex items-center gap-3">
            <img
              src="/Ark Logo.png"
              alt="ARK Logo"
              className="nav-logo h-[50px] w-auto"
            />
            <div className="nav-title text-[17px] font-bold text-slate-900">
              ARK Technological Institute Education System Inc.
            </div>
          </div>

          <div className="nav-right flex items-center gap-[35px]">
            <a
              href="#"
              className="nav-link text-slate-900 no-underline font-medium hover:text-red-600 transition-colors"
            >
              <strong>Helpdesk</strong>
            </a>
            <a
              href="#"
              className="nav-link text-slate-900 no-underline font-medium hover:text-red-600 transition-colors"
            >
              <strong>FAQ</strong>
            </a>
            <button
              className="nav-login-btn bg-[#e02424] text-white px-6 py-2 rounded-full font-semibold transition-all hover:bg-[#c81e1e] hover:-translate-y-0.5"
              onClick={() => setShowLogin(true)}
            >
              Log in
            </button>
          </div>
        </div>
      </header>

      {/* This connects the Navbar to the Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false); // Close modal first
          onOpenRegister(); // Then trigger the view change in App.tsx
        }}
      />
    </>
  );
}

export default NavBar;
