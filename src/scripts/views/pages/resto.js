import TheRestoDbSource from '../../data/therestodb-source';
import { createrestoItemTemplate } from '../templates/template-creator';
import Loader from '../templates/loader';
import { swallErrorInit } from '../../utils/initiator/swal-initiator';

const ItemRestaurant = {
  async render() {
    return ` 
      <div class="content">
        <div class="explore">
          <h1 class="explore__label">Cari Restoran</h1>
            <div id="loading"></div>
            <div id="main-container">
              <div id="Resto" class="restos"></div>
            </div>
        </div>
      </div>
      `;
  },

  async afterRender() {
    const mainRestoContainer = document.querySelector('#main-container');
    const loader = document.querySelector('#loading');
    const restaurantsContainer = document.querySelector('#Resto');

    // change main display to Loader
    mainRestoContainer.style.display = 'none';
    loader.innerHTML = Loader();

    try {
      const restaurants = await TheRestoDbSource.restaurantList();

      restaurants.forEach((resto) => {
        restaurantsContainer.innerHTML += createrestoItemTemplate(resto);
      });

      // change Loader display to main
      mainRestoContainer.style.display = 'block';
      loader.style.display = 'none';
    } catch (error) {
      console.error(error);

      mainRestoContainer.style.display = 'block';
      loader.style.display = 'none';
      restaurantsContainer.innerHTML = `Error: ${error.message}`;
      swallErrorInit(error.message);
    }
  },
};

export default ItemRestaurant;
