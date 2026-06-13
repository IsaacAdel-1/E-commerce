import "../ShopPage/Shop.css";
import "./RecommendedProducts.css";
import CARD from "../../components/Card/Card";

const RecommendedProducts = ({ products }) => {
    return (
        <>
            <div className="Recommended" id="Recommended">
                <div className="RecommendedHeader">
                    <h2>You May Also Like</h2>
                </div>
                <div className="featuredProducts showingProducts RecommendedProducts">
                    {products.length > 0
                        ? products.slice(0, 4).map((product) => (
                            <CARD key={product.id} product={product} />
                        ))
                        : null}
                </div>
            </div>
        </>
    );
};

export default RecommendedProducts;
