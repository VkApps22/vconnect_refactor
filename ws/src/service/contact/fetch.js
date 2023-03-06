import { Contact } from '../../domain/entity';

const compareState = (a, b, state) => {
  if (a.states.includes(state) && !b.states.includes(state)) return -1;

  if (!a.states.includes(state) && b.states.includes(state)) return 1;

  if (a.states.includes(state) && b.states.includes(state)) {
    const diff = a.states.indexOf(state) - b.states.indexOf(state);
    if (diff < 0) return -1;
    if (diff > 0) return 1;
  }

  return 0;
};

const compareCountryState = (a, b, country, state) => {
  if (country === null) return 0;

  if (a.country === country && b.country !== country) return -1;

  if (a.country !== country && b.country === country) return 1;

  if (a.country === country && b.country === country && state !== null)
    return compareState(a, b, state);

  return 0;
};

const compareLanguage = (a, b) =>
  a.language != null ? a.language.localeCompare(b.language) : -1;
const compareCategory = (a, b) =>
  a.categoryKey != null ? a.categoryKey.localeCompare(b.categoryKey) : -1;
const comparePlaceKey = (a, b) =>
  a.placeKey != null ? a.placeKey.localeCompare(b.placeKey) : -1;
const compareName = (a, b) =>
  a.name != null ? a.name.localeCompare(b.name) : -1;

export default async ({ country, state }) => {
  const formattedCountry = country ? country.toLowerCase() : country;
  const formattedState = state ? state.toLowerCase() : state;

  const contacts = await Contact.find({}).lean();

  contacts.sort((a, b) => {
    const languageDiff = compareLanguage(a, b);
    if (languageDiff !== 0) return languageDiff;

    const categoryDiff = compareCategory(a, b);
    if (categoryDiff !== 0) return categoryDiff;

    const countryStateDiff = compareCountryState(
      a,
      b,
      formattedCountry,
      formattedState
    );
    if (countryStateDiff !== 0) return countryStateDiff;

    const placeDiff = comparePlaceKey(a, b);
    if (placeDiff !== 0) return placeDiff;

    return compareName(a, b);
  });

  return contacts;
};
