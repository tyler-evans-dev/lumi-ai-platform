export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          preferences: Json | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          preferences?: Json | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          preferences?: Json | null
        }
        Relationships: []
      }
      horizontal_data: {
        Row: {
          id: string
          user_id: string
          entity_type: 'company' | 'contact' | 'other'
          name: string
          description: string | null
          enriched_data: Json
          source: string | null
          created_at: string
          updated_at: string
          status: 'pending' | 'enriched' | 'failed'
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          entity_type: 'company' | 'contact' | 'other'
          name: string
          description?: string | null
          enriched_data?: Json
          source?: string | null
          created_at?: string
          updated_at?: string
          status?: 'pending' | 'enriched' | 'failed'
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          entity_type?: 'company' | 'contact' | 'other'
          name?: string
          description?: string | null
          enriched_data?: Json
          source?: string | null
          created_at?: string
          updated_at?: string
          status?: 'pending' | 'enriched' | 'failed'
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "horizontal_data_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      vertical_analysis: {
        Row: {
          id: string
          user_id: string
          horizontal_data_id: string
          analysis_type: string
          analysis_results: Json
          created_at: string
          updated_at: string
          status: 'pending' | 'completed' | 'failed'
          agent_config: Json | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          horizontal_data_id: string
          analysis_type: string
          analysis_results?: Json
          created_at?: string
          updated_at?: string
          status?: 'pending' | 'completed' | 'failed'
          agent_config?: Json | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          horizontal_data_id?: string
          analysis_type?: string
          analysis_results?: Json
          created_at?: string
          updated_at?: string
          status?: 'pending' | 'completed' | 'failed'
          agent_config?: Json | null
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "vertical_analysis_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vertical_analysis_horizontal_data_id_fkey"
            columns: ["horizontal_data_id"]
            referencedRelation: "horizontal_data"
            referencedColumns: ["id"]
          }
        ]
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          created_at: string
          updated_at: string
          related_horizontal_id: string | null
          related_vertical_id: string | null
          is_archived: boolean
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          created_at?: string
          updated_at?: string
          related_horizontal_id?: string | null
          related_vertical_id?: string | null
          is_archived?: boolean
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          created_at?: string
          updated_at?: string
          related_horizontal_id?: string | null
          related_vertical_id?: string | null
          is_archived?: boolean
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_related_horizontal_id_fkey"
            columns: ["related_horizontal_id"]
            referencedRelation: "horizontal_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_related_vertical_id_fkey"
            columns: ["related_vertical_id"]
            referencedRelation: "vertical_analysis"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          content: string
          role: 'user' | 'assistant' | 'system'
          created_at: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          content: string
          role: 'user' | 'assistant' | 'system'
          created_at?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          content?: string
          role?: 'user' | 'assistant' | 'system'
          created_at?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme: 'light' | 'dark' | 'system'
          notifications_enabled: boolean
          api_keys: Json | null
          created_at: string
          updated_at: string
          ui_preferences: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          theme?: 'light' | 'dark' | 'system'
          notifications_enabled?: boolean
          api_keys?: Json | null
          created_at?: string
          updated_at?: string
          ui_preferences?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          theme?: 'light' | 'dark' | 'system'
          notifications_enabled?: boolean
          api_keys?: Json | null
          created_at?: string
          updated_at?: string
          ui_preferences?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier access to tables
export type User = Database['public']['Tables']['users']['Row']
export type HorizontalData = Database['public']['Tables']['horizontal_data']['Row']
export type VerticalAnalysis = Database['public']['Tables']['vertical_analysis']['Row']
export type Conversation = Database['public']['Tables']['conversations']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type UserSettings = Database['public']['Tables']['user_settings']['Row']
