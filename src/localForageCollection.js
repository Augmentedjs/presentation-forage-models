import { AbstractCollection } from "next-core-model";
import LocalForage from "./localforage.js";

const DEFAULT_KEY = "forage";

/**
 * LocalForageCollection
 * @extends AbstractCollection
 */
class LocalForageCollection extends AbstractCollection {
  constructor(models, options) {
    if (!options) {
      options = {};
    }
    super(models, options);

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
   * Base key name for the collection (simular to url for rest-based)
   * @property {string} key The key
   */
   get key() {
     return this._key;
   };

  /**
   * Storage for the collection
   * @property {string} storage The storage used for the collection
   * @private
   */

  /**
   * Initialize the model with needed wireing
   * @param {object} options Any options to pass
   */
  initialize(options) {};
  /**
   * Custom init method for the model (called at inititlize)
   * @param {object} options Any options to pass
   */
  init(options) {};
  /**
   * Fetch the collection
   * @param {object} options Any options to pass
   */
  async fetch(options) {
    return await this.sync("read", this, options);
  };
  /**
   * Save the collection
   * @param {object} options Any options to pass
   */
  async save(options) {
    return await this.sync("create", this, options);
  };
  /**
   * Update the collection
   * @param {object} options Any options to pass
   */
  async update(options) {
    return await this.sync("update", this, options);
  };
  /**
   * Destroy the collection
   * @param {object} options Any options to pass
   */
  async destroy(options) {
    return await this.sync("delete", this, options);
  };

  /**
   * Sync method for Collection
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
          await console.debug("collection get", j);
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
};

export default LocalForageCollection;
