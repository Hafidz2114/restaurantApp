import { itActsAsFavoriteRestoModel } from './contract/favoriteRestaurantContract';
import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllRestos()).forEach(async (restaurant) => {
      await FavoriteRestoIdb.deleteResto(restaurant.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteRestoIdb);
});
