import { OrbitControls } from '@react-three/drei'

export default function Experience() {
    return <>
        <OrbitControls 
            autoRotate={ true }
            enableDamping={ true }
            enablePan={ false } 
            enableZoom={ false } 
        />
    </>
}