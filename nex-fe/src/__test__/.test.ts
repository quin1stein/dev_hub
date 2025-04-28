function add(add: number, one: number): number {
  return add + one;
}

describe("add two numbers", () => {
  it("SHould ADD TWO NUMBERS", () => {
    expect(add(1, 2)).toBe(3);
  });
});
