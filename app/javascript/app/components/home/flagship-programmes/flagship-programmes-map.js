import climateChangeImg from 'assets/flagship-programmes/climate_change';
import carbonCaptureImg from 'assets/flagship-programmes/carbon_capture';
import energyEfficiencyImg from 'assets/flagship-programmes/energy_efficiency';
import longTermAdaptationImg from 'assets/flagship-programmes/long_term_adaptation';
import renewableEnergyImg from 'assets/flagship-programmes/renewable_energy';
import transportImg from 'assets/flagship-programmes/transport';
import wasteManagementImg from 'assets/flagship-programmes/waste_management';
import waterConservationImg from 'assets/flagship-programmes/water_conservation';

const flagshipProgrammesSectionLink = '/mitigation-actions/flagship-programmes';

export const flagshipProgrammes = [
  {
    link: `${flagshipProgrammesSectionLink}#climate-change`,
    title: 'Climate Change Response Public Works',
    background_image_url: climateChangeImg
  },
  {
    link: `${flagshipProgrammesSectionLink}#water-conservation`,
    title: 'Water Conservation',
    background_image_url: waterConservationImg
  },
  {
    link: `${flagshipProgrammesSectionLink}#renewable-energy`,
    title: 'Renewable Energy',
    background_image_url: renewableEnergyImg
  },
  {
    link: `${flagshipProgrammesSectionLink}#energy-efficiency`,
    title: 'Energy Efficiency & Management',
    background_image_url: energyEfficiencyImg
  },
  {
    link: `${flagshipProgrammesSectionLink}#transport`,
    title: 'Transport',
    background_image_url: transportImg
  },
  {
    link: `${flagshipProgrammesSectionLink}#waste-management`,
    title: 'Waste management',
    background_image_url: wasteManagementImg
  },
  {
    link: `${flagshipProgrammesSectionLink}#carbon-capture`,
    title: 'Carbon Capture & Sequestration',
    background_image_url: carbonCaptureImg
  },
  {
    link: `${flagshipProgrammesSectionLink}#long-term-adaptation`,
    title: 'Long-term Adaptation Scenarios',
    background_image_url: longTermAdaptationImg
  }
];
