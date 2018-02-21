# Journey-API [![Build Status](https://travis-ci.org/ed-wright/Journey-API.svg?branch=master)](https://travis-ci.org/ed-wright/Journey-API) [![Maintainability](https://api.codeclimate.com/v1/badges/d1ac774be485d653fe9a/maintainability)](https://codeclimate.com/github/Journey-Carshare/api/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d1ac774be485d653fe9a/test_coverage)](https://codeclimate.com/github/Journey-Carshare/api/test_coverage)
```json
{
  "api_call": "create_a_user",
  "browser_properties": [{
    "ip":"92.237.104.79",
    "country_code":"GB",
    "country_name":"United Kingdom",
    "region_code":"ENG",
    "region_name":"England",
    "city":"Walsall",
    "zip_code":"WS2",
    "time_zone":"Europe/London",
    "latitude":52.6,
    "longitude":-2,
    "metro_code":0
  }]
}
```


google maps api -> Web Services -> Distance Matrix API https://developers.google.com/maps/documentation/distance-matrix/start
```
https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=RG26GB&destinations=HA55NE&key=AIzaSyAeLcfPL4neCIBbtovCg0IG6FTUqON4R74
```
```json
{
    "destination_addresses": [
        "Marsh Rd, Pinner HA5 5NE, UK"
    ],
    "origin_addresses": [
        "Reading RG2 6GB, UK"
    ],
    "rows": [
        {
            "elements": [
                {
                    "distance": {
                        "text": "37.0 mi",
                        "value": 59564
                    },
                    "duration": {
                        "text": "56 mins",
                        "value": 3380
                    },
                    "status": "OK"
                }
            ]
        }
    ],
    "status": "OK"
}
```

https://postcodes.io/
```
api.postcodes.io/postcodes/HA55NE
```
```json
{
    "status": 200,
    "result": {
        "postcode": "HA5 5NE",
        "quality": 1,
        "eastings": 512150,
        "northings": 189410,
        "country": "England",
        "nhs_ha": "London",
        "longitude": -0.382421123478565,
        "latitude": 51.5923871777144,
        "european_electoral_region": "London",
        "primary_care_trust": "Harrow",
        "region": "London",
        "lsoa": "Harrow 016C",
        "msoa": "Harrow 016",
        "incode": "5NE",
        "outcode": "HA5",
        "parliamentary_constituency": "Ruislip, Northwood and Pinner",
        "admin_district": "Harrow",
        "parish": "Harrow, unparished area",
        "admin_county": null,
        "admin_ward": "Pinner South",
        "ccg": "NHS Harrow",
        "nuts": "Harrow and Hillingdon",
        "codes": {
            "admin_district": "E09000015",
            "admin_county": "E99999999",
            "admin_ward": "E05000298",
            "parish": "E43000205",
            "parliamentary_constituency": "E14000906",
            "ccg": "E38000074",
            "nuts": "UKI74"
        }
    }
}
```

https://vehiclequery.uk/

```
https://api.vehiclequery.uk/y46wpo
```
```json
{
  "status": 200,
  "vrm": "Y46 WPO",
  "vehicleMake": "RENAULT",
  "vehicleDescription": "RENAULT CLIO",
  "taxStatus": "✓ Taxed",
  "taxDate": "Tax due: 01 March 2018",
  "motStatus": "✓ MOT",
  "motDate": "Expires: 03 January 2019",
  "dateFirstRegistration": "5 June 2001",
  "yearManufacture": "2001",
  "cyclinderCapacity": "1149 cc",
  "co2Emissions": "139 g/km",
  "fuelType": "PETROL",
  "exportMarker": "No",
  "vehicleStatus": "Tax not due",
  "vehicleColour": "RED",
  "vehicleTypeApproval": "M1",
  "wheelplan": "2-AXLE-RIGID BODY",
  "revenueWeight": "Not available",
  "motHistory": ["lots of data here"]
}
```

# Model Examples

User
```json
{
	{
    "$schema" : "http://json-schema.org/draft-04/schema#",
    "title" : "User Create Schema",
    "type" : "object",
    "properties" : {
        "firstname" : { 
            "type" : "string"
        },
        "lastname" : { 
            "type" : "string"
        },
        "email" : { 
            "type" : "string"
        },
        "password" : { 
            "type" : "string"
        }
    },
    "required": ["firstname", "lastname", "email", "password"]
}
}
```

Work locations (JSON/work_locations.json)

Vehicle
```json
{
    "seats": 5,
	"vrm": "Y46 WPO",
	"vehicleMake": "RENAULT",
	"vehicleDescription": "RENAULT CLIO",
	"taxStatus": true,
	"taxDate": "01 March 2018",
	"motStatus": true,
	"motDate": "03 January 2019",
	"dateFirstRegistration": "5 June 2001",
	"yearManufacture": "2001",
    "vehicleColour": "RED",
}
```

journey
```JSON
{
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "title" : "Journeys Schema",
  "type" : "object",
  "properties" : {
    "journeyId" : { 
        "type" : "string"
    },
    "start": {
        "$ref": "#/definitions/address"
    },
    "end": {
        "$ref": "#/definitions/address"
    },
    "owner": {
      "type": "string"  
    },
    "members": {
        "type": "array",
        "items": {
            "type": "string"
        }
    },
    "created": {
        "type": "string"
    }
  },
 "definitions": {
    "address": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "postcode": {
                "type": "string"
            },
            "latitude": {
                "type": "string"
            },
            "longitude": {
                "type": "string"
            }
        },
        "required": ["name", "postcode"]
        }
    }
}
```
