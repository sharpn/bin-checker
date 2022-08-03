import { County } from '../orm/models/county';
import { Postcode } from '../orm/models/postcode';

import * as csv from 'csvtojson';
import { join } from 'path';
import axios from 'axios';
import { writeFileSync } from 'fs';

interface IImportData {
  'County Code': string;
  'Country Name': string;
  'Local Authority Code': string;
  'Local Authority Name': string;
  'Postcode 1': string;
}

Promise.resolve()
  .then(async () => {
    async function downloadLatestFile(downloadPath: string) {
      const { data } = await axios.get(
        `https://opendata.camden.gov.uk/api/views/g3bz-7ur8/rows.csv?accessType=DOWNLOAD`,
        { responseType: 'blob' },
      );

      writeFileSync(downloadPath, data);
    }

    const downloadPath = join(__dirname, '..', 'import-data', 'data.csv');
    await downloadLatestFile(downloadPath);

    const json: IImportData[] = await csv().fromFile(downloadPath);

    async function createCountyAuthorityIfNotExist(
      authority_id: string,
      authorityName: string,
    ) {
      const exists = await County.findOne({
        where: {
          id: authority_id,
        },
      });

      if (!exists) {
        await County.create({
          id: authority_id,
          name: authorityName,
        });
      }
    }

    async function createPostCodeEntry(
      postcodeId: string,
      authorityId: string,
    ) {
      const postcode = await Postcode.findOne({
        where: {
          id: postcodeId,
        },
      });

      if (!postcode) {
        await Postcode.create({
          id: postcodeId,
          county_id: authorityId,
        });
        return;
      }

      postcode.county_id = authorityId;
      await postcode.save();
    }

    for (let j = 0; j < json.length; j++) {
      const data = json[j];
      const postcode = data['Postcode 1'].replace(/\s/g, '');

      console.log(`${j} of ${json.length}`);
      await createCountyAuthorityIfNotExist(
        data['Local Authority Code'],
        data['Local Authority Name'],
      );
      await createPostCodeEntry(postcode, data['Local Authority Code']);
    }

    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
