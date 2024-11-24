import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function ElfScene(props) {
  const { nodes, materials } = useGLTF('/models/elf-scene-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} scale={[6.078, 1, 1]} />
      <mesh geometry={nodes.hand.geometry} material={materials.Base} />
    </group>
  )
}

useGLTF.preload('/models/elf-scene-transformed.glb')
