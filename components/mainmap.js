// USEFUL LINKS:
// https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps
// http://kml4earth.appspot.com/icons.html
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useState } from 'react';
import Link from 'next/link';

export default function MainMap({ location, airportLocations }){

    const [infoWindowVisibility, setInfoWindowVisibility] = useState(Array(airportLocations.length).fill(false));

    function handleClick(i){
        const newVisibility = [...infoWindowVisibility];
        newVisibility[i] = !newVisibility[i]
        setInfoWindowVisibility(newVisibility)
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    });
    
    const mapOptions = {
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: true,
    }
    if(!isLoaded) return 
    return (
        <div>
            <GoogleMap
                options={mapOptions}
                zoom={8}
                center={location}
                mapContainerStyle={{ width: '100vw', height: '100vh' }}
                onLoad={() => console.log('Map Component Loaded...')}
            >
                <MarkerF position={location} title='Current Location' icon="https://maps.google.com/mapfiles/kml/pal4/icon48.png" />
                {airportLocations.map((airportLocation, i) => (
                    <MarkerF position={airportLocation} key={i} onClick={() => handleClick(i)}>
                        {infoWindowVisibility[i] && (
                            <InfoWindowF>
                                <Link href={'/airport/'+airportLocation.icao_code}>
                                    <h1 className='font-medium underline'>{airportLocation.name}</h1>
                                    {airportLocation.iata_code ? <h1>IATA: <b className='font-bold'>{airportLocation.iata_code}</b></h1> : null }
                                    <h1>ICAO: <b className='font-bold'>{airportLocation.icao_code}</b></h1>
                                </Link>
                            </InfoWindowF>
                        )}
                    </MarkerF>
                ))}
            </GoogleMap>
        </div>
    )
}