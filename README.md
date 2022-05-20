# weather-cli

A simple cli program to fetch the weather for a given USA zipcode.

## Requirements

This was built in NodeJS v16.15.0.  It likely will work in other versions, but has not been tested in them.

The app uses the openweathermap.org API, and you'll need an API key from them to make it work.

## Installation

* Clone the repo
* From the repo directory, run `npm install -g .`
* Create a `.env` file in the root repo directory with the contents `WEATHER_API_KEY=<openweathermap.org api key>`
* Run the app with `weather <zipcode>`
