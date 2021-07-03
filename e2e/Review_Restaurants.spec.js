const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Post restaurant review', async ({ I }) => {
  const reviewText = 'Auto Review';

  I.seeElement('.resto-item h1 a');
  I.click(locate('.resto-item h1 a').first());

  I.seeElement('.form-review form');
  I.fillField('#name-input', 'E2E testing');
  I.fillField('#review-input', reviewText);
  I.click('#submit-review');

  I.waitForResponse('https://restaurant-api.dicoding.dev/review');
  const lastReview = locate('.review-body').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert.strictEqual(reviewText, lastReviewText.trim());
});
