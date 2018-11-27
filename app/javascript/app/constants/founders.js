import fmencbnsImage from 'assets/fmencbns.png';
import bmzImage from 'assets/bmz.png';

export default [
  {
    link: 'https://www.bmz.de/en/',
    orderingString: 'FMBMZ',
    img: { alt: 'FMBMZ', src: bmzImage }
  },
  {
    link: 'http://www.bmub.bund.de/en/',
    orderingString: 'FMENCBNS',
    img: { alt: 'FMENCBNS', src: fmencbnsImage, customClass: 'BMULogo' },
    description: 'This initiative is a part of the International Climate Initiative (IKI).'
  }
];
