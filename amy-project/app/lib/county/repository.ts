import { Postcode, IPostcode } from '../../orm/models/postcode';
import { PostcodeNotFound } from '../errors/postcode-not-found-error';

export async function getCountyByPostcode(
  postcode: string,
): Promise<IPostcode> {
  const data = await Postcode.findOne({
    where: {
      id: postcode,
    },
    include: [
      {
        association: Postcode.associations.county,
      },
    ],
  });

  if (!data) {
    throw new PostcodeNotFound(postcode);
  }

  return data.toJSON();
}
