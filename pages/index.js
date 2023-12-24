import { useEffect, useState } from "react";
import MainMap from "@/components/mainmap";
import Head from "next/head";

export default function Home() {
  const [nearbyData, setNearbyData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLocation({lat: position.coords.latitude, lng: position.coords.longitude})
      async function getData(){
        var response = await fetch(`/api/getNearby?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
        response = await response.json();
        setNearbyData(response)
      }
      getData()
    });
  }, [])

  if(!nearbyData || !location) return;

  const nearbyLocations = [];
  nearbyData.forEach(element => {
    nearbyLocations.push({lat: element.lat, lng: element.lng, icao_code: element.icao_code, iata_code: element.iata_code, name: element.name})
  });

  return (
    <div className='w-screen min-h-screen'>
      <Head>
        <title>Nearby Airport Map</title>
      </Head>
      <MainMap location={location} airportLocations={nearbyLocations} />
    </div>
  )
}
