import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				display: "standalone",
				icons: [
					{
						src: "./public/icon.png",
						sizes: "120x120",
						type: "image/png",
					},
				],
				handle_links: "preferred",
				background_color: "#242424",
				theme_color: "#242424",
			},
		}),
		basicSsl({ name: "thegame" }),
	],
});
