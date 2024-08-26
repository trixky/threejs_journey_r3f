import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function CustomObject() {
    const verticesCount = 10 * 3;
    const geometryRef = useRef();


    const positions = useMemo(() => {
        const positionArray = new Float32Array(verticesCount * 3);

        for (let i = 0; i < verticesCount * 3; i++) {
            positionArray[i] = (Math.random() - 0.5) * 3;
        }

        return positionArray;
    })

    useEffect(() => {
        geometryRef.current.computeVertexNormals();
    }, []);

    return <mesh>
        <bufferGeometry ref={geometryRef}>
            <bufferAttribute
                attach={"attributes-position"}
                count={verticesCount}
                array={positions}
                itemSize={3}
            />
        </bufferGeometry>
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
}