import LikeButtonPresenter from '../../src/scripts/utils/initiator/like-button-initiator';
import FavoriteRestoIdb from '../../src/scripts/data/favoriteresto-idb';

const createLikeButtonPresenterWithResto = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteRestoIdb,
    restaurant,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithResto };
