describe("Given a LocalForage", () => {
  let storage;
  beforeEach(() => {
    storage = new Models.LocalForage();
  });
  afterEach(() => {
    storage = null;
  });

  it("is defined", () => {
    expect(Models.LocalForage).to.not.be.undefined;
  });

  it("can add and item", async () => {
    const ret = await storage.setItem("test", "test");
    expect(ret).to.equal("test");
  });

  it("can add and get item", async () => {
    await storage.setItem("bubba", "bubba");
    const ret = await storage.getItem("bubba");
    expect(ret).to.equal("bubba");
  });
});
