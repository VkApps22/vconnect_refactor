import fetchContactService from '../fetch';
import { mongo } from '../../../config';
import scan from '../../../migration/scan';
import migrate from '../../../migration/migrate';

describe('fetchContact', () => {
  beforeAll(async () => {
    await mongo.connect();
    await scan();
    await migrate();
  });
  afterAll(() => mongo.disconnect());

  const getTestSignature = (contacts) =>
    contacts.map(
      (contact) =>
        `${contact.language}_${contact.categoryKey}_${contact.placeKey}_${contact.name}`
    );

  it('happy day', async () => {
    const contacts = await fetchContactService({});

    expect(contacts.length).toBe(15);
    expect(getTestSignature(contacts)).toMatchSnapshot();
  });

  it('country is germany and state is unknown', async () => {
    const contacts = await fetchContactService({
      country: 'germany',
    });

    expect(contacts.length).toBe(15);
    expect(getTestSignature(contacts)).toMatchSnapshot();
  });

  it('country is brazil and state is acre', async () => {
    const contacts = await fetchContactService({
      country: 'brazil',
      state: 'ac',
    });

    expect(contacts.length).toBe(15);
    expect(getTestSignature(contacts)).toMatchSnapshot();
  });

  it('country is brazil and state is sp', async () => {
    const contacts = await fetchContactService({
      country: 'brazil',
      state: 'sp',
    });

    expect(contacts.length).toBe(15);
    expect(getTestSignature(contacts)).toMatchSnapshot();
  });

  it('country is brazil and state is sc', async () => {
    const contacts = await fetchContactService({
      country: 'brazil',
      state: 'sc',
    });

    expect(contacts.length).toBe(15);
    expect(getTestSignature(contacts)).toMatchSnapshot();
  });
});
