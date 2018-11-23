import { AbstractModel } from "next-core-model";
import LocalForage from "./localforage.js";
import { DEFAULT_KEY } from "./defaults.js";

/**
 * Model
 * @extends Augmented.AbstractModel
 */
class LocalForageModel extends AbstractModel {
  constructor(attributes, options, ...args) {
    if (!options) {
      options = {};
    }
    super(attributes, options, args);

    if (options.key) {
      this._key = options.key;
    } else {
      this._key = DEFAULT_KEY;
    }
    if (options.storage) {
      this._storage = options.storage;
    } else {
      this._storage = new LocalForage();
    }
  };

  /**
   * sync - Sync model data to bound localforage
   * @method sync
   */
  async sync(method, model, options) {
    let j = {};
    try {
      if (!options) {
        options = {};
      }

      if (method === "create" || method === "update") {
        j = await this.toJSON();
        await this._storage.setItem(this._key, j);
      } else if (method === "delete") {
        await this._storage.removeItem(this._key);
      } else {
        // read
        j = await this._storage.getItem(this._key);
        console.debug(`getItem return ${j}`);
        if (j) {
          await console.debug("model get", j);
          await this.reset(j);
        } else {
          console.warn("no data returned");
        }
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return j;
  };

  /**
   * Fetch the model
   * @param {object} options Any options to pass
   */
  fetch(options) {
    return this.sync("read", this, options);
  };
  /**
   * Save the model
   * @param {object} options Any options to pass
   */
  save(options) {
    return this.sync("create", this, options);
  };
  /**
   * Update the model
   * @param {object} options Any options to pass
   */
  update(options) {
    return this.sync("update", this, options);
  };
  /**
   * Destroy the model
   * @param {object} options Any options to pass
   */
  destroy(options) {
    return this.sync("delete", this, options);
  };
};

export default LocalForageModel;
