import { validateFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let restaurantStorage = [];

const FavoriteRestaurantArray = {
  async getRestaurant(id) {
    if (!id) return undefined;
    return restaurantStorage.find((restaurant) => restaurant.id === id);
  },

  async getAllRestaurants() {
    return restaurantStorage;
  },

  async putRestaurant(restaurant) {
    if (!restaurant || !restaurant.id) return;

    if (await this.getRestaurant(restaurant.id)) return;

    restaurantStorage.push(restaurant);
  },

  async deleteRestaurant(id) {
    restaurantStorage = restaurantStorage.filter(
      (restaurant) => restaurant.id !== id
    );
  },
};

describe('Favorite Restaurant Array Contract Test', () => {
  afterEach(() => {
    restaurantStorage = [];
  });

  validateFavoriteRestaurantModel(FavoriteRestaurantArray);
});
