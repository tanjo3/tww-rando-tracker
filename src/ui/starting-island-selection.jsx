import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LogicCalculation from '../services/logic-calculation';
import LogicHelper from '../services/logic-helper';

import Images from './images';
import KeyDownWrapper from './key-down-wrapper';

class StartingIslandSelection extends React.PureComponent {
  static NUM_ROWS = 17;

  island(islandName, numColumns) {
    const {
      updateStartingIsland,
    } = this.props;

    if (_.isNil(islandName)) {
      return null;
    }

    let fontSizeClassName = '';
    if (numColumns === 3) {
      fontSizeClassName = 'font-smallest';
    } else if (numColumns === 2) {
      fontSizeClassName = 'font-small';
    }

    const color = LogicCalculation.LOCATION_COLORS.AVAILABLE_LOCATION;

    const updateStartingIslandFunc = () => {
      updateStartingIsland(islandName);
    };

    const islandElement = (
      <div
        className={`detail-span ${color} ${fontSizeClassName}`}
        onClick={updateStartingIslandFunc}
        onKeyDown={KeyDownWrapper.onSpaceKey(updateStartingIslandFunc)}
        role="button"
        tabIndex="0"
      >
        {islandName}
      </div>
    );

    return (
      <td key={islandName}>
        {islandElement}
      </td>
    );
  }

  render() {
    const {
      clearOpenedMenus,
    } = this.props;

    const islandChunks = _.chunk(_.values(LogicHelper.ISLANDS), StartingIslandSelection.NUM_ROWS);
    const arrangedIslands = _.zip(...islandChunks);
    const numColumns = _.size(islandChunks);

    const entranceRows = _.map(arrangedIslands, (locationsRow, index) => (
      <tr key={index}>
        {_.map(locationsRow, (entranceInfo) => this.island(entranceInfo, numColumns))}
      </tr>
    ));

    return (
      <div className="zoom-map">
        <div className="zoom-map-cover" />
        <div className="zoom-map-background">
          <img src={Images.IMAGES.EMPTY_BACKGROUND} alt="" />
        </div>
        <table className="header-table">
          <tbody>
            <tr>
              <td>
                <div className="detail-span detail-not-interactive">
                  Choose Starting Island
                </div>
              </td>
              <td>
                <div
                  className="detail-span"
                  onClick={clearOpenedMenus}
                  onKeyDown={KeyDownWrapper.onSpaceKey(clearOpenedMenus)}
                  role="button"
                  tabIndex="0"
                >
                  X Close
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="detailed-locations-table">
          <tbody>
            {entranceRows}
          </tbody>
        </table>
      </div>
    );
  }
}

StartingIslandSelection.propTypes = {
  clearOpenedMenus: PropTypes.func.isRequired,
  updateStartingIsland: PropTypes.func.isRequired,
};

export default StartingIslandSelection;
