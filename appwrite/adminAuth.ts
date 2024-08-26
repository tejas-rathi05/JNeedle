import conf from "@/conf/conf"
import { NextRequest } from "next/server"
import { Client, Account } from "node-appwrite"

const createAdminClient = async() => {
  const client = new Client()
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId)
          .setKey(conf.appwriteAdminKey)

  return {
    get account(){
      return new Account(client)
    }
  }
}

const createSessionClient = async(req: NextRequest) => {
  const client = new Client()
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId)

  const session = req.cookies.get('session')

  if(session){
    client.setSession(session.value)
  }

  return {
    get account(){
      return new Account(client)
    }
  }
}

export { createAdminClient, createSessionClient }

