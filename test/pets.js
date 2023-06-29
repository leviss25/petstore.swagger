import supertest from "supertest";

import { expect } from "chai";

const request = supertest("https://petstore.swagger.io/v2/"); //URL BASE
const status = 'available,pending,sold'; //STATUS DE LAS MASCOTAS

describe("", () => {
    /* CREAR USUARIO */
    it('POST /users', () => {
        //data body para enviar en el post para crear usuario
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

        //creamos un schema para validar el schema del body request
        const userSchema = {
            id: 0,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
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
            //comparamos el schema de la data enviada en el body
            const sameSchema = JSON.stringify(Object.keys(userSchema)) === JSON.stringify(Object.keys(data));
            //Esperamos que sea verdadera (correcta) el schema del body enviado
            expect(sameSchema).to.be.eq(true);
            //Esperamos que el message del body de la respuesta no esté vacía
            expect(res.body.message !== '').to.be.eq(true);
            //Validamos que el ID sea mayor a cero
            expect(data.id > 0).to.be.eq(true);
        });
    });


    /*GET PARA RECIBIR DATOS DE MASCOTA POR ${status}*/
    it('GET /pet/findByStatus', () => {
        request
        .get(`pet/findByStatus?status=${status}`)
        .then(res =>{
            //Esperamos que el restudado de body no esté vacío
            expect(res.body).to.not.be.empty;
            //Esperamos que el id sea mayor o igual a cero, según documentación de API
            res.body.forEach(pet => {
                expect(pet.id >= 0).to.be.eq(true);
            })
            //Usamos la FUNCION filter para filtrar solo las mascotas vendidas "SOLD"
            const results = res.body.filter(pet => pet.status == "sold");
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
    //metodo para contar con el mismo nombre
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