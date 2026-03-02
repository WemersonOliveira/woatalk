import { supabase } from '../lib/supabaseClient'

class UserService {
  private checkSupabase() {
    if (!supabase) {
      throw new Error("Supabase client is not initialized. Check your environment variables.")
    }
    return supabase
  }

  async createUser(email: string, password: string, fullName: string) {
    const client = this.checkSupabase()
    const { data, error } = await client.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (error || !data.user) {
      return { data: null, error }
    }

    const { error: profileError } = await client
      .from("profiles")
      .insert({
        id: data.user.id,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
      })

    if (profileError) {
      return { data: null, error: profileError }
    }

    return { data: data.user, error: null }
  }

  async loginUser(email: string, password: string) {
    const client = this.checkSupabase()
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    })

    return { data, error }
  }

  async getUserById(userId: string) {
    const client = this.checkSupabase()
    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    return { data, error }
  }

  async deleteUser(userId: string) {
    const client = this.checkSupabase()
    const { error } = await client.auth.admin.deleteUser(userId)
    return { data: !error, error }
  }

  async listUsers() {
    const client = this.checkSupabase()
    const { data, error } = await client
      .from("profiles")
      .select("*")

    return { data, error }
  }
}

export const userService = new UserService()