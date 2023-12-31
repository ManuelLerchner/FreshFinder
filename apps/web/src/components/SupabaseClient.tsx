import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qtribxnypykjlyjswlno.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cmlieG55cHlramx5anN3bG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyNjk4MjQsImV4cCI6MjAxNTg0NTgyNH0.14IgLqK90KonabGozsinPI29MkLWBtkWCffC3NJcSMw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add editable variable for supabase client uuid
export const localUser : {uuid:string, hardPreferences:number[], userPreferences:{
    [key:string]:number
}} = {
    uuid: "bca2de1f-274b-43c2-be8e-742e16660075",
    hardPreferences: [],
    userPreferences: {}
}
