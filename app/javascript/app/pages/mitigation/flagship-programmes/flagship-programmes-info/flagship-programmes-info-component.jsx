import React, { PureComponent } from 'react';
import SectionTitle from 'components/section-title';
import flagshipLogo from 'assets/flagship-logo.png';
import flagshipLogoRetina from 'assets/flagship-logo@2x.png';
import styles from './flagship-programmes-info-styles.scss';

class FlagshipProgrammesInfo extends PureComponent {
  render() {
    return (
      <div className={styles.flagshipProgrammes}>
        <div className={styles.generalInfoContainer}>
          <div className={styles.generalInfo}>
            <SectionTitle
              isSubtitle
              title="Flagship Programmes"
              className={styles.title}
            />
            <p>
              <span className={styles.bold}>
                South Africa already has a well-developed base for mitigating climate change and building climate resilience,
              </span>
              {' '}
              which by in large, responds to the challenges identified in the previous section;  however the current level and speed of action is insufficient to mitigate national GHG emissions and enhance climate change resilience on the scale required.  The National Climate Change Response White Paper (NCCRP), approved by Cabinet in October 2011, identifies a set of Near-Term Priority Flagship Programmes, which are frontrunners or ‘game-changers’ in South Africa’s climate action in key sectors.
            </p>
            <p>
              <a href="/">
                The Near-term Priority Flagship Programmes
              </a>
              {' '}
              respond to the three key challenges facing South Africa and other countries as global efforts to address climate change intensify:
            </p>
            <ul>
              <li>
                <span className={styles.bold}>
                  Igniting national-scale action at the speed required to respond to climate change,
                </span>
                i.e. limiting GHG emissions and/or enabling adaptation to the impacts of unavoidable climate change with the necessary urgency.
              </li>
              <li>
                <span className={styles.bold}>
                  Demonstrating the course of actions needed to respond to climate change effectively and efficiently
                </span>
                is not only possible, but highly beneficial, unlocking and realising significant social, economic and environmental benefits;
              </li>
              <li>
                <span className={styles.bold}>
                  Attracting resources at the scale required to enable meaningful transformation,
                </span>
                i.e. transformation at the scale that effectively limits atmospheric GHG emissions and/or enables adaptation to the impacts of unavoidable climate change.
              </li>
            </ul>
            <p>
              The Climate Change Flagship programmes are implementation programmes, and represent the leading actions committed to and underway, which advance South Africa’s climate change response efforts.  The programmes include both the scaling-up of existing climate change initiatives and new initiatives that are ready to come on-stream by 2020.
            </p>
          </div>
          <div className={styles.priorityAreasContainer}>
            <img
              className={styles.flagshipLogo}
              srcSet={`${flagshipLogo} 1x, ${flagshipLogoRetina} 2x`}
              src={flagshipLogo}
              alt="South Africa NDC"
            />
            <div className={styles.priorityAreas}>
              <h3 className={styles.priorityAreasTitle}> Priority areas</h3>
              <p>
                The priority areas for the scaled-up implementation of South Africa’s climate response are listed below:
              </p>
              <ul>
                <li>
                  Agriculture, food systems and food security
                </li>
                <li>
                  Energy efficiency and energy demand management
                </li>
                <li>
                  Carbon capture and storage
                </li>
                <li>
                  Disaster risk reduction and management
                </li>
                <li>
                  Health
                </li>
                <li>
                  Land, biodiversity and ecosystems
                </li>
                <li>
                  Low carbon, climate resilient built environment, communities and human settlements
                </li>
                <li>
                  Low carbon climate resilient spatial development
                </li>
                <li>
                  Low carbon, climate resilient transport systems
                </li>
                <li>
                  Renewable energy
                </li>
                <li>
                  Social protection systems and public works programmes
                </li>
                <li>
                  Waste management
                </li>
                <li>
                  Water conservation and water demand management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FlagshipProgrammesInfo;
