import { connect } from '../../helpers/db/connect.js';

export class movis extends connect {
    static instance;
    constructor(){
        if(typeof movis.instance === "object"){
        return movis.instance;
    }
    super();
    this.collection = this.db.collection("movis");
    movis.instance = this;
    return this;
}
//CONSULTA RANDOM 
async getAllMovis(){
    let res = await this.collection.aggregate([
        {
            $project: {
                name:1
            }
        }
    ]).toArray();
    await this.conexion.close();
    return res
    }
//PRIMERA CONSULTA
async getAllActionMovies() {
    let res = await this.collection.aggregate([
      { $match: { genre: "Accion" } },  // Filtrar por género "Accion"
      { $project: { _id: 0, name: 1, genre: 1 } }  // Proyectar solo nombre y género
    ]).toArray();
  
    await this.conexion.close();
    return res;
  }
//SEGUNDA CONSULTA


async getMoviesWithBlurayCopies() {
    let res = await this.collection.aggregate([
      { $match: { "format.name": "Bluray", "format.copies": { $gt: 200 } } },
      { $unwind: "$format" }, // Desanidar el arreglo format
      { $match: { "format.name": "Bluray" } }, // Filtrar nuevamente después de desanidar
      { 
        $project: { 
          _id: 0, 
          name: 1, 
          formatName: "$format.name", // Renombrar para mayor claridad
          copies: "$format.copies" 
        } 
      }
    ]).toArray();
  
    await this.conexion.close();
    return res;
  }

//TERCER EJERCICIO

async getMoviesWithLowDvdValue() {
    let res = await this.collection.aggregate([
      { $match: { "format.name": "dvd", "format.value": { $lt: 10 } } },
      { $unwind: "$format" }, // Desanidar el arreglo format
      { $match: { "format.name": "dvd" } }, // Filtrar después de desanidar
      { 
        $project: { 
          _id: 0, 
          name: 1, 
          formatName: "$format.name", 
          value: "$format.value"
        } 
      }
    ]).toArray();
  
    await this.conexion.close();
    return res;
  }

//CUARTO EJERCICIO
async getMoviesWithCharacterCobb() {
    let res = await this.collection.aggregate([
      { $match: { "character.apodo": "Cobb" } },
      { $unwind: "$character" }, // Desanidar el arreglo character
      { $match: { "character.apodo": "Cobb" } }, // Filtrar después de desanidar
      { 
        $project: { 
          _id: 0, 
          characterName: "$character.name", // Obtener el nombre del personaje
          apodo: "$character.apodo" 
        } 
      }
    ]).toArray();
  
    await this.conexion.close();
    return res;
  }
//QUINTO EJERCICIO
async getMoviesWithActors2And3() {
    let res = await this.collection.aggregate([
      { $match: { "character.id_actor": { $in: [2, 3] } } },
      { $unwind: "$character" }, // Desanidar el arreglo character
      { $match: { "character.id_actor": { $in: [2, 3] } } }, // Filtrar después de desanidar
      { 
        $project: { 
          _id: 0, 
          name: 1, 
          characterName: "$character.name",
          actorId: "$character.id_actor" 
        } 
      }
    ]).toArray();
  
    await this.conexion.close();
    return res;
  }








  
}
  
