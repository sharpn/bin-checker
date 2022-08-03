// import BarcodeReaderComponent from "react-webcam-barcode-scanner";

import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Scanner } from "../components/scanner";

const DynamicComponentWithNoSSR = dynamic(
  () => import("react-webcam-barcode-scanner"),
  { ssr: false }
);

const Index = () => {
  const [barcode, setBarcode] = useState(null);
  const [scanner, setScanner] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<{ name: string; id: string }[]>([]);

  const handleScan = (result) => {
    console.log(result?.codeResult?.code);
    if (result?.codeResult?.code) {
      setBarcode(result.codeResult.code);
      // setScanner(false);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    async function getProductData(barcode: string) {
      const { data } = await axios.get<{ name: string; id: string }[]>(
        `/api/products/${barcode}`
      );
      setProducts(data);
    }

    if (barcode) {
      getProductData(barcode);
    }
  }, [barcode]);

  const renderCamera = () => {
    if (scanner) {
      return (
        <DynamicComponentWithNoSSR
          onUpdate={handleScan}
          width={500}
          height={500}
        />
      );
    } else {
      return (
        <>
          <p>CURRENT BARCODE: {barcode}</p>
          <p>
            <button onClick={() => setScanner(true)}>Scan another</button>
          </p>
        </>
      );
    }
  };

  return (
    <>
      {/* {renderCamera()}
      <br />
      <br />
      {products?.map((product) => {
        return <div key={product.id}>{product.name}</div>;
      })} */}

      <Scanner onDetected={(result) => handleScan(result)} />
    </>
  );
};

export default Index;
