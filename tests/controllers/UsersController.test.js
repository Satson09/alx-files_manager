/* eslint-disable import/no-named-as-default */
// This ESLint rule is disabled to allow default import of 'dbClient'

import dbClient from '../../utils/db';  // Import the database client to interact with the database

describe('+ UserController', () => {
  // Mock user data to be used in the test cases
  const mockUser = {
    email: 'beloxx@blues.com',
    password: 'melody1982',
  };

  /**
   * Before all the tests, clean up the database by removing any user with the mock user's email.
   * The timeout is set to 10 seconds to account for possible delays in database operations.
   */
  before(function (done) {
    this.timeout(10000);  // Set test timeout to 10 seconds

    // Access the users collection in the database
    dbClient.usersCollection()
      .then((usersCollection) => {
        // Delete any user with the same email as the mockUser
        usersCollection.deleteMany({ email: mockUser.email })
          .then(() => done())  // If deletion is successful, proceed with the tests
          .catch((deleteErr) => done(deleteErr));  // Handle any error that occurs during deletion
      })
      .catch((connectErr) => done(connectErr));  // Handle any error in connecting to the collection

    // Ensure the hook doesn't time out prematurely
    setTimeout(done, 5000);
  });

  /**
   * Describe block for testing the POST /users endpoint.
   * This section includes multiple tests for different input scenarios.
   */
  describe('+ POST: /users', () => {

    /**
     * Test: Fails when there is no email but the password is provided.
     * Expected result: Response status 400 with error message 'Missing email'.
     */
    it('+ Fails when there is no email and there is password', function (done) {
      this.timeout(5000);  // Set individual test timeout to 5 seconds

      // Simulate a POST request to /users with only the password provided
      request.post('/users')
        .send({
          password: mockUser.password,  // Send only the password
        })
        .expect(400)  // Expect a 400 (Bad Request) status
        .end((err, res) => {
          if (err) {
            return done(err);  // If there's an error, complete the test with the error
          }
          // Assert that the response body contains the expected error message
          expect(res.body).to.deep.eql({ error: 'Missing email' });
          done();  // Complete the test
        });
    });

    /**
     * Test: Fails when the email is provided but the password is missing.
     * Expected result: Response status 400 with error message 'Missing password'.
     */
    it('+ Fails when there is email and there is no password', function (done) {
      this.timeout(5000);  // Set individual test timeout to 5 seconds

      // Simulate a POST request to /users with only the email provided
      request.post('/users')
        .send({
          email: mockUser.email,  // Send only the email
        })
        .expect(400)  // Expect a 400 (Bad Request) status
        .end((err, res) => {
          if (err) {
            return done(err);  // If there's an error, complete the test with the error
          }
          // Assert that the response body contains the expected error message
          expect(res.body).to.deep.eql({ error: 'Missing password' });
          done();  // Complete the test
        });
    });

    /**
     * Test: Succeeds when both email and password are provided.
     * Expected result: Response status 201 with the created user's email and ID.
     */
    it('+ Succeeds when the new user has a password and email', function (done) {
      this.timeout(5000);  // Set individual test timeout to 5 seconds

      // Simulate a POST request to /users with both email and password
      request.post('/users')
        .send({
          email: mockUser.email,  // Send both the email
          password: mockUser.password,  // and password
        })
        .expect(201)  // Expect a 201 (Created) status
        .end((err, res) => {
          if (err) {
            return done(err);  // If there's an error, complete the test with the error
          }
          // Assert that the response contains the expected email and user ID
          expect(res.body.email).to.eql(mockUser.email);  // Check that the email matches
          expect(res.body.id.length).to.be.greaterThan(0);  // Ensure the ID is valid
          done();  // Complete the test
        });
    });

    /**
     * Test: Fails when the user already exists (duplicate registration).
     * Expected result: Response status 400 with error message 'Already exist'.
     */
    it('+ Fails when the user already exists', function (done) {
      this.timeout(5000);  // Set individual test timeout to 5 seconds

      // Simulate a POST request to /users with existing user's email and password
      request.post('/users')
        .send({
          email: mockUser.email,  // Send email of the user that already exists
          password: mockUser.password,  // Send the existing user's password
        })
        .expect(400)  // Expect a 400 (Bad Request) status
        .end((err, res) => {
          if (err) {
            return done(err);  // If there's an error, complete the test with the error
          }
          // Assert that the response body contains the expected error message
          expect(res.body).to.deep.eql({ error: 'Already exist' });
          done();  // Complete the test
        });
    });
  });

});

