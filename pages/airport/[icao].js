import Map from "@/components/map";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Airport(){
    const router = useRouter()
    const icao = router.query.icao;
    const [airportData, setAirportData] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({lat: position.coords.latitude, lng: position.coords.longitude})
        });

        async function fetchData(){
            if(!icao) return;
            const airportData = await (await fetch("/api/getAirportData?icao_code="+icao)).json()
            setAirportData(airportData)
        }
        fetchData()
    }, [router, icao]);

    if(!airportData || !location) return;

    // Ensure that airportData is filled before continuing
    if(!airportData.name) return;
    
    const airportLocation = {lat: airportData.latitude_deg, lng: airportData.longitude_deg}

    return (
        <div className="w-screen min-h-screen overflow-auto">
        <Head>
            <title>{airportData.name}</title>
        </Head>
            <div className="my-10 ml-10">
                <h1 className="text-4xl font-bold">{airportData.name}</h1>
                <h2 className="text-2xl">ICAO: {airportData.ident}{airportData.iata_code ? <span className="text-slate-400"> / IATA: {airportData.iata_code}</span> : null}</h2>
                <table className="my-4 text-xl">
                    <tbody>
                        <tr>
                            <td>Latitude:</td>
                            <td className="pl-4">{airportLocation.lat}</td>
                        </tr>
                        <tr>
                            <td>Longitude:</td>
                            <td className="pl-4">{airportLocation.lng}</td>
                        </tr>
                        <tr>
                            <td>Elevation:</td>
                            <td className="pl-4">{airportData.elevation_ft} ft</td>
                        </tr>
                    </tbody>
                </table>

                <div className="h-[60vh] w-[80vw] bg-[#E5E3DF] mt-6">
                    <Map centreLocation={{lat: ((airportLocation.lat + location.lat) /  2), lng: ((airportLocation.lng + location.lng) /  2)}} markerLocation={airportLocation} currentLocation={location} />
                </div>

                <div className="flex flex-wrap w-[80vw]">
                    {airportData['freqs'] ?
                        <table className="mt-6 mr-8 text-xl">
                            <tbody>
                                <h1 className="text-2xl font-bold">Frequencies</h1>
                                {airportData['freqs'].map((freq, i) => (
                                <tr key={i}>
                                    <td>{freq.description}</td>
                                    <td className="pl-4">{freq.frequency_mhz} MHz</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    :
                        <h1 className="p-5 text-lg">No Frequency Data Available</h1>
                    }

                    { airportData['runways'] ?
                    
                        airportData['runways'].map((runway, i) => (
                            <table key={i} className="mt-6 mr-8 text-xl">
                                <tbody>
                                    <h1 className="text-2xl font-bold">{"Runway "+(i+1)}</h1>
                                    <tr>
                                        <td>Surface</td>
                                        <td>{runway.surface}</td>
                                    </tr>
                                    <tr>
                                        <td>Length</td>
                                        <td>{runway.length_ft} ft</td>
                                    </tr>
                                    {runway.width_ft ?
                                        <tr>
                                            <td>Width</td>
                                            <td>{runway.width_ft} ft</td>
                                        </tr>
                                    :
                                        null
                                    }
                                    <tr>
                                        <td>Lighted</td>
                                        <td>{runway.lighted ? "true" : "false"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    :
                    <h1 className="p-5 text-lg">No Runway Data Available</h1>
                }
                </div>
            </div>
        </div>
    )
}