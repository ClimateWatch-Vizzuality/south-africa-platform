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

## Financial Resources Support Needed

### Parameters

- none

### JSON API endpoint

#### Data

`/api/v1/financial_resource/support_needs`

```
[
  "data": [{
    "id": 1,
    "category": "Financial",
    "focusArea": "Renewable energy, including off-grid and mini grid",
    "reference": "Energy Efficiency and Demand Side Management Municipality Programme",
    "supportType": "general",
    "scheme": "grant"
  }, ...]
  "meta": [
    {
      "code": "Domestic funds_9",
      "indicator": "Domestic funds (2008-2014)",
      "category": "Disaster relief funds",
      "indicatorType": "Grant",
      "unit": "amount (USD)"
    }
  ]
]
```

## Financial Resources Support Received

### Parameters

- none
## Mitigation Effects

### Parameters
- none

### CSV download endpoint

`/api/v1/mitigation/mitigation_effects.csv`


File format:

theme | Name | Coordinator | Effects1 ... Effects12 | Created at | Updated at

### JSON API endpoint

#### Data

`/api/v1/financial_resource/received_supports`

```
[
  {
    "data": [
      {
        "id": 1,
        "financeFlow": "Additional support received",
        "amountZar": 20,
        "amountUsd": 2,
        "timeframes": null,
        "focusArea1": false,
        "focusArea2": false,
        "focusArea3": true,
        "focusArea4": false,
        "focusArea5": false,
        "focusArea6": false,
        "focusArea7": true,
        "focusArea8": false,
        "cofinancing": null,
        "purposeFunds": "South Africa-Norway Research Cooperation on Climate, the Environment and Clean Energy (SANCOOP) aims to contribute to expanded research opportunities and improve research cooperation based on equal partnership between South African and Norwegian researchers within the selected thematic areas, and the implementing agency is South Africa National Research Foundation.",
        "programFunds": null,
        "outcomeFunds": null,
        "typeFunds": "Grant",
        "donor": {
          "id": 1,
          "name": "Norway",
          "description": null
        }
      },
    "meta": [{
      "code": "finance_flow",
      "indicator": "Support recived",
      "category": null,
      "indicatorType": null,
      "unit": null
    }, ...]
  }
]
```
`/api/v1/mitigation/mitigation_effects`

```

[
  "data": [{
		"theme": "Green Transport",
		"name": "Biofuels",
		"coordinator": "Biofuel producers",
		"effects1": "0.3-3",
		"effects2": "0.7-3",
		"effects3": "0.1-2",
		"effects4": "not estimated",
		"effects5": "not applicable",
		"effects6": "not estimated",
		"effects7": "not estimated",
		"effects8": "not estimated",
		"effects9": "not estimated",
		"effects10": "not estimated",
		"effects11": "not estimated",
		"effects12": "not estimated"
	},
  "meta": [{
		"id": null,
		"code": "theme",
		"indicator": "Theme",
		"unit": null,
		"cautions": null
	},
]
```
