#! /usr/bin/env node

const yargs = require("yargs")
const https = require("https")
const dotenv = require("dotenv")

dotenv.config()

const usage = "\nUsage: weather <zipcode>"
const options = yargs
  .usage(usage)
  // .option("--set-default", {describe: "Set default zipcode", type: ""})
  .help(true)
  .argv

yargs.check((argv) => {
  if (isNaN(argv._))
    throw new Error("Weather must be called with one valid US zipcode as its argument.")
  else
    return true
})

function makeAPICall() {
  const httpOptions = {
    hostname: "api.openweathermap.org",
    path: `/data/2.5/weather?zip=01338,us&appid=${process.env.WEATHER_API_KEY}`,
    method: "POST"
  }

  const req = https.request(httpOptions, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });
  })

  req.on('error', error => {
    console.error(error);
  });

  req.end();
}

makeAPICall()