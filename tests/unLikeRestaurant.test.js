import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helper/testFactories';

describe('Unliking A Restaurant', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  });

  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(
      async (restaurant) => {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
      }
    );
  });

  /**
   * Test Case 1: Memastikan tombol unlike muncul untuk restaurant yang sudah dilike
   */
  it('should display unlike widget when the restaurant has been liked', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  /**
   * Test Case 2: Memastikan tombol like tidak muncul untuk restaurant yang sudah dilike
   */
  it('should not display like widget when the restaurant has been liked', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  /**
   * Test Case 3: Memastikan restaurant bisa dihapus dari daftar favorit
   */
  it('should be able to remove liked restaurant from the list', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  /**
   * Test Case 4: Memastikan tidak ada error saat unlike restaurant yang sudah tidak ada di database
   */
  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
