import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import dialogueScript from '../../../assets/data/dialogueScript.js'

export default function ElfScene({ isSceneLoaded, ...props }) {
  const [ currentScriptLine, setCurrentScriptLine ] = useState( '' )
  const [ currentDisplayedText, setCurrentDisplayedText ] = useState( '' )
  const [ isSpeaking, setIsSpeaking ] = useState( false )

  const elfRef = useRef()

  const { nodes, materials } = useGLTF('/models/elf-scene-transformed.glb')

  const dialogueData = useMemo( () => {
    return dialogueScript
  }, [] )

  const typeCharToScreen = ( newChar ) => {
    setCurrentDisplayedText( ( prev ) => prev + newChar )
  }

  const onParseComplete = () => {
    setIsSpeaking( false )
    console.log( 'done talking' )
  }

  const parseCurrentScriptLine = ( scriptLine, onParseComplete ) => {
    setCurrentDisplayedText( '' )
    let index = 0

    const processNext = () => {
      if ( index >= scriptLine.length ) {
        if ( onParseComplete ) {
          onParseComplete()
        }
        return
      }

      const char = scriptLine[ index ]
      if ( char === '|' ) {
        let delayMarker = ''
        index++

        while ( index < scriptLine.length && /\d/.test( scriptLine[ index ] ) ) {
          delayMarker += scriptLine[ index ]
          index++
        }

        const delayMarkerParsed = parseInt( delayMarker, 10 ) || 500

        setTimeout( processNext, delayMarkerParsed )
      } else {
        typeCharToScreen( char )
        index++

        setTimeout( processNext, Math.floor( Math.random() * 60 ) + 12 );
      }
    }
    processNext()
  }

  const speak = () => {
    if ( !isSpeaking ) {
      setIsSpeaking( true )
      parseCurrentScriptLine( currentScriptLine, onParseComplete )
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
              className={ `w-80 text-sm text-white p-4 rounded-md text-center ${ isSpeaking ? '' : 'animate-pulse' }` }
            >
              { currentDisplayedText }
            </div>
          </Html>
      </group>
    </group>
  )
}

useGLTF.preload('/models/elf-scene-transformed.glb')
