describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing')
    const user = {
      username: 'rasta',
      name: 'diego',
      password: 'fafafa',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is show', function () {
    cy.get('form')
    cy.get('#u_username')
    cy.get('#u_password')
  })

  describe('Login', function () {
    it('succeeds with the correct credentials', function () {
      cy.get('#u_username').type('rasta')
      cy.get('#u_password').type('fafafa')
      cy.contains('login').click()
      cy.contains('rasta')
    })
    it('fails with wrong credentials', function () {
      cy.get('#u_username').type('rasta')
      cy.get('#u_password').type('fafafe')
      cy.contains('login').click()
      cy.contains('ivalid credentials')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'rasta', password: 'fafafa' })
    })
    it('A blog can be created', function () {
      cy.get('#tButton').click()

      cy.get('#title').type('new blog')
      cy.get('#author').type('anonymous')
      cy.get('#url').type('google.com')
      cy.get('#submit').click()

      cy.contains('a new blog')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a title one',
          author: 'user1',
          url: 'twitter.com',
        })
        cy.createBlog({
          title: 'a title two',
          author: 'user2',
          url: 'twitter.com',
        })
      })

      it('it can be like a blog', function () {
        cy.contains('a title one').contains('view').click()
        cy.contains('a title one').contains('like').click()
        cy.contains('a title one').contains('likes').contains(1)
      })

      it('it can be delete a blog', function () {
        cy.contains('a title two').contains('view').click()
        cy.contains('a title two').contains('delete').click()
        cy.contains('a title two').should('not.exist')
      })

      it.only('the blogs are ordered', function () {
        cy.get('.Blog').then((blogs) => {
          for (let i = 0; i < blogs.length; i++) {
            cy.wrap(blogs[i]).contains('view').click()
          }
        })
        cy.get('.likesNum').then((Likes) => {
          let like = Number.MAX_SAFE_INTEGER
          for (let i = 0; i < Likes.length; i++) {
            const L = parseInt(Likes[i].textContent)
            cy.wrap(L).should('be.lte',like)
            like = L
          }
        })
      })
    })
  })
})
