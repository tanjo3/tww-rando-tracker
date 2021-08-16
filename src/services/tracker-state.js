import _ from 'lodash';

import Locations from './locations';
import LogicCalculation from './logic-calculation';
import LogicHelper from './logic-helper';
import Macros from './macros';
import Memoizer from './memoizer';

export default class TrackerState {
  static default() {
    const newState = new TrackerState();

    newState.entrances = {};
    newState.items = _.reduce(
      LogicHelper.ALL_ITEMS,
      (accumulator, item) => _.set(
        accumulator,
        item,
        LogicHelper.startingItemCount(item),
      ),
      {},
    );
    newState.itemsForLocations = Locations.mapLocations(() => null);
    newState.locationsChecked = Locations.mapLocations(() => false);
    newState.startingIsland = "Outset Island";

    return newState;
  }

  static createStateRaw({
    entrances,
    items,
    itemsForLocations,
    locationsChecked,
    startingIsland,
  }) {
    const newState = new TrackerState();

    newState.entrances = entrances;
    newState.items = items;
    newState.itemsForLocations = itemsForLocations;
    newState.locationsChecked = locationsChecked;
    newState.startingIsland = startingIsland;

    return newState;
  }

  readState() {
    return {
      entrances: this.entrances,
      items: this.items,
      itemsForLocations: this.itemsForLocations,
      locationsChecked: this.locationsChecked,
      startingIsland: this.startingIsland,
    };
  }

  getItemValue(itemName) {
    return _.get(this.items, itemName);
  }

  incrementItem(itemName) {
    const newState = this._clone();

    let newItemCount = 1 + this.getItemValue(itemName);
    const maxItemCount = LogicHelper.maxItemCount(itemName);
    if (newItemCount > maxItemCount) {
      newItemCount = LogicHelper.startingItemCount(itemName);
    }
    _.set(newState.items, itemName, newItemCount);

    return newState;
  }

  decrementItem(itemName) {
    const newState = this._clone();

    let newItemCount = this.getItemValue(itemName) - 1;
    const minItemCount = LogicHelper.startingItemCount(itemName);
    if (newItemCount < minItemCount) {
      newItemCount = LogicHelper.maxItemCount(itemName);
    }
    _.set(newState.items, itemName, newItemCount);

    return newState;
  }

  getEntranceForExit(dungeonOrCaveName) {
    return _.get(this.entrances, dungeonOrCaveName);
  }

  getExitForEntrance(dungeonOrCaveName) {
    return _.findKey(this.entrances, (entranceName) => entranceName === dungeonOrCaveName);
  }

  setEntranceForExit(exitName, entranceName) {
    const newState = this._clone();
    _.set(newState.entrances, exitName, entranceName);
    return newState;
  }

  unsetEntranceForExit(dungeonOrCaveName) {
    const newState = this._clone();
    _.unset(newState.entrances, dungeonOrCaveName);
    return newState;
  }

  isEntranceChecked(dungeonOrCaveName) {
    return _.includes(this.entrances, dungeonOrCaveName);
  }

  isLocationChecked(generalLocation, detailedLocation) {
    return _.get(this.locationsChecked, [generalLocation, detailedLocation]);
  }

  toggleLocationChecked(generalLocation, detailedLocation) {
    const newState = this._clone();

    const isChecked = this.isLocationChecked(generalLocation, detailedLocation);
    _.set(newState.locationsChecked, [generalLocation, detailedLocation], !isChecked);

    return newState;
  }

  getItemForLocation(generalLocation, detailedLocation) {
    return _.get(this.itemsForLocations, [generalLocation, detailedLocation]);
  }

  setItemForLocation(itemName, generalLocation, detailedLocation) {
    const newState = this._clone();
    _.set(newState.itemsForLocations, [generalLocation, detailedLocation], itemName);
    return newState;
  }

  unsetItemForLocation(generalLocation, detailedLocation) {
    const newState = this._clone();
    _.set(newState.itemsForLocations, [generalLocation, detailedLocation], null);
    return newState;
  }

  setStartingIsland(islandName) {
    const newState = this._clone();
    newState.startingIsland = islandName;

    // TODO:
    // Macros.setMacro(`Can Travel to ${islandName}`, 'Nothing');
    // console.log(Macros.macros)

    // Memoizer.invalidate([
    //   LogicCalculation.isLocationAvailable,
    //   LogicCalculation._itemsRemainingForRequirement,
    // ]);

    // const rawRequirements = LogicHelper._rawRequirementsForLocation('Outset Island', "Underneath Link's House");
    // console.log( rawRequirements );
    // console.log( LogicHelper._simplifiedItemRequirements(rawRequirements) );

    // const requirements = LogicHelper.requirementsForLocation('Outset Island', "Underneath Link's House");
    // console.log( requirements );

    // const logic = new LogicCalculation(newState);
    // console.log( logic.isLocationAvailable('Outset Island', "Underneath Link's House") );

    return newState;
  }

  _clone() {
    const newState = new TrackerState();

    newState.entrances = _.clone(this.entrances);
    newState.items = _.clone(this.items);
    newState.locationsChecked = _.cloneDeep(this.locationsChecked);
    newState.itemsForLocations = _.cloneDeep(this.itemsForLocations);
    newState.startingIsland = _.clone(this.startingIsland);

    return newState;
  }
}
