import  { useCallback }from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 


const ParticlesCube = () => {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);

  return (
    <Particles
            id="tsparticles2"
            className="tsparticles-cube"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: {
                    zIndex: -1,
                    enable: false
                },
                style: {
                    position: "absolute"
                },
                fpsLimit: 30,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 0,
                        },
                        repulse: {
                            distance: 10,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 250,
                        enable: false,
                        opacity: 0.2,
                        width: 0.5,
                    },
                    move: {
                        direction: "top",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 100,
                        },
                        value: 19,
                    },
                    opacity: {
                        value: { min: 0.5, max: 1 },
                    },
                    shape: {
                        type: "edge",
                    },
                    size: {
                        value: { min: 0.1, max: 2 },
                    },
                },
                detectRetina: true,
            }}
        />
  )
}

export default ParticlesCube;
