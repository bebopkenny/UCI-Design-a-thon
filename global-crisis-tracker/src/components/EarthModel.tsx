'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Earth = () => {
  const gltf = useGLTF('/earth.glb'); // Make sure this path is correct
  return <primitive
  object={gltf.scene}
  scale={0.025}
  rotation={[0.4, 0.6, 0]}
  position={[2.5, -2.2, 0]} // ← shift globe bottom right
/> 
  ;
};

const EarthModel = () => {
  return (
    <div className="earth-canvas">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
};

export default EarthModel;
