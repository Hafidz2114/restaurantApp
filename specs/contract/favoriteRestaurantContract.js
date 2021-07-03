const itActsAsFavoriteRestoModel = (favoriteRestaurant) => {
  it('should return the Resto that has been added', async () => {
    favoriteRestaurant.putResto({ id: 'rqdv5juczeskfw1e867' });
    favoriteRestaurant.putResto({ id: 's1knt6za9kkfw1e867' });

    expect(await favoriteRestaurant.getResto('rqdv5juczeskfw1e867'))
      .toEqual({
        id: 'rqdv5juczeskfw1e867',
      });
    expect(await favoriteRestaurant.getResto('s1knt6za9kkfw1e867'))
      .toEqual({
        id: 's1knt6za9kkfw1e867',
      });
    expect(await favoriteRestaurant.getResto('w9pga3s2tubkfw1e867'))
      .toEqual(undefined);
  });

  it('should refuse a Restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurant.putResto({ aProperty: 'property' });

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([]);
  });

  it('can return all of the Restaurants that have been added', async () => {
    favoriteRestaurant.putResto({ id: 'rqdv5juczeskfw1e867' });
    favoriteRestaurant.putResto({ id: 's1knt6za9kkfw1e867' });

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([
        { id: 'rqdv5juczeskfw1e867' },
        { id: 's1knt6za9kkfw1e867' },
      ]);
  });

  it('should remove favorite Restaurant', async () => {
    favoriteRestaurant.putResto({ id: 'rqdv5juczeskfw1e867' });
    favoriteRestaurant.putResto({ id: 's1knt6za9kkfw1e867' });
    favoriteRestaurant.putResto({ id: 'w9pga3s2tubkfw1e867' });

    await favoriteRestaurant.deleteResto('rqdv5juczeskfw1e867');

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([
        { id: 's1knt6za9kkfw1e867' },
        { id: 'w9pga3s2tubkfw1e867' },
      ]);
  });

  it('should handle request to remove a Restaurant even though the Restaurant has not been added', async () => {
    favoriteRestaurant.putResto({ id: 'rqdv5juczeskfw1e867' });
    favoriteRestaurant.putResto({ id: 's1knt6za9kkfw1e867' });
    favoriteRestaurant.putResto({ id: 'w9pga3s2tubkfw1e867' });

    await favoriteRestaurant.deleteResto(4);

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([
        { id: 'rqdv5juczeskfw1e867' },
        { id: 's1knt6za9kkfw1e867' },
        { id: 'w9pga3s2tubkfw1e867' },
      ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestoModel };
