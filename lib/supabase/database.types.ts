export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          address: string | null
          city: string | null
          country: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      packages: {
        Row: {
          id: string
          user_id: string | null
          tracking_number: string
          description: string | null
          weight: number | null
          dimensions: string | null
          us_tracking_number: string | null
          status: string
          arrival_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          tracking_number: string
          description?: string | null
          weight?: number | null
          dimensions?: string | null
          us_tracking_number?: string | null
          status?: string
          arrival_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          tracking_number?: string
          description?: string | null
          weight?: number | null
          dimensions?: string | null
          us_tracking_number?: string | null
          status?: string
          arrival_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shipments: {
        Row: {
          id: string
          user_id: string | null
          origin_address: string
          destination_address: string
          status: string
          estimated_delivery_date: string | null
          actual_delivery_date: string | null
          shipping_cost: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          origin_address: string
          destination_address: string
          status?: string
          estimated_delivery_date?: string | null
          actual_delivery_date?: string | null
          shipping_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          origin_address?: string
          destination_address?: string
          status?: string
          estimated_delivery_date?: string | null
          actual_delivery_date?: string | null
          shipping_cost?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      shipment_packages: {
        Row: {
          shipment_id: string
          package_id: string
        }
        Insert: {
          shipment_id: string
          package_id: string
        }
        Update: {
          shipment_id?: string
          package_id?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          message: string
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          message: string
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          message?: string
          status?: string | null
          created_at?: string
          updated_at?: string
        }
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
