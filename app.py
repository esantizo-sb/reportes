from config import supabase

def registrar_usuario():
    nombre = input("Nombre: ")
    email = input("Email: ")
    password = input("Contraseña: ")
    data = {"nombre": nombre, "email": email, "password": password}
    supabase.table("usuarios").insert(data).execute()
    print("✅ Usuario registrado con éxito.")

def listar_usuarios():
    response = supabase.table("usuarios").select("*").execute()
    for usuario in response.data:
        print(f"ID: {usuario['id']}, Nombre: {usuario['nombre']}, Email: {usuario['email']}")

# Menú
while True:
    print("\n📌 Menú:")
    print("1. Registrar usuario")
    print("2. Listar usuarios")
    print("3. Salir")

    opcion = input("Selecciona una opción: ")

    if opcion == "1":
        registrar_usuario()
    elif opcion == "2":
        listar_usuarios()
    elif opcion == "3":
        print("👋 Saliendo...")
        break
    else:
        print("❌ Opción inválida.")
