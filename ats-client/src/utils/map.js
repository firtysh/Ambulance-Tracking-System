import mapboxgl from "mapbox-gl"
const MAP_TOKEN = 'pk.eyJ1IjoicmFraGktMTQiLCJhIjoiY2xycDVnOWpyMDIydDJqbGlhM3h1a3VnYyJ9.-iZoVxx_umdTFq9lxVcAdA'

export const initMap = ({ container, location = [86.99, 23.485], token }) => {
    const map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: location,
        zoom: 9,
        projection: "mercator",
        accessToken: token
    })
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    const geoLocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    })
    map.addControl(geoLocate);
    map.on('load', () => {
        //  add hospitals to the map
        map.loadImage('/hospital.png', (err, image) => {
            if (err) throw err;
            map.addImage('hospital-marker', image);
            map.addSource('hospitals', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Jalpaiguri Superspeciality Hospital"
                            },
                            "geometry": {
                                "coordinates": [
                                    88.70592778014048,
                                    26.543249558868652
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Yogsadhna"
                            },
                            "geometry": {
                                "coordinates": [
                                    88.70770687864655,
                                    26.533616748874934
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Jalpaiguri Sadar Hospital"
                            },
                            "geometry": {
                                "coordinates": [
                                    88.72770110391195,
                                    26.52945594512586
                                ],
                                "type": "Point"
                            }
                        }
                    ]
                }
            })
            map.addLayer({
                id : 'hospital-layer',
                type : 'symbol',
                source : 'hospitals',
                layout: {
                    'icon-image': 'hospital-marker',
                    "icon-size" : 0.05,
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                    },
                    minzoom: 10
            })
        })


        geoLocate.trigger()
    })
    map.on('mousedown', 'poi-label', (e) => {
        console.log(e.lngLat);
        new mapboxgl.Marker({ color: 'yellow' }).setLngLat(e.lngLat).addTo(map)
    })
    new mapboxgl.Marker({ color: 'red' }).setLngLat(location).addTo(map)

    return map;

}


export const addMarker = ({ name, location, map }) => {
    new mapboxgl.Marker({
        color: 'blue',
        scale: 0.6
    })
        .setLngLat(location)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(name))
        .addTo(map)
}

// const myLocationMarker = 