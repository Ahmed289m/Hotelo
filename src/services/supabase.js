import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pxkezweeomluucfeycfe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4a2V6d2Vlb21sdXVjZmV5Y2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwOTI5MTgsImV4cCI6MjA1MzY2ODkxOH0.hncHviWKMaoTQh0qJ003YsS7A1GLWpWTJUcIiv00kNk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
