import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "../CSS/Gallery.css";

const IMAGES = {
  personal: [
    {
    id: 1,
    caption: "Focused study time — building my future 📚💻",
    photos: ["/gallery/2.webp"],
  },
  {
    id: 2,
    caption: "Discipline now, results later 📚💻",
    photos: ["/gallery/1.jpeg"],
  },
  {
      id: 3,
      caption: "Focused. Determined. Consistent.",
      photos: ["/gallery/5.jpeg",],
    },
     {
    id: 4,
    caption: "Grateful for everything, chasing more 💫",
    photos: ["/gallery/4.jpeg"],
  },
   {
    id: 5,
    caption: "Horse riding adventure — fearless vibes 🐎🔥",
    photos: ["/gallery/3.jpg"],
  },
   {
    id: 7,
    caption: "Enjoy the journey, not just the destination. 🚀",
    photos: ["/gallery/6.jpeg"],
  },
    
  ],
   collegeLife: [
    {
      id: 1,
      caption: "College fest moments 🎉",
      photos: ["/gallery/collagefest.jpg",],
    },
    {
      id: 2,
      caption: "College fest moments 🎉",
      photos: [ "/gallery/collagefest2.jpg"],
    },
    {
      id: 3,
      caption: "Campus memories with friends 🎓❤️",
      photos: ["/gallery/college1.jpg"],
    },
    {
      id: 4,
      caption: "College fest nights with friends 🎉✨",
      photos: ["/gallery/collegefriend.jpeg"],
    },
    {
      id: 5,
      caption: "Campus memories with friends 🎓❤️",
      photos: ["/gallery/collegelife.jpg"],
      
    },
    {
      id: 6,
      caption: "Campus memories with friends 🎓❤️",
      photos: ["/gallery/college4.jpg"],
      
    },
    
  ],
   travelDiaries: [
    {
      id: 1,
      caption: "Mountains calling, and I must go 🏔️🔥",
      photos: ["/gallery/trav3.jpg"],
    },
    {
      id: 2,
      caption: "Sky above, earth below, peace within ☁️🌍",
      photos: ["/gallery/trav2.jpg"],
    },
    {
      id: 3,
      caption: "Journey matters more than the destination 🚀",
      photos: ["/gallery/trav1.jpg"],
    },
    {
      id: 4,
      caption: "Proud to witness the spirit of the nation at Wagah Border",
      photos: ["/gallery/pic2.jpg"],
    },
    {
      id: 5,
      caption: "An honor to stand beside the real heroes of our nation.",
      photos: ["/gallery/pic1.jpg"],
    },
    {
      id: 6,
      caption: "Creating memories with the people who matter most 🤍",
      photos: ["/gallery/pic3.jpg"],
    },
  ],
  projects: [
    {
      id: 1,
      caption:
        "E-commerce Platform – Full-stack web app with product management, cart, authentication, and order processing built using React, Node.js, and MongoDB.",
      photos: ["/gallery/p1.png", "/gallery/p2.png","/gallery/p3.png", "/gallery/p4.png"],
    },
    {
      id: 1,
      caption:
        "E-commerce Platform – Full-stack web app with product management, cart, authentication, and order processing built using React, Node.js, and MongoDB.",
      photos: ["/gallery/project2.png", "/gallery/project22.png"],
    },
  ],
  achievements: [
    {
      id: 1,
      caption: "Solved 100 LeetCode questions 🏆!",
      photos: ["/gallery/leet.png"],
    },
    {
      id: 2,
      caption: "Honored for active participation and performance in college event 🎉",
      photos: ["/gallery/achive2.jpg"],
    },
  ],
};

// ✨ Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ✨ Tab Switching Animations
const tabContentVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.4 } },
};

export default function Gallery() {
  const [tab, setTab] = useState("personal");
  const [zoom, setZoom] = useState({ img: null, post: null, index: 0 });

  const openZoom = (post, index) =>
    setZoom({ img: post.photos[index], post, index });

  const closeZoom = () => setZoom({ img: null, post: null, index: 0 });

  const nextImage = () => {
    if (!zoom.post) return;
    const nextIndex = (zoom.index + 1) % zoom.post.photos.length;
    setZoom({ ...zoom, img: zoom.post.photos[nextIndex], index: nextIndex });
  };

  const prevImage = () => {
    if (!zoom.post) return;
    const prevIndex =
      (zoom.index - 1 + zoom.post.photos.length) % zoom.post.photos.length;
    setZoom({ ...zoom, img: zoom.post.photos[prevIndex], index: prevIndex });
  };

  return (
    <motion.section
      className="gallery-container"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* 🌟 Title */}
      <motion.h2 className="gallery-title" variants={childVariants}>
        Gallery
      </motion.h2>

      {/* 🧭 Tabs */}
      <motion.div className="tab-buttons" variants={childVariants}>
        {["personal","collegeLife","travelDiaries", "projects", "achievements"].map((type) => (
          <motion.button
            key={type}
            className={`tab ${tab === type ? "active" : ""}`}
            onClick={() => setTab(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* 🖼️ Posts with Animation on Tab Switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab} // Important for AnimatePresence to detect tab change
          className="post-feed"
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {IMAGES[tab].map((post) => (
            <motion.div
              key={post.id}
              className="post-card"
              variants={childVariants}
              whileHover={{ y: -4 }}
            >
              <p className="caption">{post.caption}</p>
              <div
                className={`photo-grid ${
                  post.photos.length > 1 ? "multi" : "single"
                }`}
              >
                {post.photos.map((src, i) => (
                  <motion.div
                    key={i}
                    className="photo-item"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 250 }}
                    onClick={() => openZoom(post, i)}
                  >
                    <img src={src} alt="gallery" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 🔍 Zoom Overlay */}
      <AnimatePresence>
        {zoom.img && (
          <motion.div
            className="zoom-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              key={zoom.img}
              src={zoom.img}
              alt="zoom"
              className="zoom-img"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {zoom.post?.photos.length > 1 && (
              <>
                <button className="nav-btn left" onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>
                <button className="nav-btn right" onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <button className="close-btn" onClick={closeZoom}>
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
