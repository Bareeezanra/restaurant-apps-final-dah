Feature('Review Restaurant');

const assert = require('assert');

Before(({ I }) => {
  // Mulai dari halaman favorit
  I.amOnPage('/#/favorite');
});

Scenario('Menambahkan ulasan restoran dengan sukses', async ({ I }) => {
  const reviewData = {
    name: 'Penguji E2E',
    review: 'Ini adalah ulasan pengujian E2E.',
  };

  // Navigasi ke halaman utama dan pilih restoran
  I.amOnPage('/');
  I.waitForElement('.restaurant-item__content', 10);
  I.seeElement('.restaurant-item__content');
  I.click(locate('.restaurant-item__content a').first());

  // Tunggu halaman detail restoran dimuat
  I.waitForElement('.restaurant-detail__title', 10);
  I.seeElement('.restaurant-detail__title');

  // Tunggu bagian ulasan dan form ulasan
  I.waitForElement('#reviewForm', 10);
  I.seeElement('#reviewForm');

  // Isi form ulasan dan kirimkan
  I.fillField('#reviewName', reviewData.name);
  I.fillField('#reviewText', reviewData.review);
  I.click('#submitReview');

  // Verifikasi bahwa ulasan baru muncul
  I.waitForElement('.review-item', 10);
  I.see(reviewData.name, '.review-name');
  I.see(reviewData.review, '.review-text');

  // Pastikan form telah di-reset
  const nameField = await I.grabValueFrom('#reviewName');
  const reviewField = await I.grabValueFrom('#reviewText');
  assert.strictEqual(nameField, '');
  assert.strictEqual(reviewField, '');
});
