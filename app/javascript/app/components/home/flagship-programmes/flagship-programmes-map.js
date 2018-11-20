import climateChangeImg from 'assets/flagship-programmes/climate_change';
import carbonCaptureImg from 'assets/flagship-programmes/carbon_capture';
import energyEfficiencyImg from 'assets/flagship-programmes/energy_efficiency';
import longTermAdaptationImg from 'assets/flagship-programmes/long_term_adaptation';
import renewableEnergyImg from 'assets/flagship-programmes/renewable_energy';
import transportImg from 'assets/flagship-programmes/transport';
import wasteManagementImg from 'assets/flagship-programmes/waste_management';
import waterConservationImg from 'assets/flagship-programmes/water_conservation';

const flagshipProgrammesSectionLink = '/mitigation/flagship-programmes';

export const flagshipProgrammes = [
  {
    link: `${flagshipProgrammesSectionLink}?id=the-climate-change-response-public-works-flagship-program`,
    title: 'Climate Change Response Public Works',
    background_image_url: climateChangeImg
  },
  {
    link: `${flagshipProgrammesSectionLink}?id=the-water-conservation-flagship-program`,
    title: 'Water Conservation',
    background_image_url: waterConservationImg
  },
  {
    link: `${flagshipProgrammesSectionLink}?id=the-renewable-energy-flagship-program`,
    title: 'Renewable Energy',
    background_image_url: renewableEnergyImg
  },
  {
    link: `${flagshipProgrammesSectionLink}?id=the-energy-efficiency-and-energy-demand-management-flagship-program`,
    title: 'Energy Efficiency & Management',
    background_image_url: energyEfficiencyImg
  },
  {
    link: `${flagshipProgrammesSectionLink}?id=the-transport-flagship-program`,
    title: 'Transport',
    background_image_url: transportImg
  },
  {
    link: `${flagshipProgrammesSectionLink}?id=the-waste-management-flagship-program`,
    title: 'Waste management',
    background_image_url: wasteManagementImg
  },
  {
    link: `${flagshipProgrammesSectionLink}?id=the-carbon-capture-and-sequestration-flagship-program`,
    title: 'Carbon Capture & Sequestration',
    background_image_url: carbonCaptureImg
  },
  {
    link: `${flagshipProgrammesSectionLink}?id=long-term-adaptation-scenarios-flagship-research-program`,
    title: 'Long-term Adaptation Scenarios',
    background_image_url: longTermAdaptationImg
  }
];
