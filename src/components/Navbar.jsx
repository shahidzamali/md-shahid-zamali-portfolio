
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Certificates", id: "certificates" },
  { label: "Gallery", id: "gallery" },
  { label: "Blog", id: "blog" },
  { label: "Resume", id: "resume" },
  { label: "About Me", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);

  // Start every fresh page load at Home and use one
  // scroll listener to keep the active link synchronized.
  useEffect(() => {
    const cleanUrl =
      window.location.pathname + window.location.search;

    window.history.replaceState(null, "", cleanUrl);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setActiveSection("home");

    let frameId;

    const handleScroll = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const sections = links
          .map((link) => document.getElementById(link.id))
          .filter(Boolean);

        if (!sections.length) return;

        const navHeight =
          navRef.current?.getBoundingClientRect().height ?? 80;

        const activeLine = navHeight + 30;
        let current = sections[0].id;

        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activeLine) {
            current = section.id;
          } else {
            break;
          }
        }

        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 5;

        if (atBottom) current = "contact";

        setActiveSection(current);

        const hash = `#${current}`;

        if (window.location.hash !== hash) {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}${hash}`
          );
        }
      });
    };

    const resetToHome = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setActiveSection("home");
    };

    // Hash removal prevents the browser from restoring #contact
    // or another section on refresh.
    resetToHome();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Navigate to a section when a Navbar link is clicked.
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) {
      console.error(`Navbar section not found: #${id}`);
      return;
    }

    setActiveSection(id);
    setIsOpen(false);

    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${id}`
    );

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const linkStyle = (isActive) => ({
    position: "relative",
    color: isActive ? "var(--accent)" : "#fff",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    cursor: "pointer",
  });

  const renderActiveLine = (id) =>
    activeSection === id && (
      <motion.div
        layoutId="navbar-active-line"
        style={{
          width: "70%",
          height: "2px",
          marginTop: "5px",
          borderRadius: "5px",
          background: "var(--accent)",
          boxShadow: "0 0 8px var(--accent)",
        }}
      />
    );

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.8rem 2rem",
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Logo and name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              fontWeight: "bold",
              fontSize: "1.4rem",
              color: "var(--accent)",
            }}
          >
            SZ
          </motion.div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#fff",
              }}
            >
              Md Shahid Zamali
            </h1>

            <div
              style={{
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              Java Full Stack • Developer
            </div>
          </div>
        </div>

        {/* Desktop navigation */}
        <div
          className="desktop-navbar-links"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flex: 1,
            marginLeft: "2rem",
          }}
        >
          {links.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                style={linkStyle(isActive)}
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>{link.label}</span>
                  {renderActiveLine(link.id)}
                </motion.div>
              </a>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="navbar-mobile-button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.8rem",
            cursor: "pointer",
          }}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="navbar-mobile-menu"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              boxSizing: "border-box",
              background: "rgba(0,0,0,0.96)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "5rem",
              overflowY: "auto",
              zIndex: 9999,
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                style={{
                  width: "100%",
                  padding: "1rem 0",
                  textAlign: "center",
                  textDecoration: "none",
                  color:
                    activeSection === link.id
                      ? "var(--accent)"
                      : "#fff",
                  fontSize: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive navigation */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-navbar-links {
            display: none !important;
          }

          .navbar-mobile-button {
            display: block !important;
          }
        }

        @media (min-width: 901px) {
          .navbar-mobile-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
