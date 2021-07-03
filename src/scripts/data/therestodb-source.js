import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class TheRestoDbSource {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async sendReview(data) {
    const response = await fetch(API_ENDPOINT.ADDREVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.AUTH_KEY,
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}

export default TheRestoDbSource;
