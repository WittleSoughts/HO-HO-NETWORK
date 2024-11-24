import { Canvas } from '@react-three/fiber'
import Experience from './components/three/Experience'
import HUDOverlay from './components/ui/HUDOverlay'

export default function App() {
    return <>
        <div className="fixed top-0 left-0 w-full h-full m-0 p-0 uppercase text-white overflow-hidden">
            <div className='flex items-center justify-center fixed top-0 left-0 w-full h-full bg-HUD-background/30 z-50'>
                <HUDOverlay />
            </div>

            <div className='fixed top-0 left-0 w-full h-full z-10'>

                <Canvas 
                    camera={ {
                        position: [ 0, 0, 15 ]
                    } }
                >
                    <Experience />
                </Canvas>

            </div>
        </div>
    </>
}