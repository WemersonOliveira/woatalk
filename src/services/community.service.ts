import { supabase } from "../lib/supabaseClient.js"

class CommunityService {

  async createPost(userId: string, content: string) {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ user_id: userId, content }])

    return { data, error }
  }

  async likePost(postId: string, userId: string) {
    const { data, error } = await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: userId }])

    return { data, error }
  }

  async commentOnPost(postId: string, userId: string, comment: string) {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, user_id: userId, comment }])

    return { data, error }
  }

  async followUser(followerId: string, followingId: string) {
    const { data, error } = await supabase
      .from("follows")
      .insert([{ follower_id: followerId, following_id: followingId }])

    return { data, error }
  }
}

export const communityService = new CommunityService()