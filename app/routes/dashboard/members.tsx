import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Input4 } from "~/components/input4";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import Loader from "~/components/ui/loader";
import { useGetWorkspaceDetails } from "~/hooks/use-workspace";
import type { Workspace } from "~/types";

const Members = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const workspaceId = searchParams.get("workspaceId");
	const initialSearch = searchParams.get("search") || "empty";
	const [search, setSearch] = useState<string>(initialSearch);

	const { data, isLoading } = useGetWorkspaceDetails(workspaceId!) as {
		data: Workspace;
		isLoading: boolean;
	};

	useEffect(() => {
		const params: Record<string, string> = {};
		searchParams.forEach((value, key) => {
			params[key] = value;
		});

		params.search = search;

		setSearchParams(params, { replace: true });
	}, [search]);

	useEffect(() => {
		const urlSearch = searchParams.get("search") || "";
		if (urlSearch !== search) setSearch(urlSearch);
	}, [searchParams]);

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<div className="text-center">
					<Loader />
					<h2 className="text-muted-foreground text-sm sm:text-base mt-2">
						Fetching Members ...
					</h2>
				</div>
			</div>
		);
	}

	if (!data || !workspaceId) return <div>No Workspace Found</div>;

	const filteredMembers = data?.members?.filter(
		(member) =>
			member.user.name.toLowerCase().includes(search.toLowerCase()) ||
			member.user.email.toLowerCase().includes(search.toLowerCase()) ||
			member.role?.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-6">
			<div className="flex items-start md:items-center justify-between">
				<h1 className="text-2xl font-bold uppercase"> Members</h1>
				<div className="flex flex-row items-start md:flex-row gap-3"></div>
			</div>
			<div className="flex  flex-col md:flex-row  justify-between">
				<Badge variant={"glassMorph"} className="mb-3 md:mb-0">
					{filteredMembers?.length === 0 ? (
						<div className="text-start text-sm text-muted-foreground">
							No member found
						</div>
					) : (
						<div className="text-start text-sm text-muted-foreground">
							{filteredMembers?.length} member
							{filteredMembers?.length !== 1 ? "s" : ""}
						</div>
					)}
				</Badge>
				<Input4
					placeholder="Search members..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="max-w-md dark:bg-muted"
				/>
			</div>

			<Card className="py-2 px-1">
				<CardContent className="px-0">
					<div className="divide-y">
						{filteredMembers?.map((member) => (
							<div
								className="md:p-4 p-3 hover:bg-background/70 hover:border-primary  transition-all duration-200 ease-in-out border bg-background rounded-2xl mb-1"
								key={member.user._id}
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between mb-2 ">
									<div className="flex gap-3">
										<div>
											<Avatar>
												<AvatarImage src={member.user.profilePicture} />
												<AvatarFallback className="text-xs md:text-sm rounded-full border-primary border">
													{member.user.name.charAt(0)}
												</AvatarFallback>
											</Avatar>
										</div>
										<div className="space-y-1 mt-1">
											<p className=" text-sm  hover:text-primary transition-all flex hover:underline items-center duration-200 ease-in-out capitalize font-bold">
												{member.user.name}
											</p>
											<p className="text-sm text-muted-foreground">
												{member.user.email}
											</p>
										</div>
									</div>
									<div className="flex gap-2 space-x-1 ml-10 mt-2 md:mt-0 md:ml-0">
										<Badge
											variant={
												["admin", "owner"].includes(member.role)
													? "red"
													: ["member"].includes(member.role)
													? "todo"
													: "done"
											}
											className="capitalize text-[11px] md:text-sm"
										>
											{member.role}
										</Badge>
										<Badge
											variant={"glassMorph"}
											className="text-primary text-[11px] md:text-sm"
										>
											{data.name}
										</Badge>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Members;
