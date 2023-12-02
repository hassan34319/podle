import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { loadEnvConfig } from "@next/env";
import { defineCliConfig } from "sanity/cli";

import { apiVersion, projectId, dataset } from "./sanity/env";
import Service from "./sanity/Service";
import LoginImage from "./sanity/LoginImage";
import SignupImage from "./sanity/SignupImage";
import HomeImage from "./sanity/HomeImage";
import claimedBusiness from "./sanity/claimedBusiness";
import autoAddBusiness from "./sanity/autoAddBusiness";
import terms from "./sanity/lib/terms";
import faq from "./sanity/faq";
import privacyPolicy from "./sanity/privacyPolicy";
import updateImage from "./sanity/updateImage";
import createImage from "./sanity/createImage";
import contentCreator from "./sanity/lib/contentCreator";
import gig from "./sanity/gig";
import reviews from "./sanity/lib/reviews";
import order from "./sanity/lib/order";
import { user, account, verificationToken } from 'next-auth-sanity/schemas'
import transaction from "./sanity/transaction";
import conversation from "./sanity/conversation";

export default defineConfig({
  name: "default",
  title: "Code Academy",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: [Service,LoginImage,SignupImage,HomeImage,updateImage,createImage,contentCreator,order, conversation,transaction, reviews, gig,  claimedBusiness,autoAddBusiness,terms,faq,privacyPolicy,user,account,verificationToken],
  },
});
