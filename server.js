import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import { html } from "lit";
import { render } from "@lit-labs/ssr";
import { RenderResultReadable } from "@lit-labs/ssr/lib/render-result-readable.js";
//import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import "./public/components/hello-world.js";
//TODO:
// The file "./public/lit-components.js" was created
// by running `npm run build` in another project.
// It contains the built code for the same component
// found in "./public/components/hello-world.js".
// When the import below is used instead of the previous one,
// we get the following error in the server:
// ReferenceError: document is not defined
//import "./public/lit-components.js";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

// This returns a server-side rendered Lit component.
app.get("/hello-world", async (c) => {
  const name = c.req.query("name");
  const template = html`
    <p>The following are server-side rendered Lit components.</p>
    <hello-world></hello-world>
    <hello-world name=${name}></hello-world>
  `;
  const result = render(template);

  // This streams the response.
  return new Response(new RenderResultReadable(result));

  // This also works, but does not stream the response.
  //const newContent = await collectResult(result);
  //return c.html(newContent);
});

serve(app, (info) => {
  console.log(`listing on port ${info.port}`);
});
