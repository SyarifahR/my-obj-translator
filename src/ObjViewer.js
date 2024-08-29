import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import * as THREE from 'three';

// Define a Loader component for the fallback UI
function Loader() {
  return <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>;
}

function ObjModel({ objPath, mtlPath }) {
  const objRef = useRef();

  // Load MTL (material) file if provided
  const materials = useLoader(MTLLoader, mtlPath);

  // Load OBJ file with its materials
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    if (materials) {
      loader.setMaterials(materials);
    } else {
      // Apply a default material if no MTL is found
      loader.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ color: 'gray' });
        }
      });
    }
  });

  return <primitive ref={objRef} object={obj} scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]} />;
}

export default function ObjViewer() {
  return (
    <Canvas style={{ height: '90vh', background: '#f0f0f0', width: '100vw' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />
      <Suspense fallback={<Loader />}>
        <ObjModel objPath="/Floorplan_2/testing.obj" mtlPath="/Floorplan_2/testing.mtl" />
      </Suspense>
    </Canvas>
  );
}
