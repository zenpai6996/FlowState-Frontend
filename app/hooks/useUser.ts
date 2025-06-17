import { useQuery, type QueryKey } from "@tanstack/react-query";
import { fetchData } from "~/lib/fetch-utils";

const queryKey: QueryKey = ["user"];

export const useProfileQuery = () => {
	return useQuery({
		queryKey,
		queryFn: () => fetchData("/users/profile"),
	});
};
