import { validateFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test', () => {
  afterEach(async () => {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    for (const restaurant of restaurants) {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    }
  });

  validateFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
