import React, { Suspense } from "react";
import { ContentTransferList } from "comps";
import { HeaderCard } from "comps";
import { Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";

export default function New() {
	const router = useRouter();
	const { id } = router.query;
	return <Suspense fallback={null}>
		<Card elevation={3} sx={{ m: 1 }}>
			<CardHeader
				title="Kopier indhold"
				sx={{
					bgcolor: (theme) => theme.palette.secondary.main,
					color: (theme) => theme.palette.secondary.contrastText,
				}}
			/>
			<ContentTransferList id={id as string} />
		</Card>
	</Suspense>
}