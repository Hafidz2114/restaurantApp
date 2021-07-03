const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

const emptyFavoriteRestoMsg = 'Restoran favorit anda masih kosong, silahkan kunjungi dan simpan restoran yang anda suka!';

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.see(emptyFavoriteRestoMsg, '#fav-resto');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(emptyFavoriteRestoMsg, '#fav-resto');

  I.amOnPage('/');
  I.seeElement('.resto-item a');
  const firstRestoItem = locate('.resto__title').first();
  const firstRestoItemTitle = await I.grabTextFrom(firstRestoItem);
  I.click(firstRestoItem);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');
  const likedCardTitle = await I.grabTextFrom('.resto__title');
  assert.strictEqual(firstRestoItemTitle, likedCardTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see(emptyFavoriteRestoMsg, '#fav-resto');

  I.amOnPage('/');
  I.seeElement('.resto-item a');
  const firstRestoItem = locate('.resto__title').first();
  I.click(firstRestoItem);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.seeElement('.swal2-container');
  I.click('.swal2-confirm');
  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');
  const likedCardTitle = await I.grabTextFrom('.resto__title');
  I.click(likedCardTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.seeElement('.swal2-container');
  I.click('.swal2-confirm');

  I.amOnPage('/#/favorite');

  I.see(emptyFavoriteRestoMsg, '#fav-resto');
});
