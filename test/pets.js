import supertest from "supertest";

import { expect } from "chai";

const request = supertest("https://petstore.swagger.io/v2/"); //URL BASE
const status = 'available,pending,sold'; //STATUS DE LAS MASCOTAS

describe("", () => {
    /* CREAR USUARIO */
    it('POST /users', () => {
        //data para enviar en el post para crear usuario
        const data ={
            id: 26121988,
            username: "carlleviss",
            firstName: "Carl",
            lastName: "Mayhua",
            email: "clmayhuap@gmail.com",
            password: "pass123456",
            phone: "+51973176442",
            userStatus: 1
        }
        return request
        .post('user')
        .send(data)
        .then((res) => {
            //escribimos el body y el mensaje
            console.log(res.body);
            console.log("message -> ",res.body.message);
            //Esperamos el codigo de estado 200
            expect(res.statusCode).to.be.eq(200);
        });
    });


    /*GET PARA RECIBIR DATOS DE MASCOTA POR ${status}*/
    it('GET /pet/findByStatus', () => {
        request
        .get(`pet/findByStatus?status=${status}`)
        .then(res =>{
            //Usamos la FUNCION filter para filtrar solo las mascotas vendidas "SOLD"
            const results = res.body.filter(pet => pet.status == "sold");
            //console.log(results);
            //creamos un array de tupla {id, name}
            const soldBets = [];
            results.forEach(element => {
                soldBets.push(
                    {
                        id: element.id,
                        name: element.name
                    }
                );
            });
            //mostramos las tuplas {id, name}
            console.log(soldBets);
            //creamos un objeto de la clase manageSoldPets e instanciamos
            const object = new manageSoldPets(soldBets); //le enviamos la estructura
            object.countSameName(); // usamos el método para hacer el conteo
        });
    });
});

//CREAMOS CLASE administrar mascotas
class manageSoldPets {
    //constructores para recibir el arreglo
    constructor(arrayPet){
        this._arrayPet = arrayPet;
    }

    //metodos
    //metodos para contar con el mismo nombre
    countSameName(){
        const arraySameName = {};
        this._arrayPet.forEach(element => {
            const name = element.name;
            if (arraySameName[name]) {
                arraySameName[name]++;
            } else {
                arraySameName[name] = 1;
            }
        }); 
        console.log(arraySameName);
    }
}