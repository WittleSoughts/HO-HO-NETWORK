import { useProgress } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import ElfScene from './models/ElfScene'

export default function Experience() {
    const [ isSceneLoaded, setIsSceneLoaded ] = useState( false )

    useFrame( ( state ) => {
        const camera = state.camera
        camera.lookAt( 0, 0.6, 0 )
    } )

    const { progress } = useProgress()
    useEffect( () => {
        if ( progress === 100 ) {
            setIsSceneLoaded( true )
            console.log( '[+] SCENE LOADED::' )
        }
    }, [] )

    return <>
        <fog attach='fog' color='#121212' near={ 1 } far={ 4 } />

        <spotLight 
            angle={ 0.6 }
            intensity={ 10 } 
            position={ [ 0, 4, 2 ] } 
        />

        <ElfScene isSceneLoaded={ isSceneLoaded } />
    </>
}