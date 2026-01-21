import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Canvas, useFrame } from "@react-three/fiber";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

/* ================= LENIS ================= */
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return null;
}

/* ================= SUBTLE 3D BACKGROUND ================= */
function FloatingMesh() {
  const meshA = useRef();
  const meshB = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // rotasi lebih cepat tapi tetap smooth
    meshA.current.rotation.x = t * 0.12;
    meshA.current.rotation.y = t * 0.16;

    meshB.current.rotation.x = -t * 0.1;
    meshB.current.rotation.y = -t * 0.14;

    // subtle floating
    const float = Math.sin(t * 0.8) * 0.15;
    meshA.current.position.y = float;
    meshB.current.position.y = -float;
  });

  return (
    <group scale={3}>
      {/* Outer wireframe */}
      <mesh ref={meshA}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Inner solid glow */}
      <mesh ref={meshB} scale={0.92}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.06}
          emissive="#38bdf8"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}
// function FloatingMesh() {
//   const mesh = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     mesh.current.rotation.x = t * 0.05;
//     mesh.current.rotation.y = t * 0.08;
//   });

//   return (
//     <mesh ref={mesh} scale={3}>
//       <icosahedronGeometry args={[1, 1]} />
//       <meshStandardMaterial
//         color="#38bdf8"
//         wireframe
//         transparent
//         opacity={0.18}
//       />
//     </mesh>
//   );
// }

/* ================= CURSOR ================= */
function Cursor() {
  const cursor = useRef();

  useEffect(() => {
    const move = (e) => {
      cursor.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={cursor} className="custom-cursor" />;
}

/* ================= ANIMATION VARIANTS ================= */
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Cursor />

      {/* 3D BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.4} />
          <FloatingMesh />
        </Canvas>
      </div>

      <main className="text-white">

        {/* ================= HERO ================= */}
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.18 } } }}
            className="text-center max-w-4xl"
          >
            <motion.span variants={fade} className="hero-eyebrow">
              Social Media Growth Agency
            </motion.span>

            <motion.h1 variants={fade} className="hero-title">
              Monster Growth for <br />
              <span className="hero-accent">Digital Presence</span>
            </motion.h1>

            <motion.p variants={fade} className="hero-subtitle mx-auto">
              We help brands grow consistently through strategy-driven
              social media systems — not guesswork.
            </motion.p>

            <motion.div
              variants={fade}
              className="mt-14 flex justify-center gap-6"
            >
              <button className="btn-primary-refined">
                Start a Project
              </button>
              <button className="btn-ghost-refined">
                View Work
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ================= ABOUT ================= */}
        <Section>
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <h2 className="section-title">About Monsterract</h2>
            </div>

            <div className="md:col-span-7 space-y-8">
              <p className="section-text">
                Monsterract focuses on long-term digital growth by combining
                creative execution, strategic planning, and data-driven insight.
              </p>

              <Metrics />
            </div>
          </div>
        </Section>

        {/* ================= SERVICES ================= */}
        <Section>
          <h2 className="section-title">What We Do</h2>

          <div className="mt-16 space-y-10">
            {[
              "Social Media Management",
              "Content & Campaign Strategy",
              "Performance Analytics",
              "Brand Direction & Positioning",
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fade}
                whileHover={{ x: 12 }}
                className="service-row"
              >
                <span className="service-index">0{i + 1}</span>
                <span className="service-name">{s}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ================= PORTFOLIO ================= */}
        <Section>
          <h2 className="section-title">Selected Work</h2>

          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={fade}
                whileHover={{ y: -8 }}
                className="portfolio-item-refined"
              >
                <div className="portfolio-thumb">
                  <img
                    src={`${i === 1 ? "https://images.unsplash.com/photo-1567443026248-f4472c8e5145?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : i === 2 ? "https://images.unsplash.com/photo-1548430077-773fa74bda9d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : "https://images.unsplash.com/photo-1676116777245-1cc40079cd38?q=80&w=1048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}`}
                    alt="Portfolio"
                  />
                </div>

                <div className="mt-5">
                  <p className="portfolio-title">Brand Project {i}</p>
                  <span className="portfolio-meta">
                    Instagram · TikTok
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ================= CTA ================= */}
        <section className="py-48 px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="cta-title">
              Let’s create a digital presence people actually care about.
            </h2>

            <button className="btn-primary-refined mt-14">
              Contact Monsterract
            </button>
          </motion.div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="py-16 px-6 md:px-12 lg:px-24 border-t border-white/10 flex justify-between items-center">
          <span className="text-white/40">
            © {new Date().getFullYear()} Monsterract
          </span>
          <div className="flex gap-6 text-lg">
            <FaInstagram className="footer-icon" />
            <FaTiktok className="footer-icon" />
          </div>
        </footer>
      </main>
    </>
  );
}

/* ================= METRICS ================= */
function Metrics() {
  const [start, setStart] = useState(false);
  const { ref, inView } = useInView({ rootMargin: "-10px" });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setStart(true), 800);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div ref={ref} className="about-metrics">
      <Metric start={start} value={120} suffix="+" label="Brands" />
      <Metric start={start} value={98} suffix="%" label="Retention" />
      <Metric start={start} value={4.9} decimals={1} label="Client Rating" />
    </div>
  );
}

function Metric({ start, value, suffix = "", label, decimals = 0 }) {
  return (
    <div>
      <span className="metric-number">
        {start && (
          <CountUp
            end={value}
            duration={15}
            decimals={decimals}
          />
        )}
        {suffix}
      </span>
      <span className="metric-label">{label}</span>
    </div>
  );
}

/* ================= SECTION ================= */
function Section({ children }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={{ show: { transition: { staggerChildren: 0.18 } } }}
      className="section-wrapper px-6 md:px-12 lg:px-24"
    >
      {children}
    </motion.section>
  );
}
