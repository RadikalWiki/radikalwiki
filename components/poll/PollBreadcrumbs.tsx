import { HowToVote, Subject } from "@mui/icons-material"
import { Breadcrumbs, Link, Tooltip } from "@mui/material"
import { useQuery } from "gql";
import { useRouter } from "next/router";
import { Link as NextLink } from "components";

export default function PollBreadcrumbs({ id }: { id: string }) {
  const router = useRouter();
  const query = useQuery();
  const poll = query.polls_by_pk({ id });

	return (
		<Breadcrumbs sx={{ p: [2, 0, 2, 2] }}>
			<Link
				component={NextLink}
				sx={{ alignItems: "center", display: "flex" }}
				color="primary"
				href="/folder"
			>
				<Tooltip title="Indhold">
					<Subject />
				</Tooltip>
			</Link>
			{poll &&
				(poll.content?.parent ? (
					<Link
						component={NextLink}
						color="primary"
						href={`/content/${poll.content?.parent.id}`}
					>
						{poll.content?.parent.name}
					</Link>
				) : (
					<Link
						component={NextLink}
						color="primary"
						href={`/folder/${poll.content?.folder?.id}`}
					>
						{poll.content?.folder?.name}
					</Link>
				))}
			{poll && (
				<Link
					component={NextLink}
					color="primary"
					href={`/content/${poll.content?.id}`}
				>
					{poll.content?.name}
				</Link>
			)}
			<Link
				component={NextLink}
				color="primary"
				href={`/poll/${router.query.id}`}
				sx={{ alignItems: "center", display: "flex" }}
			>
				<Tooltip title="Afstemning">
					<HowToVote />
				</Tooltip>
			</Link>
		</Breadcrumbs>



	)
}