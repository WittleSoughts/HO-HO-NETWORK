import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/initial-scene-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} />
      <mesh geometry={nodes.hair.geometry} material={materials.Base} />
    </group>
  )
}

useGLTF.preload('/models/initial-scene-transformed.glb')
