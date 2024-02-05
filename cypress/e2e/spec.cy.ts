describe('My First Test', () => {
  it('Visits the initial project page', () => {

    //  You can insert cy.log statements in your tests to log information about what Cypress is doing:
    cy.log('Visiting the initial project page')

    // Visit the root URL
    cy.visit('/')

    // Log another message
    cy.log('Checking if the page contains "Pokémon Store"')

    // Check if the page contains the specified text
    cy.contains('Pokémon Store').should('be.visible')
  })
})

describe('Home Page', () => {
  beforeEach(() => {

    // Intercept the HTTP requests:
    // Intercepting HTTP requests in the context of testing refers to the practice of capturing
    // and potentially modifying HTTP requests and responses. This can be useful for a variety of reasons:
    // - Stubbing/Mocking: You can intercept HTTP requests and return predefined/mock responses to test how your application
    //   behaves under different conditions.
    // Waiting: You can delay the response of a request to ensure your application handles latency correctly.
    // Listening: You can inspect the data being sent in a request or received in a response for validation purposes.
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/*').as('getPokemon');
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/*').as('getPokemonSpecies');

    // Visit the home page
    cy.visit('/');

    // Wait for the HTTP requests to complete:
    // cy.wait() only waits for the first request that matches the alias to complete.
    // Since our getPokemons() method is making multiple HTTP requests, cy.wait('@getPokemon')
    // and cy.wait('@getPokemonSpecies') will only wait for the first request of each type to complete.
    // To wait for all requests to complete, we can use a loop to call cy.wait() for each request.
    for (let i = 0; i < 251; i++) {
      cy.wait('@getPokemon');
      cy.wait('@getPokemonSpecies');
    }
  });

  it('should display the list of pokemons', () => {
    cy.get('[data-cy="pokemon-name"]').contains('Bulbasaur').should('be.visible');
  });

  it('should add an item to the cart', () => {

    cy.log('Clicking on the "Add to Cart" button')

    // Click on the "Add to Cart" button.
    // .eq(0) selects the element at index 0 (the first element).
    // This is useful when you have multiple elements with the same selector and you want to interact with (a specific) one.
    cy.get('[data-cy="add-to-cart"]').eq(0).click();

    cy.log('Checking if the cart contains 1 item')

    // Navigate to the cart page and wait for the page to fully load
    cy.visit('/cart').then(() => {

      // Check if the cart contains 1 item
      cy.get('[data-cy="article-quantity"]').contains('1').should('be.visible')
    })
  })
});
