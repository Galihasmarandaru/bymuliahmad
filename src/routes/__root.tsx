import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useLenis } from "#/hooks/useLenis";
import "../styles.css";

function RootDocument() {
	useLenis();
	return <Outlet />;
}

export const Route = createRootRoute({
	component: RootDocument,
});
