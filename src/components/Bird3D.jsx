import React, { useEffect, useRef } from 'react';

// The logo's origami bird as a small 3D object. Each piece of the mark is an
// extruded shape, folded slightly out of plane, so it reads as paper when it turns.
// Coordinates are traced from the logo artwork (pixels, y down).
const PIECES = [
    { color: 0xFFB56E, fold: [0, 0.45, 0], z: -8, pts: [[153, 50], [176, 44], [222, 98], [206, 128], [153, 128]] }, // wing tip (peach)
    { color: 0xFF7A00, fold: [0, 0.12, 0], z: 4, pts: [[213, 130], [318, 25], [318, 130]] },                        // upper body
    { color: 0xFC5000, fold: [0, -0.35, 0], z: 0, pts: [[326, 14], [443, 10], [326, 126]] },                        // head
    { color: 0xFF8F2A, fold: [0, -0.5, 0], z: -4, pts: [[398, 74], [462, 28], [432, 64]] },                         // beak
    { color: 0xFF7A00, fold: [0.3, 0, 0], z: 2, pts: [[170, 140], [322, 135], [270, 246]] },                        // lower body
    { color: 0xFC5000, fold: [0, -0.4, 0], z: -6, pts: [[326, 150], [284, 246], [321, 276]] },                      // tail
];
const CENTER = [305, 143];

export default function Bird3D({ className = '' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        // Desktop only: skip the extra WebGL work on phones and small tablets.
        if (!mount || window.innerWidth < 1024) return;

        let cancelled = false;
        let cleanup = () => {};
        import('three').then((THREE) => {
            if (cancelled) return;

            const size = () => Math.min(mount.clientWidth, mount.clientHeight);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(size(), size());
            mount.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(32, 1, 1, 2000);
            camera.position.z = 760;

            scene.add(new THREE.AmbientLight(0xffffff, 0.9));
            const key = new THREE.DirectionalLight(0xFFF4E6, 1.8);
            key.position.set(-200, 300, 400);
            scene.add(key);
            const rim = new THREE.PointLight(0xFC5000, 60000, 0, 2);
            rim.position.set(200, -250, 200);
            scene.add(rim);

            const bird = new THREE.Group();
            const disposables = [];
            PIECES.forEach(({ color, fold, z, pts }) => {
                const shape = new THREE.Shape();
                pts.forEach(([x, y], i) => {
                    const px = x - CENTER[0], py = -(y - CENTER[1]);
                    if (i === 0) shape.moveTo(px, py); else shape.lineTo(px, py);
                });
                shape.closePath();
                const geometry = new THREE.ExtrudeGeometry(shape, { depth: 7, bevelEnabled: true, bevelSize: 2, bevelThickness: 2, bevelSegments: 2 });
                const material = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.08, flatShading: true });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.rotation.set(...fold);
                mesh.position.z = z;
                bird.add(mesh);
                disposables.push(geometry, material);
            });
            scene.add(bird);

            let mouseX = 0, mouseY = 0;
            const onMove = (e) => {
                mouseX = e.clientX / window.innerWidth - 0.5;
                mouseY = e.clientY / window.innerHeight - 0.5;
            };
            window.addEventListener('mousemove', onMove);

            const onResize = () => renderer.setSize(size(), size());
            window.addEventListener('resize', onResize);

            const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const clock = new THREE.Clock();
            renderer.setAnimationLoop(() => {
                const t = still ? 0 : clock.getElapsedTime();
                // Gentle sway instead of a full spin, so the logo stays recognisable.
                bird.rotation.y += ((Math.sin(t * 0.6) * 0.55 + mouseX * 0.7) - bird.rotation.y) * 0.06;
                bird.rotation.x += ((Math.sin(t * 0.45) * 0.1 + mouseY * 0.35) - bird.rotation.x) * 0.06;
                bird.position.y = Math.sin(t * 1.1) * 8;
                renderer.render(scene, camera);
            });

            cleanup = () => {
                renderer.setAnimationLoop(null);
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('resize', onResize);
                disposables.forEach((d) => d.dispose());
                renderer.dispose();
                renderer.domElement.remove();
            };
        });
        return () => { cancelled = true; cleanup(); };
    }, []);

    return <div ref={mountRef} className={`flex items-center justify-center ${className}`} aria-hidden="true" />;
}
