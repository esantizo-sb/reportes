from flask import Flask, request, jsonify
from flask_cors import CORS
from config import supabase

app = Flask(__name__)
CORS(app)

# ✅ Obtener todos los reportes
@app.route('/reportes', methods=['GET'])
def obtener_reportes():
    response = supabase.table("reportes").select("*").execute()
    return jsonify(response.data)

# ✅ Agregar un nuevo reporte
@app.route('/reportes', methods=['POST'])
def agregar_reporte():
    data = request.json
    response = supabase.table("reportes").insert(data).execute()
    return jsonify(response.data)

# ✅ Modificar un reporte
#@app.route('/reportes/<int:id>', methods=['PUT'])
#def actualizar_reporte(id):
 #   data = request.json
  #  response = supabase.table("reportes").update(data).eq("id", id).execute()
   # return jsonify(response.data)

# ✅ Eliminar un reporte
@app.route('/reportes/<int:id>', methods=['DELETE'])
def eliminar_reporte(id):
    response = supabase.table("reportes").delete().eq("id", id).execute()
    return jsonify(response.data)

if __name__ == '__main__':
    app.run(debug=True)


@app.route('/reportes/<int:id>', methods=['GET'])
def obtener_reporte(id):
    response = supabase.table("reportes").select("*").eq("id", id).execute()
    if response.data:
        return jsonify(response.data[0])
    else:
        return jsonify({}), 404
