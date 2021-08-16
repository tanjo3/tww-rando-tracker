import _ from 'lodash';

import CAN_CHAIN_CHARTS_OPTIONS from '../data/can-chain-charts-options.json';
import CONVENIENCE_OPTIONS from '../data/convenience-options.json';
import CUSTOM_BCK_ENTRY_OPTIONS from '../data/custom-bck-entry-options.json';
import KEYMODE_MODE_OPTIONS from '../data/keymode-options.json';
import LOGIC_MOD_OPTIONS from '../data/logic-mod-options.json';
import NUM_STARTING_TRIFORCE_SHARDS_OPTIONS from '../data/num-starting-triforce-shards-options.json';
import OPTIONS from '../data/options.json';
import PROGRESSIVE_STARTING_ITEMS from '../data/progressive-starting-items.json';
import RACE_MODE_OPTIONS from '../data/race-mode-options.json';
import RANDOMIZE_ENTRANCES_OPTIONS from '../data/randomize-entrances-options.json';
import REGULAR_STARTING_ITEMS from '../data/regular-starting-items.json';
import SWORD_MODE_OPTIONS from '../data/sword-mode-options.json';

import BinaryString from './binary-string';
import Constants from './constants';

export default class Permalink {
  static OPTIONS = Constants.createFromArray(OPTIONS);

  static RANDOMIZE_ENTRANCES_OPTIONS = Constants.createFromArray(RANDOMIZE_ENTRANCES_OPTIONS);

  static SWORD_MODE_OPTIONS = Constants.createFromArray(SWORD_MODE_OPTIONS);

  static DROPDOWN_OPTIONS = {
    [this.OPTIONS.KEYMODE]: KEYMODE_MODE_OPTIONS,
    [this.OPTIONS.RANDOMIZE_ENTRANCES]: RANDOMIZE_ENTRANCES_OPTIONS,
    [this.OPTIONS.NUM_STARTING_TRIFORCE_SHARDS]: NUM_STARTING_TRIFORCE_SHARDS_OPTIONS,
    [this.OPTIONS.SWORD_MODE]: SWORD_MODE_OPTIONS,
    [this.OPTIONS.RACE_MODE]: RACE_MODE_OPTIONS,
    [this.OPTIONS.NUM_DUNGEON_RACE_MODE]: _.range(1, 7),
    [this.OPTIONS.LOGIC_MOD]: LOGIC_MOD_OPTIONS,
    [this.OPTIONS.CONVENIENCE_OPTION]: CONVENIENCE_OPTIONS,
    [this.OPTIONS.CAN_CHAIN_CHARTS]: CAN_CHAIN_CHARTS_OPTIONS,
    [this.OPTIONS.CUSTOM_BCK_ENTRY]: CUSTOM_BCK_ENTRY_OPTIONS,
    [this.OPTIONS.ADDITIONAL_STARTING_MAX]: _.range(0, 48),
  };

  static SPINBOX_OPTIONS = {
    [this.OPTIONS.ADDITIONAL_STARTING_MAX]: _.range(0, 48),
  };

  static DEFAULT_PERMALINK = 'MS45LjBqAEEAI0ECAAAAAAAAAAAAMA4QIMAAEAAggACDEAUAhBogAAAAAg==';

  static decode(permalinkString) {
    const binaryString = BinaryString.fromBase64(permalinkString);
    const options = {};

    _.forEach(this._CONFIG, (configItem) => {
      configItem.decode(binaryString, options);
    });

    return options;
  }

  static encode(options) {
    const binaryString = new BinaryString();

    _.forEach(this._CONFIG, (configItem) => {
      configItem.encode(binaryString, options);
    });

    return binaryString.toBase64();
  }

  static _CONFIG = [
    this._stringConfig(this.OPTIONS.VERSION),
    this._stringConfig(this.OPTIONS.SEED_NAME),
    this._booleanConfig(this.OPTIONS.PROGRESSION_DUNGEONS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_PUZZLE_SECRET_CAVES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_MIXED_SECRET_CAVES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_COMBAT_SECRET_CAVES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_TINGLE_CHESTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_GREAT_FAIRIES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_ISLAND_PUZZLES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_LONG_COMBAT_TRIALS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_SHORT_SIDEQUESTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_LONG_SIDEQUESTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_SPOILS_TRADING),
    this._booleanConfig(this.OPTIONS.PROGRESSION_PLATFORMS_RAFTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_SHORT_MINIGAMES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_LONG_MINIGAMES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_EXPENSIVE_PURCHASES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_BIG_OCTOS_GUNBOATS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_SUBMARINES),
    this._booleanConfig(this.OPTIONS.PROGRESSION_FREE_GIFTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_EYE_REEF_CHESTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_TRIFORCE_CHARTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_TREASURE_CHARTS),
    this._booleanConfig(this.OPTIONS.PROGRESSION_MISC),
    this._dropdownConfig(this.OPTIONS.KEYMODE),
    this._dropdownConfig(this.OPTIONS.RANDOMIZE_ENTRANCES),
    this._booleanConfig(this.OPTIONS.RANDOMIZE_CHARTS),
    this._booleanConfig(this.OPTIONS.RANDOMIZE_STARTING_ISLAND),
    this._booleanConfig(this.OPTIONS.LOCALE_DRC),
    this._booleanConfig(this.OPTIONS.LOCALE_DEEP_DRC),
    this._booleanConfig(this.OPTIONS.LOCALE_FW),
    this._booleanConfig(this.OPTIONS.LOCALE_DEEP_FW),
    this._booleanConfig(this.OPTIONS.LOCALE_TOTG),
    this._booleanConfig(this.OPTIONS.LOCALE_DEEP_TOTG),
    this._booleanConfig(this.OPTIONS.LOCALE_FF),
    this._booleanConfig(this.OPTIONS.LOCALE_ET),
    this._booleanConfig(this.OPTIONS.LOCALE_DEEP_ET),
    this._booleanConfig(this.OPTIONS.LOCALE_WT),
    this._booleanConfig(this.OPTIONS.LOCALE_DEEP_WT),
    this._booleanConfig(this.OPTIONS.LOCALE_STAR),
    this._booleanConfig(this.OPTIONS.LOCALE_NORTHERN_FAIRY),
    this._booleanConfig(this.OPTIONS.LOCALE_GALE),
    this._booleanConfig(this.OPTIONS.LOCALE_CRESCENT),
    this._booleanConfig(this.OPTIONS.LOCALE_SEVEN_STAR),
    this._booleanConfig(this.OPTIONS.LOCALE_OVERLOOK),
    this._booleanConfig(this.OPTIONS.LOCALE_FOUR_EYE),
    this._booleanConfig(this.OPTIONS.LOCALE_MOTHER_CHILD),
    this._booleanConfig(this.OPTIONS.LOCALE_SPECTACLE),
    this._booleanConfig(this.OPTIONS.LOCALE_WINDFALL),
    this._booleanConfig(this.OPTIONS.LOCALE_PAWPRINT),
    this._booleanConfig(this.OPTIONS.LOCALE_DRAGON_ROOST_ISLAND),
    this._booleanConfig(this.OPTIONS.LOCALE_FLIGHT_CONTROL),
    this._booleanConfig(this.OPTIONS.LOCALE_WESTERN_FAIRY),
    this._booleanConfig(this.OPTIONS.LOCALE_ROCK_SPIRE),
    this._booleanConfig(this.OPTIONS.LOCALE_TINGLE),
    this._booleanConfig(this.OPTIONS.LOCALE_NORTHERN_TRIANGLE),
    this._booleanConfig(this.OPTIONS.LOCALE_EASTERN_FAIRY),
    this._booleanConfig(this.OPTIONS.LOCALE_FIRE_MOUNTAIN),
    this._booleanConfig(this.OPTIONS.LOCALE_STAR_BELT),
    this._booleanConfig(this.OPTIONS.LOCALE_THREE_EYE),
    this._booleanConfig(this.OPTIONS.LOCALE_GREATFISH),
    this._booleanConfig(this.OPTIONS.LOCALE_CYCLOPS),
    this._booleanConfig(this.OPTIONS.LOCALE_SIX_EYE),
    this._booleanConfig(this.OPTIONS.LOCALE_EASTERN_TRIANGLE),
    this._booleanConfig(this.OPTIONS.LOCALE_THORNED_FAIRY),
    this._booleanConfig(this.OPTIONS.LOCALE_NEEDLE_ROCK),
    this._booleanConfig(this.OPTIONS.LOCALE_ISLET),
    this._booleanConfig(this.OPTIONS.LOCALE_STONE_WATCHER),
    this._booleanConfig(this.OPTIONS.LOCALE_SOUTHERN_TRIANGLE),
    this._booleanConfig(this.OPTIONS.LOCALE_PRIVATE_OASIS),
    this._booleanConfig(this.OPTIONS.LOCALE_BOMB),
    this._booleanConfig(this.OPTIONS.LOCALE_BIRDS_PEAK),
    this._booleanConfig(this.OPTIONS.LOCALE_DIAMOND_STEPPE),
    this._booleanConfig(this.OPTIONS.LOCALE_FIVE_EYE),
    this._booleanConfig(this.OPTIONS.LOCALE_SHARK),
    this._booleanConfig(this.OPTIONS.LOCALE_SOUTHERN_FAIRY),
    this._booleanConfig(this.OPTIONS.LOCALE_ICE_RING),
    this._booleanConfig(this.OPTIONS.LOCALE_FOREST_HAVEN),
    this._booleanConfig(this.OPTIONS.LOCALE_CLIFF_PLATEAU),
    this._booleanConfig(this.OPTIONS.LOCALE_HORSESHOE),
    this._booleanConfig(this.OPTIONS.LOCALE_OUTSET),
    this._booleanConfig(this.OPTIONS.LOCALE_HEADSTONE),
    this._booleanConfig(this.OPTIONS.LOCALE_TWO_EYE),
    this._booleanConfig(this.OPTIONS.LOCALE_ANGULAR),
    this._booleanConfig(this.OPTIONS.LOCALE_BOATING_COURSE),
    this._booleanConfig(this.OPTIONS.LOCALE_FIVE_STAR),
    this._booleanConfig(this.OPTIONS.LOCALE_GREAT_SEA),
    this._booleanConfig(this.OPTIONS.LOCALE_UNDER_GREAT_SEA),
    this._booleanConfig(this.OPTIONS.LOCALE_BATTLESQUID),
    this._booleanConfig(this.OPTIONS.LOCALE_SAVAGE),
    this._booleanConfig(this.OPTIONS.LOCALE_MAIL),
    this._booleanConfig(this.OPTIONS.LOCALE_PICTO),
    this._booleanConfig(this.OPTIONS.LOCALE_DVIM),
    this._booleanConfig(this.OPTIONS.SWIFT_SAIL),
    this._booleanConfig(this.OPTIONS.INSTANT_TEXT_BOXES),
    this._booleanConfig(this.OPTIONS.REVEAL_FULL_SEA_CHART),
    this._dropdownConfig(this.OPTIONS.NUM_STARTING_TRIFORCE_SHARDS),
    this._booleanConfig(this.OPTIONS.ADD_SHORTCUT_WARPS_BETWEEN_DUNGEONS),
    this._dropdownConfig(this.OPTIONS.SWORD_MODE),
    this._booleanConfig(this.OPTIONS.SKIP_REMATCH_BOSSES),
    this._dropdownConfig(this.OPTIONS.RACE_MODE),
    this._dropdownConfig(this.OPTIONS.NUM_DUNGEON_RACE_MODE),
    this._booleanConfig(this.OPTIONS.COMPASS_MAP_POOL_WITH_KEYS),
    this._booleanConfig(this.OPTIONS.GENERATE_SPOILER_LOG),
    this._booleanConfig(this.OPTIONS.PROGRESSION_CHECK_SPOILER_LOG),
    this._booleanConfig(this.OPTIONS.ALL_CHECK_SPOILER_LOG),
    this._booleanConfig(this.OPTIONS.ENTRANCE_SPOILER_LOG),
    this._booleanConfig(this.OPTIONS.CHART_SPOILER_LOG),
    this._dropdownConfig(this.OPTIONS.LOGIC_MOD),
    this._dropdownConfig(this.OPTIONS.CONVENIENCE_OPTION),
    this._booleanConfig(this.OPTIONS.RANDOMIZE_MUSIC),
    this._booleanConfig(this.OPTIONS.DISABLE_TINGLE_CHESTS_WITH_TINGLE_BOMBS),
    this._booleanConfig(this.OPTIONS.RANDOMIZE_ENEMY_PALETTES),
    this._dropdownConfig(this.OPTIONS.CAN_CHAIN_CHARTS),
    this._dropdownConfig(this.OPTIONS.CUSTOM_BCK_ENTRY),
    this._startingGearConfig(),
    this._itemSpinBoxConfig(this.OPTIONS.ADDITIONAL_STARTING_MIN, 0, 47),
    this._itemSpinBoxConfig(this.OPTIONS.ADDITIONAL_STARTING_MAX, 0, 47),
    this._spinBoxConfig(this.OPTIONS.STARTING_POHS, 0, 44),
    this._spinBoxConfig(this.OPTIONS.STARTING_HCS, 0, 6),
    this._spinBoxConfig(this.OPTIONS.STARTING_BH, 1, 3),
    this._booleanConfig(this.OPTIONS.NO_HEART_IN_POOL),
    this._booleanConfig(this.OPTIONS.REMOVE_MUSIC),
    this._booleanConfig(this.OPTIONS.RANDOMIZE_ENEMIES),
  ];

  static _stringConfig(optionName) {
    if (_.isNil(optionName)) {
      throw Error('Invalid string option config');
    }

    return {
      decode: (binaryString, options) => {
        const stringValue = binaryString.popString();
        _.set(options, optionName, stringValue);
      },
      encode: (binaryString, options) => {
        const stringValue = _.get(options, optionName);

        if (_.isNil(stringValue)) {
          throw Error(`Invalid value for option: ${optionName}`);
        }

        binaryString.addString(stringValue);
      },
    };
  }

  static _booleanConfig(optionName) {
    if (_.isNil(optionName)) {
      throw Error('Invalid boolean option config');
    }

    return {
      decode: (binaryString, options) => {
        const booleanValue = binaryString.popBoolean();
        _.set(options, optionName, booleanValue);
      },
      encode: (binaryString, options) => {
        const booleanValue = _.get(options, optionName);

        if (_.isNil(booleanValue)) {
          throw Error(`Invalid value for option: ${booleanValue}`);
        }

        binaryString.addBoolean(booleanValue);
      },
    };
  }

  static _dropdownConfig(optionName) {
    if (_.isNil(optionName)) {
      throw Error('Invalid dropdown option config');
    }

    const dropdownOptions = _.get(this.DROPDOWN_OPTIONS, optionName);

    if (_.isNil(dropdownOptions)) {
      throw Error(`Invalid dropdown options for option: ${optionName}`);
    }

    return {
      decode: (binaryString, options) => {
        const dropdownIndex = binaryString.popNumber(BinaryString.BYTE_SIZE);
        const dropdownValue = _.get(dropdownOptions, dropdownIndex);

        if (_.isNil(dropdownValue)) {
          throw Error(`Invalid dropdown index: ${dropdownIndex} for option: ${optionName}`);
        }

        _.set(options, optionName, dropdownValue);
      },
      encode: (binaryString, options) => {
        const dropdownValue = _.get(options, optionName);
        const dropdownIndex = _.indexOf(dropdownOptions, dropdownValue);

        if (dropdownIndex < 0) {
          throw Error(`Invalid dropdown value: ${dropdownValue} for option: ${optionName}`);
        }

        binaryString.addNumber(dropdownIndex, BinaryString.BYTE_SIZE);
      },
    };
  }

  static _startingGearConfig() {
    const optionName = this.OPTIONS.STARTING_GEAR;

    return {
      decode: (binaryString, options) => {
        var num_starting_items = 0;

        _.forEach(REGULAR_STARTING_ITEMS, (item) => {
          const itemValue = binaryString.popNumber(1);
          _.set(options, [optionName, item], itemValue);
          num_starting_items += itemValue;
        });

        _.forEach(PROGRESSIVE_STARTING_ITEMS, (item) => {
          const itemValue = binaryString.popNumber(2);
          _.set(options, [optionName, item], itemValue);
          num_starting_items += itemValue;
        });

        _.set(options, "num_starting_items", num_starting_items);
      },
      encode: (binaryString, options) => {
        _.forEach(REGULAR_STARTING_ITEMS, (item) => {
          const itemValue = _.get(options, [optionName, item]);

          if (_.isNil(itemValue)) {
            throw Error(`Invalid value for starting item: ${item}`);
          }

          binaryString.addNumber(itemValue, 1);
        });

        _.forEach(PROGRESSIVE_STARTING_ITEMS, (item) => {
          const itemValue = _.get(options, [optionName, item]);

          if (_.isNil(itemValue)) {
            throw Error(`Invalid value for starting item: ${item}`);
          }

          binaryString.addNumber(itemValue, 2);
        });
      },
    };
  }

  static _itemSpinBoxConfig(optionName, minValue, maxValue) {
    if (_.isNil(optionName)) {
      throw Error('Invalid spin box option config');
    }

    return {
      decode: (binaryString, options) => {
        const numBits = (Math.max(0, maxValue - minValue - _.get(options, "num_starting_items"))).toString(2).length;
        const spinBoxValue = binaryString.popNumber(numBits);
        _.set(options, optionName, spinBoxValue);
      },
      encode: (binaryString, options) => {
        const numBits = (Math.max(0, maxValue - minValue - _.get(options, "num_starting_items"))).toString(2).length;
        const spinBoxValue = _.get(options, optionName);

        if (_.isNil(spinBoxValue)) {
          throw Error(`Invalid value for option: ${spinBoxValue}`);
        }

        binaryString.addNumber(spinBoxValue, numBits);
      },
    };
  }

  static _spinBoxConfig(optionName, minValue, maxValue) {
    if (_.isNil(optionName)) {
      throw Error('Invalid spin box option config');
    }

    const numBits = (maxValue - minValue).toString(2).length;

    return {
      decode: (binaryString, options) => {
        const spinBoxValue = binaryString.popNumber(numBits);
        _.set(options, optionName, spinBoxValue);
      },
      encode: (binaryString, options) => {
        const spinBoxValue = _.get(options, optionName);

        if (_.isNil(spinBoxValue)) {
          throw Error(`Invalid value for option: ${spinBoxValue}`);
        }

        binaryString.addNumber(spinBoxValue, numBits);
      },
    };
  }
}
