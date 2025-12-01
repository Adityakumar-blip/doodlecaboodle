import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import routes from "./src/sitemapRoutes.js";

const hostname = "https://doodlecaboodle.com"; // change this

async function generateSitemap() {
  try {
    const sitemapStream = new SitemapStream({ hostname });

    // Write each route to the stream
    routes.forEach((route) => {
      sitemapStream.write({
        url: route,
        changefreq: "weekly",
        priority: 0.8,
      });
    });

    sitemapStream.end(); // end AFTER writing routes

    const xml = await streamToPromise(sitemapStream);

    fs.writeFileSync("./public/sitemap.xml", xml);
    console.log("✅ Sitemap generated successfully at public/sitemap.xml");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
  }
}

generateSitemap();
