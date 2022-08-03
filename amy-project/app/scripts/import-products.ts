///https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv

import axios from 'axios';
import { createReadStream, createWriteStream, writeFileSync } from 'fs';
import * as csv from 'csvtojson';
import { join } from 'path';

import * as csvSplitStream from 'csv-split-stream';
import { sync } from 'glob';
import { Product } from '../orm/models/product';
import { PackaingType } from '../orm/models/packaging-type';
import { ProductPackagingType } from '../orm/models/product-packaging-type';

interface IImportData {
  code: string;
  product_name: string;
  packaging: string;
  packaging_tags: string;
  packaging_text: string;
  countries_en: string;
}

Promise.resolve()
  .then(async () => {
    async function downloadLatestFile(downloadPath: string) {
      const { data } = await axios.get(
        'https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv',
        { responseType: 'stream' },
      );

      await csvSplitStream.split(
        data,
        {
          lineLimit: 10000,
        },
        (index: number) =>
          createWriteStream(join(downloadPath, `barcode-data-${index}.csv`)),
      );
    }

    async function loadFilesFromGlob(globPattern: string): Promise<string[]> {
      return await new Promise((resolve) => {
        resolve(sync(globPattern, {}));
      });
    }

    async function getCreatePackagingType(type: string) {
      let packagingType = await PackaingType.findOne({
        where: {
          name: type,
        },
      });

      if (!packagingType) {
        packagingType = await PackaingType.create({
          name: type,
        });
      }

      return packagingType.id;
    }

    async function associatePackagingTypeWithProduct(
      product_id: string,
      packaging_id: string,
    ) {
      await ProductPackagingType.create({
        packagingType_id: packaging_id,
        product_id,
      });
    }

    const downloadFolderPath = join(__dirname, '..', 'import-data');

    // await downloadLatestFile(downloadFolderPath);

    const files = await loadFilesFromGlob(
      join(downloadFolderPath, 'barcode-data-*.csv'),
    );

    for (const file of files) {
      const json: IImportData[] = await csv({ delimiter: '\t' }).fromFile(file);

      for (const j of json) {
        if (j.code.startsWith('200')) continue;

        // only process uk products for now
        if (j.countries_en?.indexOf('United Kingdom') > -1) {
          const { id: product_id } = await Product.create({
            barcode: parseInt(j.code),
            name: j.product_name,
          });

          if (j.packaging) {
            const packagingStrings = j.packaging.split(',');

            for (const packagingString of packagingStrings) {
              if (!packagingString) continue;

              const splits = packagingString.split(':');

              const formattedString =
                splits.length > 1
                  ? splits[1].toLowerCase().trim()
                  : splits[0].toLowerCase().trim();

              const id = await getCreatePackagingType(formattedString);
              await associatePackagingTypeWithProduct(product_id, id);
            }
          }
        }
      }
    }

    const y = 1;
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
