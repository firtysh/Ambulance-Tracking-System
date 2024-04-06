import { useRef,useEffect } from "react"
import { initMap, addMarker } from '../utils/map';
const Map = ()=>{
    const mapRef = useRef()
    useEffect (() => {
        // (async ()=>{
        //   console.log(await getAmbulances())
        // console.log(await getHospitals())
        // })()
        
        const map = initMap({ container: mapRef.current, location: [86.99, 23.485], token: '' })
    
      }, [])
    return <>
    <div id="map" ref={mapRef} className='mx-auto w-full h-1/2'/>
    </>
}

export default Map;