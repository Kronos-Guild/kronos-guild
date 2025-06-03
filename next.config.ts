import nextMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";

const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);
