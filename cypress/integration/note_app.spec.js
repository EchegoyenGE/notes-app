describe('Note App', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')

        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            name: 'Gaston',
            username: 'gaston',
            password: 'gaston'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('frontpage can be opened', () => {
        cy.contains('Notify')
    })

    it('login form can be open', () => {
        cy.contains('Show Login').click()
    })

    it('user can be logged', () => {
        cy.contains('Show Login').click()
        cy.get('[placeholder="Username"]').type('gaston')
        cy.get('[placeholder="Password"]').type('gaston')
        cy.get('#form-login-button').click()
        cy.contains('Show Create Note')
    })

    it('login fails with wrong password', () => {
        cy.contains('Show Login').click()
        cy.get('[placeholder="Username"]').type('gaston')
        cy.get('[placeholder="Password"]').type('password-incorrecta')
        cy.get('#form-login-button').click()

        cy.get('.error').should('contain', 'Wrong credentials')
    })

    describe('when logged in', () => {

        beforeEach(() => {

            cy.request('POST', 'http://localhost:3001/api/login',{
                username: 'gaston',
                password: 'gaston'
            }).then(response => {
                localStorage.setItem(
                    'loggedNoteAppUser', JSON.stringify(response.body)
                )
                cy.visit('http://localhost:3000')
            })
        })

        it('a new note can be created', () => {
            const noteContent = 'a note created by cypress'

            cy.contains('Show Create Note').click()
            cy.get('input').type(noteContent)
            cy.get('button').contains('Save').click()
            cy.contains(noteContent)
        })
    })
})