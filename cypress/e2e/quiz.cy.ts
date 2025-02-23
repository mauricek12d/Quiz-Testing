describe("Tech Quiz End-to-End Tests", () => {
    beforeEach(() => {
      cy.visit("/"); // Ensure app is running at localhost:3000
    });
  
    it("Displays the Start Quiz button", () => {
      cy.contains("Start Quiz").should("be.visible");
    });
  
    it("Starts the quiz and displays the first question", () => {
      cy.contains("Start Quiz").click();
      cy.get("h2").should("exist"); // Verify question header appears
    });
  
    it("Allows the user to answer questions and progresses through the quiz", () => {
      cy.contains("Start Quiz").click();
  
      for (let i = 0; i < 10; i++) {
        cy.get("button").contains(/\d+/).first().click(); // Click any answer
      }
  
      cy.contains("Quiz Completed").should("be.visible");
    });
  
    it("Shows the final score and allows restarting", () => {
      cy.contains("Start Quiz").click();
  
      for (let i = 0; i < 10; i++) {
        cy.get("button").contains(/\d+/).first().click();
      }
  
      cy.contains("Your score:").should("be.visible");
      cy.contains("Take New Quiz").click();
      cy.contains("Start Quiz").should("be.visible");
    });
  });
  