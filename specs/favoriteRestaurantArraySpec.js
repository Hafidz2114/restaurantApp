import { itActsAsFavoriteRestoModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurants.find((restaurant) => restaurant.id === id);
  },

  getAllRestos() {
    return favoriteRestaurants;
  },

  putResto(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    if (this.getResto(resto.id)) {
      return;
    }

    favoriteRestaurants.push(resto);
  },

  deleteResto(id) {
    favoriteRestaurants = favoriteRestaurants.filter((resto) => resto.id !== id);
  },
};

describe('Favorite restaurant array contract test', () => {
  afterEach(() => (favoriteRestaurants = []));

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
