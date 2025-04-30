import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeArrays = loadFilesSync(join(__dirname, "./**/*.gql"));
export const typeDefs = mergeTypeDefs(typeArrays);
