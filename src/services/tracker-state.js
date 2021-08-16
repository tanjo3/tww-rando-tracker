import _ from 'lodash';

import Locations from './locations';
import LogicHelper from './logic-helper';
import Macros from './macros';

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
    newState.startingIsland = null;

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
    const newState = this._clone({ items: true });

    let newItemCount = 1 + this.getItemValue(itemName);
    const maxItemCount = LogicHelper.maxItemCount(itemName);
    if (newItemCount > maxItemCount) {
      newItemCount = LogicHelper.startingItemCount(itemName);
    }
    _.set(newState.items, itemName, newItemCount);

    return newState;
  }

  decrementItem(itemName) {
    const newState = this._clone({ items: true });

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
    const newState = this._clone({ entrances: true });
    _.set(newState.entrances, exitName, entranceName);
    return newState;
  }

  unsetEntranceForExit(dungeonOrCaveName) {
    const newState = this._clone({ entrances: true });
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
    const newState = this._clone({ locationsChecked: true });

    const isChecked = this.isLocationChecked(generalLocation, detailedLocation);
    _.set(newState.locationsChecked, [generalLocation, detailedLocation], !isChecked);

    return newState;
  }

  getItemForLocation(generalLocation, detailedLocation) {
    return _.get(this.itemsForLocations, [generalLocation, detailedLocation]);
  }

  getLocationsForItem(itemName) {
    const locationsForItem = [];

    _.forEach(this.itemsForLocations, (generalLocationData, generalLocation) => {
      _.forEach(generalLocationData, (itemAtLocation, detailedLocation) => {
        if (itemAtLocation === itemName) {
          locationsForItem.push({
            generalLocation,
            detailedLocation,
          });
        }
      });
    });

    return locationsForItem;
  }

  setItemForLocation(itemName, generalLocation, detailedLocation) {
    const newState = this._clone({ itemsForLocations: true });
    _.set(newState.itemsForLocations, [generalLocation, detailedLocation], itemName);
    return newState;
  }

  unsetItemForLocation(generalLocation, detailedLocation) {
    const newState = this._clone({ itemsForLocations: true });
    _.set(newState.itemsForLocations, [generalLocation, detailedLocation], null);
    return newState;
  }

  setStartingIsland(islandName) {
    const newState = this._clone({ startingIsland: true });

    Macros.setMacro(`Can Travel to ${islandName}`, 'Nothing');
    newState.startingIsland = islandName;

    LogicHelper.reset();

    return newState;
  }

  _clone({
    entrances: cloneEntrances,
    items: cloneItems,
    locationsChecked: cloneLocationsChecked,
    itemsForLocations: cloneItemsForLocations,
    startingIsland: cloneStartingIsland,
  }) {
    const newState = new TrackerState();

    newState.entrances = cloneEntrances
      ? _.clone(this.entrances)
      : this.entrances;
    newState.items = cloneItems
      ? _.clone(this.items)
      : this.items;
    newState.locationsChecked = cloneLocationsChecked
      ? _.cloneDeep(this.locationsChecked)
      : this.locationsChecked;
    newState.itemsForLocations = cloneItemsForLocations
      ? _.cloneDeep(this.itemsForLocations)
      : this.itemsForLocations;
    newState.startingIsland = cloneStartingIsland
      ? _.clone(this.startingIsland)
      : this.startingIsland;

    return newState;
  }
}
