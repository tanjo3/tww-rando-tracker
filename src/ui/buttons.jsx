import PropTypes from 'prop-types';
import React from 'react';

import LogicHelper from '../services/logic-helper';

import Storage from './storage';

class Buttons extends React.PureComponent {
  constructor(props) {
    super(props);

    this.exportProgress = this.exportProgress.bind(this);
  }

  async exportProgress() {
    const { saveData } = this.props;

    await Storage.exportFile(saveData);
  }

  render() {
    const {
      disableLogic,
      entrancesListOpen,
      onlyProgressLocations,
      singleColorBackground,
      startingIslandListOpen,
      trackSpheres,
      toggleDisableLogic,
      toggleEntrancesList,
      toggleOnlyProgressLocations,
      toggleSingleColorBackground,
      toggleStartingIslandList,
      toggleTrackSpheres,
    } = this.props;

    const entrancesListText = entrancesListOpen
      ? 'Close Entrances'
      : 'View Entrances';
    const isRandomEntrances = LogicHelper.isRandomEntrances();

    const startingIslandListText = startingIslandListOpen
      ? 'Cancel'
      : 'Choose Starting Island';
    const isRandomStartingIsland = LogicHelper.isRandomStartingIsland();

    return (
      <div className="buttons">
        <button
          onClick={this.exportProgress}
          type="button"
        >
          Export Progress
        </button>
        <button
          onClick={toggleOnlyProgressLocations}
          type="button"
        >
          <input type="checkbox" className="button-checkbox" checked={!onlyProgressLocations} readOnly />
          Show Non-Progress Locations
        </button>
        {
          isRandomEntrances && (
            <button
              onClick={toggleEntrancesList}
              type="button"
            >
              {entrancesListText}
            </button>
          )
        }
        {
          isRandomStartingIsland && (
            <button
              onClick={toggleStartingIslandList}
              type="button"
            >
              {startingIslandListText}
            </button>
          )
        }
        <button
          onClick={toggleDisableLogic}
          type="button"
        >
          <input type="checkbox" className="button-checkbox" checked={!disableLogic} readOnly />
          Show Location Logic
        </button>
        <button
          onClick={toggleTrackSpheres}
          type="button"
        >
          <input type="checkbox" className="button-checkbox" checked={trackSpheres} readOnly />
          Track Spheres
        </button>
        <button
          onClick={toggleSingleColorBackground}
          type="button"
        >
          <input type="checkbox" className="button-checkbox" checked={singleColorBackground} readOnly />
          Single Color Background
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  disableLogic: PropTypes.bool.isRequired,
  entrancesListOpen: PropTypes.bool.isRequired,
  onlyProgressLocations: PropTypes.bool.isRequired,
  saveData: PropTypes.string.isRequired,
  singleColorBackground: PropTypes.bool.isRequired,
  startingIslandListOpen: PropTypes.bool.isRequired,
  trackSpheres: PropTypes.bool.isRequired,
  toggleDisableLogic: PropTypes.func.isRequired,
  toggleEntrancesList: PropTypes.func.isRequired,
  toggleOnlyProgressLocations: PropTypes.func.isRequired,
  toggleSingleColorBackground: PropTypes.func.isRequired,
  toggleStartingIslandList: PropTypes.func.isRequired,
  toggleTrackSpheres: PropTypes.func.isRequired,
};

export default Buttons;
