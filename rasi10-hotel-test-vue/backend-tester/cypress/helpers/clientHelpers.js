const faker = require ('faker')


function createRandomClientPayload(){

    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()
    

    const payload={
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone,
        
    }

    return payload
}


function getAllClients(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: 'http://localhost:3000/api/clients',
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log (responseAsString)
        }))
    })) 
}
function getRequestAllClientsAssertions(cy,name,email,telephone){
    cy.request({
        method: "GET",
        url: 'http://localhost:3000/api/clients',
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)
    }))

}


function createClientRequest(cy){
    cy.authenticateSession().then((response =>{
        let fakeClientPayload = createRandomClientPayload()
    cy.request({
            method: "POST",
            url: 'http://localhost:3000/api/client/new',
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:fakeClientPayload
        }).then((response =>{
            const responseAsString=JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeClientPayload.name)
        }))
        //GET request to fetch all the clients
        getRequestAllClientsAssertions(cy,fakeClientPayload.name, fakeClientPayload.email,fakeClientPayload.telephone)
  
    }))
//}
//PUT funkar inte om man kör testfallen två gånger,
//andra gången omvandlas ID till null och min PUT kan inte läsa av null.

/*function editClient(cy){
    let fakeClientPayload = createRandomClientPayload()
    cy.request({
        method:"PUT",
        url:"http://localhost:3000/api/client/2",
        headers:{
            "X-User-Auth": JSON.stringify(Cypress.env().loginToken),
            "content-type": "application/json",
        },
        body:fakeClientPayload 
    }).then((response=>{
        const responseAsString = JSON.stringify(response)
        cy.log(responseAsString)
     }))*/
}



module.exports ={
    createRandomClientPayload,
    getAllClients,
    createClientRequest,
    //editClient
    

}