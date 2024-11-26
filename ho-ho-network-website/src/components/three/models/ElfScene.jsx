import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import dialogueScript from '../../../assets/data/dialogueScript.js'

export default function ElfScene({ isSceneLoaded, ...props }) {
  const [ currentScriptLine, setCurrentScriptLine ] = useState( '' )
  const [ isSpeaking, setIsSpeaking ] = useState( false )

  const elfRef = useRef()
  const dialogueTextContentRef = useRef()

  const { nodes, materials } = useGLTF('/models/elf-scene-transformed.glb')

  const dialogueData = useMemo( () => {
    return dialogueScript
  }, [] )

  const displayText = ( element, text ) => {
    element.textContent = ''
    let i = 0

    const typeInterval = setInterval( () => {
      if ( i < text.length ) {
        element.textContent += text[ i ]
        i++
      } else {
        setIsSpeaking( false )
        clearInterval( typeInterval )
      }
    }, Math.floor( Math.random() * 60 ) + 12 )
  }

  const speak = () => {
    if ( !isSpeaking && dialogueTextContentRef.current ) {
      setIsSpeaking( true )
      displayText( dialogueTextContentRef.current, currentScriptLine )
    }
  }

  useEffect( () => {
    if ( dialogueData ) {
      setCurrentScriptLine( dialogueData.intro[ 0 ].text )
    }
  }, [ dialogueData ] )

  useEffect( () => {
    if ( currentScriptLine ) {
      speak()
    }
  }, [ currentScriptLine ] )

  return (
    <group {...props} dispose={null} >
      <mesh 
        geometry={nodes.Plane.geometry} 
        scale={[6.078, 1, 1]} 
      >
        <meshStandardMaterial color='#666666' />
      </mesh>

      <group ref={ elfRef } >
        <mesh 
          geometry={nodes.hand.geometry} 
          material={materials.Base} 
        />
          <Html
            position={[ 0, 1.05, 0 ]}
            center
          >
            <div 
              ref={ dialogueTextContentRef }
              className='w-80 text-sm text-white p-4 rounded-md text-center'
            >
              
            </div>
          </Html>
      </group>
    </group>
  )
}

useGLTF.preload('/models/elf-scene-transformed.glb')
