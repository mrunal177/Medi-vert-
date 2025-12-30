import { useEffect, useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false); // hidden by default
  const [active, setActive] = useState("home");
  const tabs = [
    { id: "home", label: "Home" },
    { id: "problem", label: "Problem" },
    { id: "how", label: "How It Works" },
    { id: "impact", label: "Impact" },
    { id: "dropoff", label: "Drop-Offs" },
    { id: "community", label: "Community" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setVisible(true); // show navbar after 70% of hero
      } else {
        setVisible(false); // hide navbar on hero
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full bg-[#F5F1E9] shadow-md z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <div className="text-[#3B8650] font-bold text-xl">Medivert</div>
        <ul className="flex space-x-6">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer ${
                active === tab.id
                  ? "text-[#3B8650] font-semibold"
                  : "text-gray-700"
              } hover:text-[#3B8650] transition`}
              onClick={() => scrollToSection(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
