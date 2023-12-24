import { MarkerF, GoogleMap, useLoadScript } from "@react-google-maps/api";

export default function Map({ centreLocation, markerLocation, currentLocation }){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    });
    
    const mapOptions = {
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: false,
    }
    if(!isLoaded) return 
    return (
        <div>
            <GoogleMap
                options={mapOptions}
                zoom={8}
                center={centreLocation}
                mapContainerStyle={{ width: '80vw', height: '60vh' }}
                onLoad={() => console.log('Map Component Loaded...')}
            >
                <MarkerF position={currentLocation} title='Current Location' icon="https://maps.google.com/mapfiles/kml/pal4/icon48.png" />
                <MarkerF position={markerLocation} />
            </GoogleMap>
        </div>
    )
}