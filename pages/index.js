import { HeroBanner, Product, Footer, FooterBanner } from "../components/index";
import { client, urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";
export default function Home({ products, bannerData }) {
  const { setCartItems, setTotalPrice, settotalQuantities, setQty } =
    useStateContext();
  // useEffect(() => {
  //   const cItem = JSON.parse(localStorage.getItem("cartItems"));
  //   const tprice = JSON.parse(localStorage.getItem("totalPrice"));
  //   const tqty = JSON.parse(localStorage.getItem("totalQuantities"));
  //   const qt = JSON.parse(localStorage.getItem("qty"));
  //   if (cItem) {
  //     setCartItems(cItem);
  //     setTotalPrice(tprice);
  //     settotalQuantities(tqty);
  //     setQty(qt);
  //   }
  // }, []);
  return (
    <div>
      <>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

        <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </>
    </div>
  );
}
export async function getServerSideProps(context) {
  const query = '*[_type == "product" ]';
  const products = await client.fetch(query);
  const bannerquery = '*[_type == "banner" ]';
  const bannerData = await client.fetch(bannerquery);
  return {
    props: { products, bannerData }, // will be passed to the page component as props
  };
}
