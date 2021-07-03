import CONFIG from '../../globals/config';

const createrestoDetailTemplate = (resto) => `
 <h1 class="resto__title">${resto.name}</h1>
  <img class="resto__poster" src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}" />
    <div class="resto__info">
      <h2>Informasi Lengkap</h2>
        <h3>Rating</h3>
        <p>${resto.rating}</p>
        <h3>Lokasi</h3>
        <p>${resto.city}</p>
        <h3>Alamat</h3>
        <p>${resto.address}</p>
        <h3>Kategori</h3>
        <p>${resto.categories.map((category) => category.name).join(', ')}</p>
        <h3>Menu Makanan</h3>
        <p>${resto.menus.foods.map((foods) => foods.name).join(', ')}</p>
        <h3>Menu Minuman</h3>
        <p>${resto.menus.drinks.map((drinks) => drinks.name).join(', ')}</p>

        <h3>Add Reviews</h3>
        <div class="form-review">
          <div class="card-form-detail">  
            <form autocomplete="on">
              <div class="input-form-review">
                <label for="name-input" class="form-label">Nama Lengkap:</label>
                <input type="text" class="form-control" id="name-input" minlength="1" maxlength="25" placeholder="Masukkan nama Anda" required>
              </div>
              <div class="input-form-review">
                <label for="review-input" class="form-label">Review Anda:</label>
                <input type="text" class="form-control" id="review-input" minlength="1" maxlength="50" placeholder="Masukkan review Anda" required>
              </div>
              <button id="submit-review" type="submit" class="button-submit"><i class="fas fa-paper-plane"></i> Kirim</button>
            </form>
          </div>
        </div>

        <div class="detail-review">
          <h3>Reviews</h3>
          <p>${resto.customerReviews.map((review) => `
            <h3>${review.name}</h3>
            <p>${review.date}</p>
            <p>${review.review}</p>       
          `).join('')}</p>
        </div>  
    </div>    
  <div class="resto__overview">
    <h3>Overview</h3>
    <p>${resto.description}</p>
  </div>
`;

const createrestoItemTemplate = (resto) => `
  <div class="resto-item">
    <div class="resto-item__header">
        <img class="resto-item__header__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}" >
        <div class="resto-item__header__rating">
            <p>⭐️<span class="resto-item__header__rating__score">${resto.rating}</span></p>
        </div>
    </div>
    <div class="resto-item__content">
        <h1 id="resto-title" class="resto__title"><a href="${`/#/detail/${resto.id}`}">${resto.name}</a></h1>
        <h2>Kota : ${resto.city}</h2> <br>
        <p>${resto.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createrestoItemTemplate,
  createrestoDetailTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
};
