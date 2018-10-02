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

## Mitigation Effects

### Parameters
- none

### CSV download endpoint

`/api/v1/mitigation/mitigation_effects.csv`


File format:

theme | Name | Coordinator | Effects1 ... Effects12 | Created at | Updated at

### JSON API endpoint

#### Data

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


## Flagship Programmes

### Parameters
- none

### JSON API endpoint

#### Data

`/api/v1/mitigation/flagship_programmes`

```
{
  data: [
    {
      "id": 1
      "description": "South Africa’s location, geography and size all play a role in providing the country with multiple renewable energy (RE)...",
      "position": 1,
      "subPrograms": "\"*Renewable Energy Independent Power Producer Procurement (REIPPP) Programme *National Solar Water Heating Programme *Eskom renewable energy projects *Off-grid household electrification *Green industries development *Green Energy Accord *Strategic environmental assessment for Renewable Energy Development Zones \"",
      "workPackage": "\"*Public Sector RE Programme *Transnet PV Programme (real estate) *Transnet Wayside Energy Storage Programme (freight rail) *Public Sector RE Procurement *NERSA SSEG Registration and Tracking System Development *Integrated RE GCF Proposal and Programme Development *Establishment of Inter- governmental co-ordination mechanism for embedded generation *Embedded RE knowledge products (information web portal/resources) and capacity building *Enhancing grid management and capacity at local government level *Enhancing grid performance through appropriate refurbishment and maintenance of distribution level grids *Embedded RE funding (revenue and tariff modelling, market- based incentives and credit lines) *Distribution-scale renewable energy generation market development *Implementation of Integrated fuel cell technologies, energy storage and renewable energy \"",
      "outcomes": "Widespread development, integration, use, and affordable access to South Africa’s abundant renewable energy (RE) resources through the large-scale and deployment of appropriate technologies at all scales, driving innovation; localisation of RE goods, services and technologies; energy security and economic growth",
      "flagshipTheme": {
        "id": 1,
        "name": "The Climate Change Response Public Works Flagship Program",
        "position": 1
      },
      "flagshipComponents": [
        {
          "id": 33,
          "name": "Energy Efficiency in Public Buildings Programme",
          "mainActivities": "\"*Preparation of detailed business case and implementation plan *Municipal engagements *Operationalisation of programme \"",
          "lead": "DOE,DPW,NBI",
          "status": "Appraisal is being finalized",
          "milestone": "\"*Implementation preparation *Operationalisation/ Rollout \"",
          "barriers": null,
          "nextSteps": "\"*Finalisation DEA contribution *Finalisation of appraisal *DPW, DEA, DOE DDG trilateral *Formalisation of institutional Arrangements *Establishment of an EE NDC Implementation and Investment Working Group (including municipalities) *Analysis of current available resources *Integration of DPW work with the ECCS and harmonise the implementation approach of both DPW and DOE *Finalization of pre-commissioning implementation plan *Prepare for engagements with this municipalities to guide the spending of the municipalities in current financial year \"",
          "timeframe": "Dec-17",
          "support": "GIZ CSP III"
        },...
      ]
    }, ...
  ]
}
```
