import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putResto({ id: 'rqdv5juczeskfw1e867' });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'rqdv5juczeskfw1e867' });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]'),
    ).toBeTruthy();
  });

  it('should not display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'rqdv5juczeskfw1e867' });

    expect(
      document.querySelector('[aria-label="like this restaurant"]'),
    ).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'rqdv5juczeskfw1e867' });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 'rqdv5juczeskfw1e867' });

    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));
    const allResto = await FavoriteRestoIdb.getAllRestos();

    expect(allResto).toEqual([]);
  });
});
