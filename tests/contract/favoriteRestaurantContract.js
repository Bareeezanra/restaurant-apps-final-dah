const validateFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the added restaurant correctly', async () => {
    await favoriteRestaurant.putRestaurant({ id: 1 });
    await favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getRestaurant(3)).toBeUndefined();
  });

  it('should reject adding a restaurant without a valid ID', async () => {
    await favoriteRestaurant.putRestaurant({ invalidKey: 'value' });

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
  });

  it('should retrieve all added restaurants', async () => {
    await favoriteRestaurant.putRestaurant({ id: 1 });
    await favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should remove a restaurant from the favorites', async () => {
    await favoriteRestaurant.putRestaurant({ id: 1 });
    await favoriteRestaurant.putRestaurant({ id: 2 });

    await favoriteRestaurant.deleteRestaurant(1);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 2 }]);
  });

  it('should not throw an error when removing a non-existent restaurant', async () => {
    await favoriteRestaurant.putRestaurant({ id: 1 });

    await favoriteRestaurant.deleteRestaurant(99);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);
  });
};

export { validateFavoriteRestaurantModel };
