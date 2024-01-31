import { useRef,useEffect } from "react"
import { initMap, addMarker } from '../utils/map';
const Map = ()=>{
    const mapRef = useRef()
    useEffect (() => {
        // (async ()=>{
        //   console.log(await getAmbulances())
        // console.log(await getHospitals())
        // })()
        
        const map = initMap({ container: mapRef.current, location: [86.99, 23.485], token: 'pk.eyJ1IjoicmFraGktMTQiLCJhIjoiY2xycDVnOWpyMDIydDJqbGlhM3h1a3VnYyJ9.-iZoVxx_umdTFq9lxVcAdA' })
    
      }, [])
    return <>
    <div id="map" ref={mapRef} className='w-full  h-1/2 mx-auto'/>
    </>
}

export default Map;