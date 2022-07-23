require("dotenv").config();
const { loadAllServices } = require("../src/services/services");
/*Application config */
describe("Testing :", () => {
  loadAllServices();

  afterAll(() => closeConnections());

  it("Testing Scenario 1", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    expect(true).toEqual(true);
  });
});

closeConnections = () => {
  // Closing the DB connection allows Jest to exit successfully.
  try {
  } catch (error) {}
};
