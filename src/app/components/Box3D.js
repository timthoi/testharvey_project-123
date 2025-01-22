import { Box, OrbitControls } from '@react-three/drei'; // Import Box helper component and OrbitControls
import { Canvas } from '@react-three/fiber'; // Import Canvas to create 3D rendering context
import { useEffect,useState } from 'react'; // Import useState for managing state

function Box3D({ width, height, length }) {
  const [dimensions, setDimensions] = useState({
    width: width,
    height: height,
    length: length,
  });


  useEffect(() => {
    const maxDimension = Math.max(width, height, length);

    const scale = Math.pow(10, Math.floor(Math.log10(maxDimension)));

    setDimensions({
      width: width / scale,
      height: height / scale,
      length: length / scale,
    });
  }, [width, height, length]);


  return (
    <div style={{ width: '500px', height: '500px' }}>
      <Canvas>
        <ambientLight intensity={0.5}/>
        <pointLight position={[10, 10, 10]}/>
        <Box args={[dimensions.width, dimensions.height, dimensions.length]}>
          <meshStandardMaterial attach="material-0" color="red"/>
          <meshStandardMaterial attach="material-1" color="green"/>
          <meshStandardMaterial attach="material-2" color="blue"/>
          <meshStandardMaterial attach="material-3" color="yellow"/>
          <meshStandardMaterial attach="material-4" color="orange"/>
          <meshStandardMaterial attach="material-5" color="purple"/>
        </Box>

        <OrbitControls/>
      </Canvas>

      {dimensions.width !== 0 && dimensions.height !== 0 && dimensions.length !== 0 && (
        <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mt-4 rounded-md">
          * Please rotate image. Scale by max value
        </p>
      )}

    </div>
  );
}

export default Box3D;