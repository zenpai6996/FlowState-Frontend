import type { User } from "~/types";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Card } from "../card";

const Watchers = ({ watchers }: { watchers: User[] }) => {
	return (
		<Card className="bg-card rounded-2xl p-4 shadow-sm mb-6">
			<h3 className="text-sm font-medium text-muted-foreground mb-1">
				Watchers
			</h3>
			<div className="space-y-2">
				{watchers && watchers.length > 0 ? (
					watchers.map((watcher) => (
						<div key={watcher._id} className="flex items-center gap-2">
							<Avatar className="size-6 dark:bg-background rounded-full border border-primary">
								<AvatarImage src={watcher.profilePicture} />
								<AvatarFallback>{watcher.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<p className="text-xs text-muted-foreground">{watcher.name}</p>
						</div>
					))
				) : (
					<p className="text-xs text-muted-foreground">No Watcher </p>
				)}
			</div>
		</Card>
	);
};

export default Watchers;
