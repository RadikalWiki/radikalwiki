import { useEffect, useState } from 'react';
import {
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Checkbox,
	Button,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Stack,
} from '@mui/material';
import { useSession } from 'hooks';
import { useQuery, useRefetch } from 'gql';
import { id } from 'date-fns/locale';

function not(a: contents[], b: contents[]) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: contents[], b: contents[]) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

type contents = {
	id: any,
	name: string,
}

export default function TransferList({ id }: { id: string }) {
	const [session] = useSession()
	const query = useQuery();
	const refetch = useRefetch()

	const [leftEventId, setLeftEventId] = useState(session?.event?.id);
	const [rightEventId, setRightEventId] = useState(session?.event?.id);
	const [leftFolderId, setLeftFolderId] = useState(id);
	const [rightFolderId, setRightFolderId] = useState(session?.event?.folderId);

	const events = query.events()?.map(({ id, name }) => ({ id, name: name ?? "" }));
	const leftFolders = query.folders({ where: { eventId: { _eq: leftEventId } } });
	const rightFolders = query.folders({ where: { eventId: { _eq: rightEventId } } });
	const leftContents = query.folders_by_pk({ id: leftFolderId })?.contents({ where: { parentId: { _is_null: true } } })?.map(({ id = 0, name }) => ({ id, name: name ?? "" }));
	const rightContents = query.folders_by_pk({ id: rightFolderId })?.contents({ where: { parentId: { _is_null: true } } })?.map(({ id = 0, name }) => ({ id, name: name ?? "" }));
	console.log(leftContents)
	console.log(rightContents)


	const [checked, setChecked] = useState<any>([]);
	const [left, setLeft] = useState<any>([]);
	const [right, setRight] = useState<any>([]);


	/*
	useEffect(() => {
		setLeft(leftContents)
		setRight(rightContents)
	}, [leftContents, rightContents]);
	*/

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value: contents) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const customList = (eventId: any, folderId: any, folders: any, setEvent: any, setFolder: any, items: contents[]) => (
		<Stack spacing={2}>
			<FormControl fullWidth>
				<InputLabel>Begivenhed</InputLabel>
				<Select
					label="Begivenhed"
					value={eventId}
					onChange={(e) => { setEvent(e.target.value);  }}
				>
					{events?.map(({ id, name }) =>
						<MenuItem key={id} value={id}>{name}</MenuItem>
					)}
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel>Mappe</InputLabel>
				<Select
					label="Mappe"
					value={folderId}
					onChange={(e) => { setFolder(e.target.value);  }}
				>
					{folders?.map(({ id, name }: any) =>
						<MenuItem key={id} value={id}>{name}</MenuItem>
					)}
				</Select>
			</FormControl>
			<Paper sx={{ m: 2, overflow: 'auto' }}>

				<List dense component="div" role="list">
					{items.map(({ id, name }) => {

						return (
							<ListItem
								key={id}
								role="listitem"
								button
								onClick={handleToggle(id)}
							>
								<ListItemIcon>
									<Checkbox
										checked={checked.indexOf(id) !== -1}
										tabIndex={-1}
										disableRipple
									/>
								</ListItemIcon>
								<ListItemText primary={`${name}`} />
							</ListItem>
						);
					})}
					<ListItem />
				</List>
			</Paper>
		</Stack>
	);

	return (
		<Grid sx={{ p: 2}} container spacing={2} justifyContent="start" alignItems="start">
			<Grid xs={5} item>{customList(leftEventId, leftFolderId, leftFolders, setLeftEventId, setLeftFolderId, left)}</Grid>
			<Grid xs={2} item>
				<Grid container direction="column" alignItems="center">
					<Button
						sx={{ m: 1 }}
						variant="outlined"
						size="small"
						onClick={handleAllRight}
						disabled={left.length === 0}
					>
						≫
					</Button>
					<Button
						sx={{ m: 1 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
					>
						&gt;
					</Button>
					<Button
						sx={{ m: 1 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
					>
						&lt;
					</Button>
					<Button
						sx={{ m: 1 }}
						variant="outlined"
						size="small"
						onClick={handleAllLeft}
						disabled={right.length === 0}
					>
						≪
					</Button>
				</Grid>
			</Grid>
			<Grid xs={5} item>{customList(rightEventId, rightFolderId, rightFolders, setRightEventId, setRightFolderId, right)}</Grid>
		</Grid>
	);
}
