export const mockPrisma = {
  post: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: "1",
        title: "Test Post",
        slug: "test-post",
        content: "Hello World",
        createdAt: `test-post-${Date.now().toString(36)}`,
        user: { name: "John Doe" },
        focusAreas: [{ name: "AI", label: "Artificial Intelligence" }],
      },
    ]),
  },
  user: {
    findUnique: jest.fn().mockResolvedValue({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date(),
      role: "user",
      updatedAt: new Date(),
      profileSlug: "john-doe",
    }),
  },
  comment: {
    create: jest.fn(),
  },
};
