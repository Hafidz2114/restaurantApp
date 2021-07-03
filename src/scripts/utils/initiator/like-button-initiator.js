import FavoriteRestoIdb from '../../data/favoriteresto-idb';
import { createLikeButtonTemplate, createUnlikeButtonTemplate } from '../../views/templates/template-creator';
import { swallErrorInit, swalSuccessInit } from './swal-initiator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    try {
      const { id } = this._restaurant;

      // Get resto in indexed db
      const restaurant = await FavoriteRestoIdb.getResto(id);

      if (restaurant) {
        this._renderLiked();
      } else {
        this._renderLike();
      }
    } catch (error) {
      console.error(error);
      swallErrorInit(error.message);
      throw new Error(error);
    }
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      // onClick fav the selected restaurant
      await FavoriteRestoIdb.putResto(this._restaurant);
      swalSuccessInit('Berhasil disimpan');
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      // onClick unfav the selected resto
      await FavoriteRestoIdb.deleteResto(this._restaurant.id);
      swalSuccessInit('Berhasil dihapus');
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
