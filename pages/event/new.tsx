import React, { Suspense } from "react";
import { EventForm } from "comps";

export default function New() {
	return <Suspense fallback={null}>
		<EventForm />
	</Suspense>
}