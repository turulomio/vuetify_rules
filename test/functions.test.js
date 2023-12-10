var vuetify_rules=require("isnullorempty")
describe("the add function", () => {
    it("should add two numbers", () => {
      const result = vuetify_rules.isNullOrEmpty( 2);
      expect(vuetify_rules.isNullOrEmpty( 2)).toBe(false)

    });
  });