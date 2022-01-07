import AsyncStorage from "@react-native-community/async-storage";
import { QueryCache, QueryClient } from "react-query";
import { dehydrate, hydrate } from "react-query/hydration";
import { jsonParse } from "../utils/jsonParse";

export const queryCache = new QueryCache();

const MINUTE = 60 * 60 * 1000;

const queryClient = new QueryClient({
  queryCache: queryCache,
  defaultOptions: {
    queries: {
      cacheTime: 5 * MINUTE,
      staleTime: 2 * MINUTE,
    },
  },
});

let firstTime = true;
const hydrateFromAsyncStorage = async () => {
  const state = await AsyncStorage.getItem("@react-query-cache");
  const parsedState = jsonParse(state ?? "{}");
  hydrate(queryClient, parsedState);
};

queryCache.subscribe(async () => {
  if (firstTime) {
    await hydrateFromAsyncStorage();
  }

  const dehydratedState = dehydrate(queryClient, {
    dehydrateQueries: true,
    dehydrateMutations: false,
  });
  await AsyncStorage.setItem(
    "@react-query-cache",
    JSON.stringify(dehydratedState)
  );
  firstTime = false;
});

export { queryClient };
