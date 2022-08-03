import * as Repository from './repository';

export async function getCountyByPostcode(postcode: string) {
  const countyPostcode = await Repository.getCountyByPostcode(
    postcode.toUpperCase(),
  );

  return {
    name: countyPostcode.county.name,
    id: countyPostcode.county.id,
  };
}
