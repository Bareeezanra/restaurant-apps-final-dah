const assert = require('assert');

Feature('Removing Restaurants from Favorites');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Remove a restaurant from the favorites list', async ({ I }) => {
  // Pastikan ada restoran yang dapat ditambahkan ke favorit
  I.seeElement('.restaurant-item');

  // Langkah 1: Menyukai restoran
  const restoranPertama = locate('.restaurant-item__content h3 a').first();
  const namaRestoran = await I.grabTextFrom(restoranPertama);
  I.click(restoranPertama);
  I.waitForElement('#likeButton', 5);
  I.click('#likeButton');

  // Langkah 2: Memverifikasi restoran masuk ke daftar favorit
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 5);
  const namaFavorit = await I.grabTextFrom('.restaurant-item__content h3 a');
  assert.strictEqual(namaRestoran, namaFavorit);

  // Langkah 3: Menghapus restoran dari favorit
  I.click(locate('.restaurant-item__content h3 a').first());
  I.waitForElement('#likeButton', 5);
  I.click('#likeButton');

  // Langkah 4: Memastikan restoran dihapus dari favorit
  I.amOnPage('/#/favorite');
  I.see('No Favorite Restaurants Found', '.empty-favorite h3');
  I.dontSeeElement('.restaurant-item');
});
