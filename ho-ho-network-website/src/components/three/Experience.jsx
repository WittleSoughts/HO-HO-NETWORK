import { useFrame } from '@react-three/fiber'
import ElfScene from './models/ElfScene'

export default function Experience() {
    useFrame( ( state ) => {
        const camera = state.camera
        camera.lookAt( 0, 0.53, 0 )
    } )

    return <>
        <directionalLight position={ [ 0, 6, 2 ] } intensity={ 0.5 } />

        <ElfScene />
    </>
}