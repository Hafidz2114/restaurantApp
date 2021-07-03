import UrlParser from '../../routes/url-parser';
import Loader from '../templates/loader';
import TheRestoDbSource from '../../data/therestodb-source';
import { createrestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/initiator/like-button-initiator';
import { swallErrorInit } from '../../utils/initiator/swal-initiator';
import PostReview from '../../utils/post-review';
import FavoriteRestoIdb from '../../data/favoriteresto-idb';

const Detail = {
  async render() {
    return `  
      <div class="explore">
        <h1 class="explore__label">Detail Restoran</h1>
          <div id="loading"></div>
          <div id="likeButtonContainer"></div>
            <div id="main-container">
              <div id="Resto" class="resto"></div>
            </div>
      </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const loader = document.querySelector('#loading');
    const mainRestoContainer = document.querySelector('#main-container');
    const restaurantContainer = document.querySelector('#Resto');
    const messageContainer = document.querySelector('#logInfo');

    // change main display to Loader
    mainRestoContainer.style.display = 'none';
    loader.innerHTML = Loader();

    try {
      const restaurant = await TheRestoDbSource.detailRestaurant(url.id);

      restaurantContainer.innerHTML = createrestoDetailTemplate(restaurant.restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestoIdb,
        restaurant: {
          id: url.id,
          pictureId: restaurant.restaurant.pictureId,
          name: restaurant.restaurant.name,
          city: restaurant.restaurant.city,
          rating: restaurant.restaurant.rating,
          description: restaurant.restaurant.description,
        },
      });

      // change Loader display to main
      mainRestoContainer.style.display = 'block';
      loader.style.display = 'none';

      // review form
      const nameInput = document.querySelector('#name-input');
      const reviewInput = document.querySelector('#review-input');
      const btnSubmitReview = document.querySelector('#submit-review');

      btnSubmitReview.addEventListener('click', async (e) => {
        e.preventDefault();

        // POST review
        await PostReview(url, nameInput.value, reviewInput.value);

        // clear form input
        nameInput.value = '';
        reviewInput.value = '';
      });
    } catch (error) {
      console.error(error);

      mainRestoContainer.style.display = 'block';
      loader.style.display = 'none';
      messageContainer.innerHTML = `Error: ${error.message}`;
      swallErrorInit(error.message);
    }
  },
};

export default Detail;
