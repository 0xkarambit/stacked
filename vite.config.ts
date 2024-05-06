import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// import {vanillaExtractPlugin} from "@vanilla-extract/vite-plugin";
// vanillaExtractPlugin({
// 	identifiers: "debug"
// })

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		modules: {
			localsConvention: "camelCase"
		}
	}
});
