import supertest from "supertest";

import { expect } from "chai";

const request = supertest("https://petstore.swagger.io/v2/");
const status = 'available,pending,sold';
const results = "";

describe("", () => {
    it('GET /pet/findByStatus', () => {
        request
        .get(`pet/findByStatus?status=${status}`)
        .then(res =>{
            //filtramos solo los de estado "sold"
            const results = res.body.filter(pet => pet.status == "available");
            console.log(results);
        });
    });
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
});