from supabase import create_client, Client

# Configura las credenciales de Supabase
SUPABASE_URL = 'https://ebubyfqechkeckvxxami.supabase.co'  # URL de tu proyecto
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidWJ5ZnFlY2hrZWNrdnh4YW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MDYyMDgsImV4cCI6MjA1ODA4MjIwOH0.t8Wshr9cFFosv3AhFi-8qDuJYuT0KkdWvqVEKgGHXRA'  # Clave de API

# Crear el cliente de Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Insertar un nuevo usuario en la tabla 'usuarios'
def insertar_usuario(nombre, correo):
    tabla = 'usuarios'  # Nombre de la tabla
    datos = {
        'nombre': nombre,
        'correo': correo,
    }
    try:
        response = supabase.table(tabla).insert(datos).execute()
        print("Usuario insertado:", response)
    except Exception as e:
        print("Error al insertar usuario:", e)

# Leer todos los usuarios de la tabla 'usuarios'
def leer_usuarios():
    tabla = 'usuarios'  # Nombre de la tabla
    try:
        response = supabase.table(tabla).select("*").execute()
        print("Usuarios:", response.data)
    except Exception as e:
        print("Error al leer usuarios:", e)

# Actualizar un usuario en la tabla 'usuarios'
def actualizar_usuario(id_usuario, nuevos_datos):
    tabla = 'usuarios'  # Nombre de la tabla
    try:
        response = supabase.table(tabla).update(nuevos_datos).eq('id', id_usuario).execute()
        print("Usuario actualizado:", response)
    except Exception as e:
        print("Error al actualizar usuario:", e)

# Eliminar un usuario de la tabla 'usuarios'
def eliminar_usuario(id_usuario):
    tabla = 'usuarios'  # Nombre de la tabla
    try:
        response = supabase.table(tabla).delete().eq('id', id_usuario).execute()
        print("Usuario eliminado:", response)
    except Exception as e:
        print("Error al eliminar usuario:", e)

# Ejecutar las funciones
insertar_usuario('Juan Perez', 'juan@example.com')  # Insertar un usuario
leer_usuarios()  # Leer todos los usuarios
actualizar_usuario(1, {'correo': 'juan.nuevo@example.com'})  # Actualizar un usuario
eliminar_usuario(1)  # Eliminar un usuario