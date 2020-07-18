import { AbstractModel } from "next-core-model";
import LocalForage from "./localforage.js";
import { DEFAULT_KEY } from "./defaults.js";

/**
 * Model
 * @extends AbstractModel
 */
class LocalForageModel extends AbstractModel {
  constructor(attributes, options = {}, ...args) {
    super(attributes, options, args);

    if (options.key) {
      this._key = options.key;
    } else {
      this._key = DEFAULT_KEY;
    }
    if (options.storage) {
      this._storage = options.storage;
    } else {
      if (options.config) {
        this._storage = new LocalForage(options.config);
      } else {
        this._storage = new LocalForage();
      }
    }
  };

  /**
   * sync - Sync model data to bound localforage
   */
  sync(method) {
    if (method === "create" || method === "update") {
      return this._storage.setItem(this._key, this.toJSON());
    } else if (method === "delete") {
      return this._storage.removeItem(this._key);
    } else {
      // read
      return this._storage.getItem(this._key)
      .then( (value) => {
        return this.reset(value);
      });
    }
  };

  /**
   * Fetch the model
   * @param {object} options Any options to pass
   */
  fetch() {
    return this.sync("read");
  };
  /**
   * Save the model
   * @param {object} options Any options to pass
   */
  save() {
    return this.sync("create");
  };
  /**
   * Update the model
   * @param {object} options Any options to pass
   */
  update() {
    return this.sync("update");
  };
  /**
   * Destroy the model
   * @param {object} options Any options to pass
   */
  destroy() {
    return this.sync("delete");
  };
};

export default LocalForageModel;
