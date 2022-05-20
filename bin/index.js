#! /usr/bin/env node

const https = require("https")
const dotenv = require("dotenv")
dotenv.config()

const yargs = require("yargs")
  .usage("\nUsage: weather <zipcode>")
  .help(true)
  .check((argv) => {
    if (isNaN(argv._))
      throw new Error("Weather must be called with one valid US zipcode as its argument.")
    else
      return true
  })

function makeAPICall(zipcode, apiKey) {
  const httpOptions = {
    hostname: "api.openweathermap.org",
    path: `/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${apiKey}`,
    method: "POST"
  }

  const req = https.request(httpOptions, res => {
    res.setEncoding('utf8')
    res.on('data', data => {
      console.log(data)
      outputResults(JSON.parse(data), zipcode)
    });
  })

  req.on('error', error => {
    console.error(error);
  });

  req.end();
}

function outputResults(data, zipcode) {
  const visibility = data.visibility = 10000 ? "Effectively Unlimited" : `${data.visibility} ft.`

  const output = `Here's the weather for ${data.name} (${zipcode}):

  Overall: ${data.weather[0].main} (${data.weather[0].description})  
  Temperature: ${data.main.temp}°F
  Visiblity: ${visibility}
  `

  console.log(output)
}

makeAPICall(yargs.argv._[0], process.env.WEATHER_API_KEY)