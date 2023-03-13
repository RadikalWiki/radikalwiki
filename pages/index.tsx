import { Loader } from 'comps';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
	const router = useRouter()

	useEffect(() => {
		if (router.query.type === "passwordReset") {
			router.push("/user/set-password")
		}
	}, [router.query])

	return <Loader app="home" />;
}

export default Index;
