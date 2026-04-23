import { Mail, Phone, MapPin, HelpCircle, MessageCircle } from "lucide-react";

function Footer() {
  return (
    <footer className="footer-area">
      <div className="footer-inner">
        <div className="footer-col brand">
          <h3 className="font-bold text-lg">
            {" "}
            ARK Technological Institute Education System Inc.{" "}
          </h3>
          <p>
            Empowering students and teachers through innovative
            technology-driven education using A-LMS, a Smart Teacher-Centered
            Learning Management System with AI Instructional Support.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="font-semibold text-slate-400"> QUICK LINKS </h4>
          <a href="#" className="hover:text-red-500 transition-colors">
            {" "}
            <HelpCircle size={16} /> Helpdesk{" "}
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            {" "}
            <MessageCircle size={16} /> FAQ{" "}
          </a>
        </div>

        <div className="footer-col">
          <h4 className="font-semibold text-slate-400"> CONTACT US </h4>
          <p>
            {" "}
            <MapPin size={25} className="text-red-500" /> J-Seven Building,
            Magallanes Cor Granja St. Brgy 7, Lucena, Philippines, 4301{" "}
          </p>
          <p>
            {" "}
            <Phone size={16} className="text-red-500" /> 0907-082-9390{" "}
          </p>
          <p>
            {" "}
            <Mail size={16} className="text-red-500" />{" "}
            ark.lucena@gmail.com{" "}
          </p>
        </div>
      </div>

      <div className="footer-bottom border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2015 ARK Technological Institute Education System Inc. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
