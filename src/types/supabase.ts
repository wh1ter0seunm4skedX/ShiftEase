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
      profiles: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'worker'
          name: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'admin' | 'worker'
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'worker'
          name?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          max_workers: number
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          max_workers: number
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          max_workers?: number
          created_by?: string
          created_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          event_id: string
          worker_id: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          worker_id: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          worker_id?: string
          created_at?: string
        }
      }
    }
  }
}
