const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = (new JSDOM('<!doctype html><html><body></body></html>')).window;

global.document = dom.document;
global.window = dom.window;
global.navigator = {
  userAgent: 'node.js'
};

const LocalStorage = require("node-localstorage").LocalStorage;
global.localStorage = new LocalStorage("localStorageTemp");
global.sessionStorage = global.localStorage;
global.Storage = global.localStorage;

global.Models = require("../dist/presentation-forage-models.js");

const chai = require("chai");
global.chai = chai;
global.expect = chai.expect;
