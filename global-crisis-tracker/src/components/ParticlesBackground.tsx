'use client'

import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim'; 
import './ParticlesBackground.css';

const ParticlesBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="particles-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: {
              value: 90,
              density: { enable: true, area: 315 }
            },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 }
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: true, speed: 0.1, opacity_min: 0.2, sync: false }
            },
            size: {
              value: 1,
              random: true,
              anim: { enable: true, speed: 1, size_min: 0.5, sync: false }
            },
            links: {
              enable: false
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" },
              attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
              resize: true
            },
            modes: {
              grab: { distance: 140, links: { opacity: 1 } },
              push: { quantity: 4 }
            }
          },
          retina_detect: true
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
