import _ from 'lodash';

import CAVES from '../data/caves.json';
import CHARTS from '../data/charts.json';
import HAS_ACCESSED_LOCATION_TWEAKS from '../data/has-accessed-location-tweaks.json';
import ISLANDS from '../data/islands.json';

import Locations from './locations';
import LogicHelper from './logic-helper';
import Macros from './macros';
import Permalink from './permalink';
import Settings from './settings';

export default class LogicTweaks {
  static applyTweaks() {
    this._updateLocations();
    this._updateMacros();
  }

  static _updateLocations() {
    this._addDefeatGanondorf();
    this._updateTingleStatueReward();
    this._updateSunkenTriforceTypes();
    this._applyHasAccessedLocationTweaksForLocations();
    this._updateDVLocations();
  }

  static _updateMacros() {
    this._updateDungeonEntranceMacros();
    this._updateCaveEntranceMacros();
    this._updateChartMacros();
    this._updateTriforceMacro();
    this._applyHasAccessedLocationTweaksForMacros();
    this._updateDVMacros();
  }

  static _addDefeatGanondorf() {
    Locations.setLocation(
      LogicHelper.DUNGEONS.GANONS_TOWER,
      LogicHelper.DEFEAT_GANONDORF_LOCATION,
      Locations.KEYS.NEED,
      'Can Reach and Defeat Ganondorf',
    );
  }

  static _updateTingleStatueReward() {
    Locations.setLocation(
      LogicHelper.ISLANDS.TINGLE_ISLAND,
      'Ankle - Reward for All Tingle Statues',
      Locations.KEYS.NEED,
      'Tingle Statue x5',
    );
  }

  static _updateSunkenTriforceTypes() {
    if (Settings.getOptionValue(Permalink.OPTIONS.RANDOMIZE_CHARTS)) {
      return;
    }

    _.forEach(ISLANDS, (islandName) => {
      const originalItem = Locations.getLocation(
        islandName,
        'Sunken Treasure',
        Locations.KEYS.ORIGINAL_ITEM,
      );

      if (_.startsWith(originalItem, 'Triforce Shard')) {
        Locations.setLocation(
          islandName,
          'Sunken Treasure',
          Locations.KEYS.TYPES,
          Settings.FLAGS.SUNKEN_TRIFORCE,
        );
      }
    });
  }

  static _replaceCanAccessOtherLocation(requirements) {
    return requirements.replace(/Can Access Other Location/g, 'Has Accessed Other Location');
  }

  static _applyHasAccessedLocationTweaksForLocations() {
    const itemLocationTweaks = HAS_ACCESSED_LOCATION_TWEAKS.itemLocations;
    _.forEach(itemLocationTweaks, (generalLocationInfo, generalLocation) => {
      _.forEach(generalLocationInfo, (detailedLocation) => {
        const requirements = Locations.getLocation(
          generalLocation,
          detailedLocation,
          Locations.KEYS.NEED,
        );
        const newNeeds = this._replaceCanAccessOtherLocation(requirements);

        Locations.setLocation(
          generalLocation,
          detailedLocation,
          Locations.KEYS.NEED,
          newNeeds,
        );
      });
    });
  }

  static _updateDVLocations() {
    if (Settings.getOptionValue(Permalink.OPTIONS.LOGIC_MOD) === 'Glitched \u2013 Lunatic') {
      // TODO: Read changes from a file rather than hard-coding
      Locations.setLocation(
        'Windfall Island',
        'Kane - Place Six Idols on Gate',
        Locations.KEYS.TYPES,
        'Long Sidequest, Expensive Purchase',
      );
      Locations.setLocation(
        'Windfall Island',
        'Kane - Place Shop Guru Statue on Gate',
        Locations.KEYS.TYPES,
        'Long Sidequest, Expensive Purchase',
      );
      Locations.setLocation(
        'Windfall Island', 'Kane - Place Postman Statue on Gate',
        Locations.KEYS.TYPES,
        'Long Sidequest',
        'Expensive Purchase',
      );
      Locations.setLocation(
        'Windfall Island',
        'Kane - Place Six Flags on Gate',
        Locations.KEYS.TYPES,
        'Long Sidequest, Expensive Purchase',
      );
      Locations.setLocation(
        'Mailbox',
        "Beedle's Silver Membership Reward",
        Locations.KEYS.TYPES,
        'Expensive Purchase, Short Sidequest, Misc',
      );
      Locations.setLocation(
        'Mailbox',
        "Beedle's Gold Membership Reward",
        Locations.KEYS.TYPES,
        'Expensive Purchase, Short Sidequest, Misc',
      );
    }

    const maxStartingItems = Settings.getOptionValue(Permalink.OPTIONS.ADDITIONAL_STARTING_MAX);
    for (let i = 0; i < maxStartingItems; i += 1) {
      Locations.setLocation(
        'The Great Sea',
        `Starting Item ${i + 1}`,
        Locations.KEYS.NEED,
        'Nothing',
      );
    }
  }

  static _applyHasAccessedLocationTweaksForMacros() {
    const macrosTweaks = HAS_ACCESSED_LOCATION_TWEAKS.macros;
    _.forEach(macrosTweaks, (macroName) => {
      const macroValue = Macros.getMacro(macroName);
      const newMacro = this._replaceCanAccessOtherLocation(macroValue);
      Macros.setMacro(macroName, newMacro);
    });
  }

  static _canAccessMacroName(locationName) {
    return `Can Access ${locationName}`;
  }

  static _updateDungeonEntranceMacros() {
    if (!LogicHelper.isRandomDungeonEntrances()) {
      return;
    }

    _.forEach(LogicHelper.mainDungeons(), (dungeon) => {
      const macroName = this._canAccessMacroName(dungeon);
      const entryName = LogicHelper.entryName(dungeon);
      Macros.setMacro(macroName, entryName);
    });
  }

  static _updateCaveEntranceMacros() {
    if (!LogicHelper.isRandomCaveEntrances()) {
      return;
    }

    _.forEach(CAVES, (cave) => {
      const macroName = this._canAccessMacroName(cave);
      const entryName = LogicHelper.entryName(cave);
      Macros.setMacro(macroName, entryName);
    });
  }

  static _updateChartMacros() {
    if (!Settings.getOptionValue(Permalink.OPTIONS.RANDOMIZE_CHARTS)) {
      return;
    }

    _.forEach(CHARTS, (chart, index) => {
      // assume everything is a Treasure Chart and clear any additional requirements like
      // wallet upgrades
      const macroName = `Chart for Island ${index + 1}`;
      Macros.setMacro(macroName, chart);
    });
  }

  static _updateTriforceMacro() {
    Macros.setMacro('All 8 Triforce Shards', 'Triforce Shard x8');
  }

  static _updateDVMacros() {
    Macros.setMacro('Can Access Hyrule', 'Triforce Shard x8');

    if (!Settings.getOptionValue(Permalink.OPTIONS.RANDOMIZE_STARTING_ISLAND)) {
      Macros.setMacro('Can Travel to Outset Island', 'Nothing');
    }
  }
}
