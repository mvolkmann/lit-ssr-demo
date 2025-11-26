import { type Context, Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import { html } from "lit";
import { render } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";
//import { RenderResultReadable } from "@lit-labs/ssr/lib/render-result-readable.js";

import "./hello-world.js";

const app = new Hono();

app.use("/*", serveStatic({ root: "./dist" }));

// This returns a server-side rendered Lit component.
app.get("/greet", async (c: Context) => {
  const name = c.req.query("name");
  const template = html`
    <p>The following are server-side rendered Lit components.</p>
    <hello-world></hello-world>
    <hello-world name=${name}></hello-world>
  `;
  const result = render(template);

  const newContent = await collectResult(result);
  return c.html(newContent);

  // This is an alternative to the previous two lines
  // that streams the response.
  //const stream = new RenderResultReadable(result);
  //return new Response(stream as unknown as BodyInit);
});

serve(app, (info) => {
  console.log(`listing on port ${info.port}`);
});
