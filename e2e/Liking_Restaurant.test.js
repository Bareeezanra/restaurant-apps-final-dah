const assert = require('assert');

Feature('Restaurant Favorites Management');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('displaying empty favorites list on first visit', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('#main-content');
  I.see('Favorite Restaurants', '.content__heading');
  I.seeElement('.restaurant-item__not__found');
  I.see('No Favorite Restaurants Found', '.empty-favorite h3');
});

Scenario('liking and unliking a restaurant', async ({ I }) => {
  // Buka halaman utama
  I.amOnPage('/');
  I.seeElement('.restaurant-item');

  // Ambil data restoran pertama
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  // Klik restoran pertama
  I.click(firstRestaurant);

  // Tunggu elemen like button muncul
  I.waitForElement('#likeButtonContainer', 5);
  I.seeElement('#likeButton');

  // Simpan restoran ke favorit
  I.click('#likeButton');
  I.seeAttributesOnElements('#likeButton', {
    'aria-label': 'unlike this restaurant',
  });

  // Verifikasi di halaman favorit
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurants .restaurant-item', 5);
  const favoritedRestaurantName = await I.grabTextFrom('.restaurant__title a');
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);

  // Hapus restoran dari favorit
  I.click(favoritedRestaurantName);
  I.waitForElement('#likeButton', 5);
  I.click('#likeButton');
  I.seeAttributesOnElements('#likeButton', {
    'aria-label': 'like this restaurant',
  });

  // Verifikasi halaman favorit kosong
  I.amOnPage('/#/favorite');
  I.see('No Favorite Restaurants Found', '.empty-favorite h3');
  I.dontSeeElement('.restaurant-item');
});

Scenario('adding a customer review and verifying it', async ({ I }) => {
  // Buka halaman detail restoran pertama
  I.amOnPage('/');
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant__title a').first();
  I.click(firstRestaurant);

  // Pastikan form ulasan tersedia
  I.seeElement('#reviewContainer');
  const reviewText = 'Ulasan dari End to End Test';
  const reviewerName = 'E2E Tester';

  // Isi dan kirim ulasan
  I.fillField('input[name="name"]', reviewerName);
  I.fillField('textarea[name="review"]', reviewText);
  I.click('button[type="submit"]');

  // Verifikasi ulasan berhasil ditambahkan
  I.see(reviewerName, '.review-item .review-name');
  I.see(reviewText, '.review-item .review-text');
});
