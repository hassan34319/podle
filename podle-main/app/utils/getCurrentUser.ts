import { getServerSession } from "next-auth/next"

import  {authOptions}  from "./auth";


export async function getSessionServer() {
  const session = await getServerSession(authOptions)
  console.log("Session",session)
  return session
}