import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

export default function Hero() {
    const container = useRef(null);
    const canvasRef = useRef(null);
    const contentRef = useRef(null);
    const agencyNameRef = useRef(null);

    useEffect(() => {
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
                color: { value: new THREE.Color(0xF5DF77) },
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

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    useEffect(() => {
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
                delay: 1.5 // Sync with wipe
            });

            // Mouse parallax for the massive text
            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 40;
                const y = (e.clientY / window.innerHeight - 0.5) * 40;

                gsap.to(chars, {
                    x: (i) => x * (i * 0.2 + 0.5),
                    y: (i) => y * (i * 0.2 + 0.5),
                    duration: 1,
                    ease: "power2.out"
                });
            });

            // Standard Content animation
            gsap.from(contentRef.current.children, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 2.2
            });

            gsap.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 2, delay: 2.5 });

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

        return () => ctx.revert();
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
                <span className="font-display font-black text-[18vw] leading-none tracking-tighter text-[#F5DF77]/5 flex justify-center uppercase">
                    {Array.from("CREATIIX").map((letter, i) => (
                        <span key={i} className="letter inline-block transform-style-3d origin-bottom">{letter}</span>
                    ))}
                </span>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

            {/* Content */}
            <div ref={contentRef} className="relative z-20 max-w-4xl text-left pointer-events-auto mt-auto">
                <h1 className="font-display font-bold text-4xl md:text-[clamp(3rem,6vw,6rem)] leading-[0.9] text-[#F5DF77] uppercase tracking-tight mb-4 mix-blend-difference">
                    Built to attract, <br />engage, and convert
                </h1>
                <h2 className="font-drama italic text-5xl md:text-[clamp(4rem,8vw,10rem)] leading-none text-white mb-8">
                    Not just <span className="text-[#7CC159]">look good.</span>
                </h2>
                <p className="font-body text-white/70 text-lg md:text-xl max-w-[480px] mb-10 leading-relaxed font-light">
                    We are <strong className="text-[#F5DF77] font-bold">CREATIIX</strong>. Complete creative and marketing solutions under one roof. Strategic design that actually drives business.
                </p>
                <button className="group relative px-8 py-4 bg-[#F5DF77] text-background font-body rounded-none hover:bg-[#7CC159] hover:text-background transition-colors duration-300 font-bold tracking-widest uppercase overflow-hidden"
                    onMouseEnter={(e) => {
                        document.getElementById('cursor-ring')?.classList.add('scale-150');
                    }}
                    onMouseLeave={(e) => {
                        document.getElementById('cursor-ring')?.classList.remove('scale-150');
                    }}
                >
                    <span className="relative z-10">Book a free 30-minute consultation</span>
                    <div className="absolute inset-0 bg-[#7CC159] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.87,0,0.13,1)] z-0" />
                </button>
            </div>
        </section>
    );
}
