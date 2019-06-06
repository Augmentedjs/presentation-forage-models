describe("Given a LocalForageModel", () => {
  it("is defined", () => {
    expect(Models.LocalForageModel).to.not.be.undefined;
  });

  let model;
  beforeEach(() => {
    model = new Models.LocalForageModel();
  });
  afterEach(() => {
    model = null;
  });

  it("can check if empty", async () => {
    expect(model.isEmpty()).to.be.true;
  });

  it("can reset with data", async () => {
    await model.set({ "y": "y" });
    await model.reset({ "x": "x" });

    expect(model.get("x")).to.equal("x");
    expect(model.get("y")).to.be.undefined;
  });

  it("can set with data", async () => {
    await model.set({ "x": "x" });
    expect(model.get("x")).to.equal("x");
  });

  describe("Given validation", async () => {
	  beforeEach(() => {
	    model = new Models.LocalForageModel();
	  });
	  afterEach(() => {
	    model = null;
	  });

		it("with no Schema does not support Validation", async () => {
			expect(model.supportsValidation()).to.be.false;
		});

		it("with an empty Schema does support Validation", async () => {
			model.schema = {};
			expect(model.supportsValidation()).to.be.true;
		});
	});
});
