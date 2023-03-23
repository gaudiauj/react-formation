import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  xit("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/join");

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();
    cy.cleanupUser();

    // cy.findByRole("button", { name: /logout/i }).click();
    // cy.findByRole("link", { name: /log in/i });
  });

  it("should allow to contacts", () => {
    const testContact = {
      society: faker.lorem.words(1),
      name: faker.internet.userName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      message: faker.lorem.sentence(20),
    };
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /contacter/i }).click();
    cy.findByLabelText(/Société/i).type(testContact.society, { force: true });
    cy.findByLabelText(/nom/i).type(testContact.name, { force: true });
    cy.findByLabelText(/numéro/i).type(testContact.phone, { force: true });
    cy.findByLabelText(/email/i).type(testContact.email, { force: true });
    cy.findByLabelText(/message/i).type(testContact.message, { force: true });
    cy.findByRole("button", { name: /envoyer/i }).click();
    cy.findByText(/a bien été envoyé/i);
    cy.login({ email: "ok@react-formation.fr" });
    cy.visitAndCheck("/admin/pageview");
    cy.visitAndCheck("/admin/message");
    cy.findByText(testContact.message).should("exist");
    cy.findByText(testContact.email).should("exist");
    cy.cleanupMessage({ email: testContact.email });
    cy.reload();
    cy.findByText(testContact.email).should("not.exist");
  });
});
