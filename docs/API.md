# CW South Africa JSON API & CSV download

## GHG Inventory improvement projects

### Parameters
- none

### CSV download endpoint

`/api/v1/inventory_improvement_projects.csv`


File format:

Project | Sector | Objective | Partner | Donor | Outcome | Status | Timelines

### JSON API endpoint

#### Data

`/api/v1/inventory_improvement_projects`

```

[  
   {  
      "project":"long string",
      "sector":"Energy",
      "objective":"long string",
      "partner":"string",
      "donor":"string",
      "outcome":"long string",
      "status":"Completed",
      "timelines":"2014-2015"
   }
]
```


## Mitigation Themes

### Parameters
- none

### CSV download endpoint

`/api/v1/mitigation/mitigation_themes.csv`


File format:

Title | Position | Mitigation sector | Created at | Updated at

### JSON API endpoint

#### Data

`/api/v1/mitigation/mitigation_themes`

```

[  
    {
        "title": "Diversification of energy resources (Electricity generation and liquid fuels)",
        "position": 1,
        "flagship_programmes": []
    }
]
```

## Mitigation Sectors

### Parameters
- none

### CSV download endpoint

`/api/v1/mitigation/mitigation_sectors.csv`


File format:

Name | Description | Position | Created at | Updated at

### JSON API endpoint

#### Data

`/api/v1/mitigation/mitigation_sectors`

```

[  
    {
        "name": "Energy",
        "description": "test",
        "mitigation_themes": [
            {
                "title": "Diversification of energy resources (Electricity generation and liquid fuels)",
                "position": 1
            }
        ]
    }
]
```


## Mitigation Actions

### Parameters
- none

### CSV download endpoint

`/api/v1/mitigation/mitigation_actions.csv`


File format:

Mitigation theme | Name | Objectives | Mitigation type | Status | Actor | Time horizon | Ghg | Estimated emission reduction | Cobenefits | Bur1 | Created at | Updated at

### JSON API endpoint

#### Data

`/api/v1/mitigation/mitigation_actions`

```

[  
    {
        "name": "Eskom Open Cycle Gas Turbines (OCGT)",
        "objectives": "Between 2007 and 2014 a total of 7,827 net GWh of electricity was generated from Eskom’s OCGT plants",
        "mitigation_type": "Economic",
        "status": "Existing measure",
        "actor": "Eskom",
        "time_horizon": null,
        "ghg": "CO2, CH4, N2O",
        "estimated_emission_reduction": "0.9 MtCO2e. (2006-2014), 7,827 GWh electricity generated.",
        "mitigation_theme": {
            "title": "Electricity generation",
            "position": 4
        }
    }
]
```