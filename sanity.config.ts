import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { loadEnvConfig } from "@next/env";
import { defineCliConfig } from "sanity/cli";

import { apiVersion, projectId, dataset } from "./sanity/env";
import Service from "./sanity/Service";
import LoginImage from "./sanity/LoginImage";
import SignupImage from "./sanity/SignupImage";
import HomeImage from "./sanity/HomeImage";

export default defineConfig({
  name: "default",
  title: "Code Academy",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: [Service,LoginImage,SignupImage,HomeImage],
  },
});
