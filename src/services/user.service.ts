import { supabase } from "../lib/supabaseClient.js"

class UserService {

  async createUser(email: string, password: string) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    return { data, error }
  }

  async getUserById(userId: string) {
    const { data, error } = await supabase.auth.admin.getUserById(userId)

    return { data, error }
  }

  async deleteUser(userId: string) {
    const { data, error } = await supabase.auth.admin.deleteUser(userId)

    return { data, error }
  }

  async listUsers() {
    const { data, error } = await supabase.auth.admin.listUsers()

    return { data, error }
  }
}

export const userService = new UserService()