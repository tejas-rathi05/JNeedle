import { createAdminClient } from '@/appwrite/adminAuth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json()
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)

    cookies().set('session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: new Date(session.expire).getTime() - new Date().getTime(),
      path: '/',
    })

    return Response.json({ message: 'Logged in successfully' })
  } catch (error: any) {
    return Response.json(error)
  }
}