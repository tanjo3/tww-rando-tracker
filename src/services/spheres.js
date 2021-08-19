import _ from 'lodash';

import Locations from './locations';
import LogicCalculation from './logic-calculation';
import LogicHelper from './logic-helper';
import Permalink from './permalink';
import Settings from './settings';
import TrackerState from './tracker-state';

export default class Spheres {
  constructor(trackerState) {
    this.state = trackerState;
    this.spheres = null;
  }

  sphereForLocation(generalLocation, detailedLocation) {
    if (_.isNil(this.spheres)) {
      this._calculate();
    }

    return _.get(this.spheres, [generalLocation, detailedLocation]);
  }

  _calculate() {
    this.temporaryState = TrackerState.default();
    this.spheres = Locations.mapLocations(() => null);
    this.entrancesAdded = _.reduce(
      LogicHelper.allRandomEntrances(),
      (accumulator, entrance) => _.set(accumulator, entrance, false),
      {},
    );

    this.currentSphere = -1;
    const logic = new LogicCalculation(this.temporaryState);
    const maxStartingItems = Settings.getOptionValue(Permalink.OPTIONS.ADDITIONAL_STARTING_MAX);
    for (let i = 0; i < maxStartingItems; i += 1) {
      this._updateItemsForLocation('The Great Sea', `Starting Item ${i + 1}`, logic);
    }

    this.anyItemsAdded = true;
    this.currentSphere = 0;

    this._transferEntrances();

    while (this.anyItemsAdded) {
      this.anyItemsAdded = false;

      this._updateEntranceItems();
      this._updateSmallKeys();
      this._updateItems();

      this.currentSphere += 1;
    }

    return this.spheres;
  }

  _sphereForLocation(generalLocation, detailedLocation) {
    return _.get(this.spheres, [generalLocation, detailedLocation]);
  }

  _updateSphereForLocation(generalLocation, detailedLocation) {
    _.set(this.spheres, [generalLocation, detailedLocation], this.currentSphere);
  }

  _isEntranceAdded(dungeonOrCaveName) {
    return _.get(this.entrancesAdded, dungeonOrCaveName);
  }

  _setEntranceAdded(dungeonOrCaveName) {
    _.set(this.entrancesAdded, dungeonOrCaveName, true);
  }

  _updateStateWithItem(itemName) {
    this.temporaryState = this.temporaryState.incrementItem(itemName);
  }

  _transferEntrances() {
    _.forEach(LogicHelper.allRandomEntrances(), (dungeonOrCaveName) => {
      const entranceForExit = this.state.getEntranceForExit(dungeonOrCaveName);

      if (!_.isNil(entranceForExit)) {
        this.temporaryState = this.temporaryState.setEntranceForExit(
          dungeonOrCaveName,
          entranceForExit,
        );
      }
    });
  }

  _updateEntranceItems() {
    const logic = new LogicCalculation(this.temporaryState);

    _.forEach(LogicHelper.allRandomEntrances(), (dungeonOrCaveName) => {
      if (this._isEntranceAdded(dungeonOrCaveName)) {
        return true; // continue
      }

      const exitForEntrance = this.temporaryState.getExitForEntrance(dungeonOrCaveName);
      if (_.isNil(exitForEntrance)) {
        return true; // continue
      }

      if (logic.isEntranceAvailable(dungeonOrCaveName)) {
        const entryName = LogicHelper.entryName(exitForEntrance);

        this._updateStateWithItem(entryName);
        this._setEntranceAdded(dungeonOrCaveName);
      }

      return true; // continue
    });
  }

  _updateSmallKeys() {
    _.forEach(LogicHelper.mainDungeons(), (dungeonName) => {
      const locations = LogicHelper.filterDetailedLocations(
        dungeonName,
        { isDungeon: true },
      );
      const smallKeyName = LogicHelper.smallKeyName(dungeonName);

      let anySmallKeysAdded = true;

      while (anySmallKeysAdded) {
        anySmallKeysAdded = this._updateSmallKeysForDungeon(dungeonName, locations, smallKeyName);
      }
    });
  }

  _updateSmallKeysForDungeon(dungeonName, locations, smallKeyName) {
    let anySmallKeysAdded = false;
    const logic = new LogicCalculation(this.temporaryState);

    _.forEach(locations, (detailedLocation) => {
      const sphere = this._sphereForLocation(dungeonName, detailedLocation);
      if (!_.isNil(sphere)) {
        return true; // continue
      }

      const itemAtLocation = this.state.getItemForLocation(
        dungeonName,
        detailedLocation,
      );
      if (itemAtLocation !== smallKeyName) {
        return true; // continue
      }

      if (logic.isLocationAvailable(dungeonName, detailedLocation)) {
        this._updateStateWithItem(itemAtLocation);
        this._updateSphereForLocation(dungeonName, detailedLocation);
        anySmallKeysAdded = true;
      }

      return true; // continue
    });

    return anySmallKeysAdded;
  }

  _updateItems() {
    const logic = new LogicCalculation(this.temporaryState);

    _.forEach(Locations.allGeneralLocations(), (generalLocation) => {
      const detailedLocations = Locations.detailedLocationsForGeneralLocation(generalLocation);

      _.forEach(detailedLocations, (detailedLocation) => {
        this._updateItemsForLocation(generalLocation, detailedLocation, logic);
      });
    });
  }

  _updateItemsForLocation(generalLocation, detailedLocation, logic) {
    const sphere = this._sphereForLocation(generalLocation, detailedLocation);
    if (!_.isNil(sphere)) {
      return;
    }

    const isLocationAvailable = logic.isLocationAvailable(generalLocation, detailedLocation);
    if (!isLocationAvailable) {
      return;
    }

    this._updateSphereForLocation(generalLocation, detailedLocation);

    const itemAtLocation = this.state.getItemForLocation(
      generalLocation,
      detailedLocation,
    );

    if (!_.isNil(itemAtLocation)) {
      this._updateStateWithItem(itemAtLocation);
      this.anyItemsAdded = true;
    }
  }
}
