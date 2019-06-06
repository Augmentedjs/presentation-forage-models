const data = [ { "Name": "Bob", "ID": 123, "Email": "bob@augmentedjs.org" },
             { "Name": "Jonathan", "ID": 234, "Email": "jonathon@augmentedjs.org" },
             { "Name": "Corey", "ID": 345, "Email": "corey@augmentedjs.org" },
             { "Name": "Seema", "ID": 456, "Email": "seema@augmentedjs.org" },
             { "Name": "Jasmine", "ID": 567, "Email": "jasmine@augmentedjs.org" }
            ];
const schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "User",
    "description": "A list of users",
    "type": "object",
    "properties": {
        "Name" : {
            "description": "Name of the user",
            "type" : "string"
        },
        "ID" : {
            "description": "The unique identifier for a user",
            "type" : "integer"
        },
        "Email" : {
            "description": "The email of the user",
            "type" : "string"
        }
    },
    "required": ["ID", "Name"]
};

describe("Given an Augmented Collection Backed by LocalForage", () => {
  let c;

  beforeEach(() => {
    c = new Models.LocalForageCollection();
  });

  afterEach( async () => {
    await c.destroy();
    c = null;
  });

  it("has an augmented local forage Collection", () => {
    expect(Models.LocalForageCollection).to.not.be.undefined;
  });

  it("can populate data", async () => {
    await c.add(data);
    expect(c.size()).to.equal(5);
  });

  it("can save and fetch data", async () => {
    await c.add(data);
    await c.save();
    await c.fetch();
    expect(c.size()).to.equal(5);
  });
});
