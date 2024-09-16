import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vuncsvufeooxgcxejzoz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bmNzdnVmZW9veGdjeGVqem96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MDkzNzYsImV4cCI6MjA0MTE4NTM3Nn0.sIU-ZfzB95XhGE_I6BAqZQ7Yz2p0WteluMe9_CMby6Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
