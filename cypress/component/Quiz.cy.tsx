import Quiz from "../../client/src/components/Quiz";
import { mount } from "cypress/react";
import type { Question } from "../../client/src/models/Question";

describe("Quiz Component", () => {
  beforeEach(() => {
    // Ensure Cypress properly loads and waits for fixture data
    cy.fixture("questions.json").as("mockQuestions");
  });

  it("renders the start quiz button", function () {
    cy.fixture("questions.json").then((mockQuestions: Question[]) => {
      mount(<Quiz getQuestions={() => Promise.resolve(mockQuestions)} />);
      cy.contains("Start Quiz").should("be.visible");
    });
  });

  it("starts the quiz and shows the first question", function () {
    cy.fixture("questions.json").then((mockQuestions: Question[]) => {
      mount(<Quiz getQuestions={() => Promise.resolve(mockQuestions)} />);
      cy.contains("Start Quiz").click();
      cy.contains(mockQuestions[0].question).should("be.visible");
    });
  });

  it("allows answering a question and moves to next", function () {
    cy.fixture("questions.json").then((mockQuestions: Question[]) => {
      mount(<Quiz getQuestions={() => Promise.resolve(mockQuestions)} />);
      cy.contains("Start Quiz").click();
      cy.get("button").contains("1").click();
      cy.contains(mockQuestions[1].question).should("be.visible");
    });
  });

  it("shows the final score when the quiz is completed", function () {
    cy.fixture("questions.json").then((mockQuestions: Question[]) => {
      mount(<Quiz getQuestions={() => Promise.resolve(mockQuestions)} />);
      cy.contains("Start Quiz").click();
      cy.get("button").contains("1").click();
      cy.get("button").contains("1").click();
      cy.contains("Quiz Completed").should("be.visible");
      cy.contains("Your score:").should("be.visible");
    });
  });

  it("restarts the quiz when clicking Take New Quiz", function () {
    cy.fixture("questions.json").then((mockQuestions: Question[]) => {
      mount(<Quiz getQuestions={() => Promise.resolve(mockQuestions)} />);
      cy.contains("Start Quiz").click();
  
      // Complete the quiz
      cy.get("button").contains("1").click();
      cy.get("button").contains("1").click();
  
      // Click "Take New Quiz"
      cy.contains("Take New Quiz").click();
  
      // Ensure Cypress waits for quiz reset by checking that "Take New Quiz" disappears first
      cy.contains("Take New Quiz").should("not.exist");
  
      // Wait for "Start Quiz" button to reappear
      cy.get("button").contains("Start Quiz", { timeout: 10000 }).should("exist").and("be.visible");
    });
  });
});
