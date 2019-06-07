import { default as localforage } from "localforage";

/**
 * LocalForage API
 * @param {Object} config Config the base storage library
 * @see {@link https://localforage.github.io/localForage/#settings-api-config|LocalForage Config}
 */
class LocalForage {
  constructor(config) {
    if (config) {
      localforage.createInstance(config);
    }
    this._myStore = localforage;
  };

  /**
   * Is storage supported
   * @returns {boolean} Returns true if supported
   */
  isSupported() {
    return (this._myStore);
  };

  /**
   * Gets an item from storage
   * @param {string} key The key in storage
   * @returns {object} Returns object from storage
   */
  getItem(itemKey) {
     //console.debug(`getItem ${itemKey}`);
     return this._myStore.getItem(itemKey)
     .then( (value) => {
       // This code runs once the value has been loaded
       // from the offline store.
       //console.log(value);
       return value;
     })
     .catch( (err) => {
       // This code runs if there were any errors
       console.error(err);
       throw err;
     });
  };

  /**
   * Sets an item to storage
   * @param {string} key The key in storage
   * @param {object} object The data to set
   */
  setItem(itemKey, object) {
    return this._myStore.setItem(itemKey, object)
    .then( (value) => {
      // Do other things once the value has been saved.
      return value;
    })
    .catch( (err) => {
      // This code runs if there were any errors
      console.error(err);
      throw err;
    });
  };

  /**
   * Removes an item from storage
   * @param {string} key The key in storage
   */
  removeItem(itemKey) {
    return this._myStore.removeItem(itemKey)
    .then( () => {
      // Run this code once the key has been removed.
      //console.info('Key is cleared!');
      return;
    })
    .catch( (err) => {
      // This code runs if there were any errors
      console.error(err);
      throw err;
    });
  };

  /**
   * Clears storage
   */
  clear() {
    return this._myStore.clear()
    .then( () => {
      // Run this code once the key has been removed.
      //console.info('DB is cleared!');
      return;
    })
    .catch( (err) => {
      // This code runs if there were any errors
      console.error(err);
      throw err;
    });
  };

  /**
   * Gets the key from storage for index
   * @param {number} i The index in storage
   * @returns {string} Returns the key from storage
   */
  key(i) {
    //console.debug(`key ${i}`);
    return this._myStore.key(i)
    .then( (keyName) => {
      // Name of the key.
      return keyName;
    })
    .catch( (err) => {
      // This code runs if there were any errors
      console.error(err);
      throw err;
    });
  };

  /**
   * Gets the keya from storage
   * @returns {array} Returns the keys from storage
   */
  keys() {
    return this._myStore.keys()
    .then((keys) => {
      // An array of all the key names.
      return keys;
    })
    .catch( (err) => {
      // This code runs if there were any errors
      console.error(err);
      throw err;
    });
  };

  /**
   * The length of storage by keys
   * @returns {number} Returns the length of storage by keys
   */
  length() {
    return this._myStore.length()
    .then( (numberOfKeys) => {
      // Outputs the length of the database.
      return numberOfKeys;
    })
    .catch( (err) => {
      // This code runs if there were any errors
      console.error(err);
      throw err;
    });
  };
};

export default LocalForage;
