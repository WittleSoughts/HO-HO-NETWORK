import { BlendFunction } from 'postprocessing'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ChromaticAberration, EffectComposer, Noise, Scanline } from '@react-three/postprocessing'
import Experience from './components/three/Experience'

export default function App() {
    const [ dialogueState, setDialogueState ] = useState( 'intro' )

    return <>
        <div className="fixed top-0 left-0 w-full h-full m-0 p-0 uppercase text-white overflow-hidden">
            <div className='fixed top-0 left-0 w-full h-full z-10'>

                <Canvas
                    camera={{
                        position: [ 0, 0.9, 0.9 ]
                    }}
                >
                    <Experience />

                    <EffectComposer>
                        <ChromaticAberration
                            blendFunction={ BlendFunction.NORMAL }
                            offset={[ 0.001, 0.002 ]} 
                        />

                        <Noise 
                            opacity={ 0.015 }
                        />

                        <Scanline
                            blendFunction={ BlendFunction.OVERLAY }
                            density={ 1.75 }
                            opacity={ 0.1 }
                        />
                    </EffectComposer>
                </Canvas>

            </div>
        </div>
    </>
}