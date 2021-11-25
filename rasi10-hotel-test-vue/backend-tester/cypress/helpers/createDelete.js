const faker = require('faker')

const ENDPOINT_GET_CLIENTS='http://localhost:3000/api/clients'
const ENDPOINT_NEW_CLIENT='http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT='http://localhost:3000/api/client/'


    // skapa information för klienten 
    function createClientPayload(){
        const payload={
            'name':faker.name.firstName(),
            'email': faker.internet.email(),
            'telephone': faker.phone.phoneNumber()
        }
        return payload
    }
    // Create client
    function createClient(cy){
        let clientPayload=createClientPayload()
        //skickar post för att skapa klient
            cy.request({
                method:'POST',
                url:ENDPOINT_NEW_CLIENT,
                headers:{
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type':'application/json'
                },
                body:clientPayload
            }).then((response=>{
                const responseString=JSON.stringify(response.body)
                expect(responseString).to.have.string(clientPayload.name)
            }))
    }
    // Get all clients
    function getClientsAndDelete(cy){
            cy.request({
            method:'GET',
            url:ENDPOINT_GET_CLIENTS,
            headers:{'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
            },
        }).then((response =>{
            return response
        }))      
    }
    

    // Delete Client
    function deleteLatestClient(cy){
        cy.request({
            method:'GET',
            url:ENDPOINT_GET_CLIENTS,
            headers:{
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response=>{
            let lastId = response.body[response.body.length-1].id
        cy.request({
            method:"DELETE",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers:{
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response=>{
            
            cy.request({
                method:'GET',
                url:ENDPOINT_GET_CLIENTS,
                headers:{
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },          
            }).then((response=>{
                var responseString = JSON.stringify(response)
                expect(responseString).to.not.have.string('id\: '+lastId)
                //cy.log(responseString)
            }))
        }))
    }))
 }

   
   function createAndDeleteClient(cy){
       cy.authenticateSession().then((response=>{
        createClient(cy)
        deleteLatestClient(cy)
        getClientsAndDelete(cy)
       }))
    
   }

    module.exports={
        createAndDeleteClient
    }