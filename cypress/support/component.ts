// Import necessary Cypress commands
import "@testing-library/cypress/add-commands";

// Setup Cypress configuration (optional)
Cypress.on("uncaught:exception", (err) => {
  console.error("Uncaught exception:", err);
  return false; // Prevent Cypress from failing the test
});