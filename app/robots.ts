import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dishora.net";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/search",
          "/my-recipes",
          "/api/",
        ],
      },
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "BLEXBot",
          "DataForSeoBot",
          "serpstatbot",
          "SEOkicks",
          "SeekportBot",
          "Cliqzbot",
          "PetalBot",
          "MojeekBot",
          "SeznamBot",
        ],
        disallow: ["/"],
      },
      {
        userAgent: [
          "python-requests",
          "Go-http-client",
          "libwww-perl",
          "masscan",
          "nikto",
          "sqlmap",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
