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

}