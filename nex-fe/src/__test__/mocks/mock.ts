export const mockPrisma = {
  post: {
    create: jest.fn().mockResolvedValue({
      id: "",
    }),
  },
};
