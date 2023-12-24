export default async function handler(req, res) {
  const longitude = (req.query['longitude'] ? req.query['longitude'] : '' ).toString();
  const latitude = (req.query['latitude'] ? req.query['latitude'] : '' ).toString();

  if(!longitude || !latitude){
    return res.status(400).json({error: "Missing longitude or latitude"})
  }
  
  var nearbyData = await (await fetch(`https://airlabs.co/api/v9/nearby?lat=${latitude}&lng=${longitude}&distance=100&api_key=${process.env.AIRLABS_API_KEY}`)).json();

  // This removes unnecessary data, as well as preventing the API key being returned to the client as the key would be returned in nearbyData[request][key][api_key];
  nearbyData = nearbyData.response.airports;
  res.status(200).json(nearbyData);
}