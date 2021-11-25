/// <reference types="cypress" />

import * as clientHelpers from '../helpers/clientHelpers'
import * as taBort from '../helpers/createDelete'

describe('My test suite for backend', function(){

    it('test 1 - login and logout', function(){
        cy.authenticateSession()
        cy.endSession()
    })

    it('test case 2 - check clients', function(){
        clientHelpers.getAllClients(cy)
       
    })

    it('test case 3 - Create random client', function(){
        clientHelpers.createClientRequest(cy)
     
    })
    it('test case 4 - create and delete client', function(){
        taBort.createAndDeleteClient(cy)
     
    
    })
    it('test case 5 - edit client', function(){
        clientHelpers.editClient(cy)
     
    
    })

})