import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RollingCoinsSection() {
    const mountRef = useRef(null);

    useEffect(() => {
        const width = mountRef.current.clientWidth;
        const height = 500;

        // SCENE
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf4f4f4);

        // CAMERA
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.set(0, 8, 22);

        // RENDERER
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // LIGHTING
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(10, 20, 10);
        scene.add(light1);

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);

        // CURVED PATH
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-15, 0, 0),
            new THREE.Vector3(-5, 4, 0),
            new THREE.Vector3(5, -3, 0),
            new THREE.Vector3(15, 2, 0),
        ]);

        // RIBBON (Tube)
        const tubeGeometry = new THREE.TubeGeometry(curve, 200, 2, 40, false);
        const tubeMaterial = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            metalness: 0.7,
            roughness: 0.3,
        });
        const ribbon = new THREE.Mesh(tubeGeometry, tubeMaterial);
        scene.add(ribbon);

        // COIN GEOMETRY
        const coinGeo = new THREE.CylinderGeometry(2, 2, 0.6, 64);
        const coinMat = new THREE.MeshStandardMaterial({
            color: 0xffc107,
            metalness: 1,
            roughness: 0.2,
        });

        const coins = [];
        for (let i = 0; i < 3; i++) {
            const coin = new THREE.Mesh(coinGeo, coinMat);
            coin.rotation.z = Math.PI / 2;
            scene.add(coin);
            coins.push({ mesh: coin, offset: i * 0.3 });
        }

        let t = 0;

        function animate() {
            requestAnimationFrame(animate);
            t += 0.002;

            coins.forEach((c) => {
                const pos = curve.getPoint((t + c.offset) % 1);
                const tangent = curve.getTangent((t + c.offset) % 1);

                c.mesh.position.copy(pos);

                // Align coin with curve direction
                const axis = new THREE.Vector3(0, 1, 0);
                c.mesh.quaternion.setFromUnitVectors(axis, tangent.clone().normalize());

                // Rolling spin
                c.mesh.rotateX(0.15);
            });

            renderer.render(scene, camera);
        }

        animate();

        // Cleanup
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <section className="w-full bg-[#f4f4f4] py-20">
            <div className="max-w-7xl mx-auto">
                <div ref={mountRef} className="w-full h-[500px]" />
            </div>
        </section>
    );
}
