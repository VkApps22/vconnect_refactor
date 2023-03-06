import fetchProducts from '../fetch-products';
import { mongo } from '../../../config';
import { migrate, scan } from '../../../migration';

jest.mock('moment', () => () =>
  jest.requireActual('moment')('2020-01-01T00:00:00.000Z')
);

describe('fetchModelProducts', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    await scan();
    await migrate();

    const products = await fetchProducts();
    expect(products.length).toBe(11);

    const expectProduct = (product, nameKey, itemsLength) => {
      expect(product.nameKey).toBe(nameKey);
      expect(product.items.length).toBe(itemsLength);
    };
    expectProduct(products[0], 'backstop', 2);
    expectProduct(products[1], 'electrohydraulic_brake', 2);
    expectProduct(products[2], 'electromagnetic_brake', 4);
    expectProduct(products[3], 'flexible_coupling', 4);
    expectProduct(products[4], 'fluid_coupling', 2);
    expectProduct(products[5], 'hydraulic_brake', 4);
    expectProduct(products[6], 'hydraulic_unit', 1);
    expectProduct(products[7], 'pneumatic_brake', 4);
    expectProduct(products[8], 'power_supply', 1);
    expectProduct(products[9], 'rail_clamp', 1);
    expectProduct(products[10], 'rigid_coupling', 2);
  });

  it('empty', async () => {
    const products = await fetchProducts();
    expect(products).toStrictEqual([]);
  });
});
