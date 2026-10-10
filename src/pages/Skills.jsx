import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const SKILLS = [
  // Programming Languages
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },

  // Frontend
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },

  // Java Backend
  {
    name: "Spring",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Spring Boot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Hibernate",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg",
  },
  {
    name: "Maven",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
  },

  // Database & Tools
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
];

const ROWS = [
  [
    {
      title: "Programming Languages",
      items: ["Java", "C++", "Python"],
    },
    {
      title: "Frontend Technologies",
      items: ["HTML", "CSS", "JavaScript", "React.js"],
    },
    {
      title: "Java Backend",
      items: [
        "Core Java",
        "JDBC",
        "Servlet",
        "JSP",
        "Hibernate",
        "Spring",
        "Spring Boot",
        "Spring MVC",
        "Spring Data JPA",
        "REST API",
      ],
    },
    {
      title: "Database & Tools",
      items: [
        "MySQL",
        "Git",
        "GitHub",
        "Maven",
        "Postman",
      ],
    },
  ],

  [
    {
      title: "Core Concepts",
      items: [
        "Object Oriented Programming (OOPs)",
        "Collections Framework",
        "Exception Handling",
        "Multithreading",
        "Data Structures & Algorithms (DSA)",
        "Database Management System (DBMS)",
        "Computer Networks (CN)",
        "Operating System (OS)",
      ],
    },
    {
      title: "Development Concepts",
      items: [
        "MVC Architecture",
        "RESTful Web Services",
        "CRUD Operations",
        "API Integration",
        "Authentication & Authorization",
        "JPA & ORM",
        "Database Connectivity",
      ],
    },
    {
      title: "Soft Skills",
      items: [
        "Teamwork",
        "Problem Solving",
        "Creativity",
        "Adaptability",
        "Communication",
      ],
    },
  ],
];

export default function Skills() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const circles = Array.from(
      stage.querySelectorAll(".skill-circle")
    );

    const rect = stage.getBoundingClientRect();
    const placed = [];

    const isOverlapping = (x, y, size) => {
      return placed.some((p) => {
        const dx = p.x - x;
        const dy = p.y - y;

        return (
          Math.sqrt(dx * dx + dy * dy) <
          p.size / 2 + size / 2 + 40
        );
      });
    };

    circles.forEach((circle) => {
      const size = circle.offsetWidth;

      let x;
      let y;
      let tries = 0;

      do {
        x = Math.random() * (rect.width - size - 20);
        y = Math.random() * (rect.height - size - 20);

        tries++;
      } while (
        isOverlapping(x, y, size) &&
        tries < 150
      );

      placed.push({
        x,
        y,
        size,
      });

      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;

      circle.animate(
        [
          {
            transform: "translate(0, 0)",
          },
          {
            transform: `translate(${dx}px, ${dy}px)`,
          },
        ],
        {
          duration: 5000 + Math.random() * 2000,
          direction: "alternate",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  }, []);

  return (
    <section
      className="skills-container"

    >
      {/* ================= HEADER ================= */}

      <motion.div
        className="skills-header"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <h2 className="text-5xl text-cyan-400 font-semibold mb-3">
          My Skills
        </h2>

        <div className="w-28 h-[2px] bg-cyan-400 mx-auto mb-6"></div>

        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          ✨ Building scalable full-stack applications using
          Java, Spring Boot and modern frontend technologies.
        </p>
      </motion.div>

      {/* ================= FLOATING SKILLS ================= */}

      <motion.div
        className="skills-stage relative mx-auto mb-20"
        ref={stageRef}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        style={{
          width: "100%",
          height: "550px",
          borderRadius: "25px",
          background:
            "radial-gradient(circle at 50% 50%, #0a0a0a, #101010)",
          overflow: "hidden",
          boxShadow:
            "inset 0 0 60px rgba(0,255,255,0.07)",
          position: "relative",
        }}
      >
        {SKILLS.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-circle"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: index * 0.08,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.3,
              boxShadow:
                "0 0 35px 10px rgba(0,255,255,0.6)",
              background:
                "rgba(0,255,255,0.12)",
            }}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background:
                "rgba(0,255,255,0.06)",
              border:
                "1px solid rgba(0,255,255,0.25)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              transition:
                "box-shadow 0.4s ease, background 0.4s ease",
            }}
          >
            <motion.img
              src={skill.logo}
              alt={skill.name}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 8px rgba(0,255,255,0.4)) brightness(1.2)",
                marginBottom: "5px",
              }}
              whileHover={{
                filter:
                  "drop-shadow(0 0 12px rgba(0,255,255,0.9)) brightness(1.6)",
                rotate: [0, 6, -6, 0],
                transition: {
                  duration: 0.5,
                },
              }}
            />

            <span
              style={{
                color:
                  "rgba(180,255,255,0.9)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.3px",
                textAlign: "center",
              }}
            >
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ================= SKILLS TABLE ================= */}

      <div className="skills-table">
        {ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="skills-row"
          >
            {row.map((column, columnIndex) => (
              <motion.div
                key={column.title}
                className="skill-box"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    (rowIndex + columnIndex) * 0.1,
                }}
              >
                <h3>{column.title}</h3>

                <ul>
                  {column.items.map(
                    (item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        whileHover={{
                          x: 6,
                          color: "#00ffc8",
                        }}
                      >
                        {item}
                      </motion.li>
                    )
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}