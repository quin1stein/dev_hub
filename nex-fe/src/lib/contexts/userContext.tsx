import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "@/components/custom/skeleton";
import { User } from "../types/types";

const userContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const response = await fetch("/api/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query GetUserInfo {
            getUserInfo {
                name
                email
                role
                createdAt
                updatedAt
                profileSlug
            }
          }`,
        }),
      });
      if (!response.ok) {
        console.error("An error has occured");
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error("GraphQL error: " + result.errors.message);
      }

      return result.data.getUserInfo;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <SkeletonCard />
      </div>
    );
  if (error) return <p>Failed to load user data</p>;

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export const useUser = () => {
  const user = useContext(userContext);

  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return user;
};
