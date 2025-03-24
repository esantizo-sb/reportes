from supabase import create_client

# ⚠️ IMPORTANTE: La URL y API Key deben ir entre comillas
SUPABASE_URL = "https://zkakjkucgzvpurolopat.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprYWtqa3VjZ3p2cHVyb2xvcGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzU0NjcsImV4cCI6MjA1ODA1MTQ2N30.I4OMdwu-uNQmFOTXX329dMkpGH2kd1Fg3DfowXjFJLY"

# Crear la conexión con Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
