import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from "react-router-dom";
import { INTRO_DELAY, goToContact } from "../lib/site";
import Bird3D from "./Bird3D";

export default function Hero() {
    const container = useRef(null);
    const canvasRef = useRef(null);
    const contentRef = useRef(null);
    const agencyNameRef = useRef(null);

    useEffect(() => {
        // three.js is large, so it is fetched separately after the page has painted.
        let cancelled = false;
        let cleanup = () => {};
        import('three').then((THREE) => {
            if (cancelled || !canvasRef.current) return;
            // Elegant Particle Wave Setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 30;
            camera.position.y = 10;
            camera.lookAt(0, 0, 0);

            const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Particle geometry
            const geometry = new THREE.BufferGeometry();
            const count = 3000;
            const positions = new Float32Array(count * 3);
            const scales = new Float32Array(count);

            let i = 0, j = 0;
            for (let ix = 0; ix < 100; ix++) {
                for (let iy = 0; iy < 30; iy++) {
                    // Arrange in a grid
                    positions[i] = ix * 1.5 - 75; // x
                    positions[i + 1] = 0;         // y
                    positions[i + 2] = iy * 1.5 - 22.5; // z
                    scales[j] = 1;
                    i += 3;
                    j++;
                }
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

            // Material matching the yellow/green palette but very subtle
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    color: { value: new THREE.Color(0xFF7A00) },
                },
                vertexShader: `
            attribute float scale;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = scale * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
                fragmentShader: `
            uniform vec3 color;
            void main() {
              if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
              gl_FragColor = vec4(color, 0.3);
            }
          `,
                transparent: true,
                depthWrite: false,
            });

            const particles = new THREE.Points(geometry, material);
            scene.add(particles);

            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;

            const handleMouseMove = (event) => {
                mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
                mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
            };
            window.addEventListener('mousemove', handleMouseMove);

            let countTime = 0;

            renderer.setAnimationLoop(() => {
                targetX = mouseX * 0.1;
                targetY = mouseY * 0.1;

                camera.position.x += (targetX - camera.position.x) * 0.05;
                camera.position.y += (-targetY + 20 - camera.position.y) * 0.05;
                camera.lookAt(scene.position);

                const positions = particles.geometry.attributes.position.array;
                const scales = particles.geometry.attributes.scale.array;

                let i = 0, j = 0;
                for (let ix = 0; ix < 100; ix++) {
                    for (let iy = 0; iy < 30; iy++) {
                        // Sine wave animation
                        positions[i + 1] = (Math.sin((ix + countTime) * 0.3) * 2) +
                            (Math.sin((iy + countTime) * 0.5) * 2);
                        scales[j] = (Math.sin((ix + countTime) * 0.3) + 1) * 1.5 +
                            (Math.sin((iy + countTime) * 0.5) + 1) * 1.5;
                        i += 3;
                        j++;
                    }
                }

                particles.geometry.attributes.position.needsUpdate = true;
                particles.geometry.attributes.scale.needsUpdate = true;

                countTime += 0.05;
                renderer.render(scene, camera);
            });

            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);

            cleanup = () => {
                renderer.setAnimationLoop(null);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
                geometry.dispose();
                material.dispose();
            };
        });
        return () => { cancelled = true; cleanup(); };
    }, []);

    useEffect(() => {
        let cleanupParallax = () => {};
        const ctx = gsap.context(() => {
            // Kinetic Typography Animation
            const chars = agencyNameRef.current.querySelectorAll('.letter');

            gsap.from(chars, {
                y: 150,
                opacity: 0,
                rotateX: -90,
                stagger: 0.08,
                duration: 1.5,
                ease: "power4.out",
                delay: INTRO_DELAY + 0.2
            });

            // Mouse parallax for the massive text
            const parallax = (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 40;
                const y = (e.clientY / window.innerHeight - 0.5) * 40;

                gsap.to(chars, {
                    x: (i) => x * (i * 0.2 + 0.5),
                    y: (i) => y * (i * 0.2 + 0.5),
                    duration: 1,
                    ease: "power2.out"
                });
            };
            window.addEventListener("mousemove", parallax);
            cleanupParallax = () => window.removeEventListener("mousemove", parallax);

            // Standard Content animation
            gsap.from(contentRef.current.children, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                delay: INTRO_DELAY + 0.6
            });

            gsap.from('.hero-bird', { opacity: 0, scale: 0.8, duration: 1, ease: 'power3.out', delay: INTRO_DELAY + 1 });

            gsap.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 2, delay: INTRO_DELAY + 0.8 });

            // Scroll Parallax for massive text
            gsap.to(agencyNameRef.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: -300,
                opacity: 0
            });

        }, container);

        return () => { cleanupParallax(); ctx.revert(); };
    }, []);

    return (
        <section ref={container} className="relative w-full h-[100dvh] flex items-end pb-20 pl-6 md:pl-16 overflow-hidden bg-background">
            {/* 3D Particle Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-0" />

            {/* Massive Kinetic Text */}
            <div
                ref={agencyNameRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 mt-10 perspective-1000"
            >
                <span className="font-display font-black text-[18vw] leading-none tracking-tighter text-accent/[0.07] flex justify-center uppercase">
                    {Array.from("CREATIIX").map((letter, i) => (
                        <span key={i} className="letter inline-block transform-style-3d origin-bottom">{letter}</span>
                    ))}
                </span>
            </div>

            {/* Warm glow rising from the bottom, behind the glass */}
            <i className="glow glow-flame w-[60rem] h-[34rem] left-1/2 -translate-x-1/2 -bottom-72 z-0" />
            <i className="glow glow-peach w-[26rem] h-[26rem] -right-24 -top-24 z-0" />

            {/* 3D origami bird from the logo (desktop only) */}
            <Bird3D className="hero-bird hidden lg:flex absolute right-[4vw] top-1/2 -translate-y-1/2 w-[38vw] max-w-[560px] aspect-square z-20 pointer-events-none" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-background/30 to-transparent pointer-events-none" />

            {/* Content */}
            <div ref={contentRef} className="relative z-20 max-w-3xl text-left pointer-events-auto mt-auto pr-6">
                <p className="font-mono text-[13px] md:text-sm uppercase tracking-[0.16em] text-accent mb-5 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    AI · Apps · Design · Marketing
                </p>
                <h1 className="font-display font-bold text-4xl md:text-[clamp(2.75rem,5vw,4.75rem)] leading-[1.02] text-ink tracking-tight mb-4">
                    Brands, apps <br />&amp; AI systems
                </h1>
                <h2 className="font-drama italic text-5xl md:text-[clamp(3.25rem,6vw,6rem)] leading-none text-ink mb-8">
                    built to <span className="text-grad">grow.</span>
                </h2>
                <p className="font-body text-ink/70 text-lg md:text-xl max-w-[520px] mb-10 leading-relaxed font-light">
                    We are <strong className="text-accent font-bold">CREATIIX</strong>. One team for AI chatbots, automation and agents, websites and mobile apps, and the design and marketing that makes them sell.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <button
                        onClick={goToContact}
                        className="group relative px-8 py-4 bg-brand text-onaccent font-body font-bold tracking-widest uppercase text-sm overflow-hidden rounded-2xl"
                    >
                        <span className="relative z-10">Start your project</span>
                        <div className="absolute inset-0 bg-peach translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] z-0" />
                    </button>
                    <Link to="/services" className="px-8 py-4 border border-ink/25 text-ink font-body font-bold tracking-widest uppercase text-sm rounded-2xl glass hover:text-accent transition-colors">
                        Explore our services
                    </Link>
                </div>
            </div>
        </section>
    );
}
