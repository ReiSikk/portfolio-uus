import { withGTConfig } from "gt-next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
};

export default withGTConfig(nextConfig, {
	locales: [
		"et",
		"da",
		"nl",
		"es"
	  ],
});
