export default async function handler(req, res) {
    const icao_code = (req.query["icao_code"]).toString();
  
    if(!icao_code || icao_code === "undefined"){
      return res.status(400).json({error: "Missing icao_code!"})
    }
    
    var airportData = await (await fetch(`https://airportdb.io/api/v1/airport/${icao_code}?apiToken=${process.env.AIRPORT_DB_API_KEY}`)).json();
    res.status(200).json(airportData)
}