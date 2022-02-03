import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions";
import { client } from "../../index";
import { getProductDetails } from "../../helpers/gqlQueries";
import { getCurrentPrice } from "../../helpers/pricesAndQuantity";
import ProductDetailsSlider from "../ImageSliders/ProductDetailsSlider/ProductDetailsSlider";
import "./ProductDetail.scss";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: true,
      error: false,
      isActive: false,
      price: {},
    };
  }

  getData() {
    client
      .query({
        query: getProductDetails(this.props.match.params.productId),
      })
      .then(({ loading, error, data }) => {
        this.setState({
          product: data.product,
          loading,
          error,
        });
        this.getPrice();
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currencySymbol !== this.props.currencySymbol) {
      this.getPrice();
    }
  }

  getPrice() {
    this.setState({
      price: getCurrentPrice(
        this.props.currencySymbol,
        this.state.product.prices
      ),
    });
  }

  addToCartClick() {
    this.props.addToCart(this.state.product);
  }

  handleToggle() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    const { product, isActive, price } = this.state;

    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Error: </p>;

    return (
      <div className="productDetails">
        {/* Product Images Block */}
        <div className="galleryWrapper">
          <ProductDetailsSlider gallery={product.gallery} />
        </div>

        {/* Product Details Block */}
        <div className="prodDetailsWrapper">
          <div className="prodNameWrapper">
            {!product.inStock && (
              <span className="outOfStock">Out of stock</span>
            )}
            <span className="prodName">{product.name}</span>
            <span className="prodBrand">{product.brand}</span>
          </div>

          <div className="attributes">
            {product.attributes.map((attr) => (
              <div className="attWrapper" key={attr.id}>
                <div className="attName">{attr.name}:</div>
                {/* Attribute Radio Buttons  */}
                <div className="radioBtns">
                  {/* getting each product attritube (size, color) */}
                  {attr.items.map((item, index) => {
                    if (attr.id === "Color") {
                      return (
                        <div
                          className="radioBtnWrapper"
                          key={attr.id.replace(" ", "") + item.id}
                        >
                          <input
                            id={attr.id.replace(" ", "") + item.id}
                            type="radio"
                            name={attr.id.replace(" ", "")}
                            value={item.value}
                            defaultChecked={index === 0}
                          ></input>
                          <label
                            className="coloredLabel"
                            htmlFor={attr.id.replace(" ", "") + item.id}
                            style={{ background: item.value }}
                          ></label>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="radioBtnWrapper"
                          key={attr.id.replace(" ", "") + item.id}
                        >
                          <input
                            id={attr.id.replace(" ", "") + item.id}
                            type="radio"
                            name={attr.id.replace(" ", "")}
                            value={item.value}
                            defaultChecked={index === 0}
                          ></input>
                          <label htmlFor={attr.id.replace(" ", "") + item.id}>
                            {item.value}
                          </label>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="priceWrapper">
            <span>Price:</span>
            <div className="price">
              <span>{price?.currency?.symbol}</span>
              <span>{price?.amount}</span>
            </div>
          </div>

          <button
            className={`${!product.inStock ? "inactive" : ""}`}
            type="button"
            onClick={this.addToCartClick.bind(this)}
          >
            Add to cart
          </button>

          <div className={`descriptionWrapper ${isActive ? "showDesc" : ""}`}>
            {/* parsing product description as a html */}
            <div
              className={`description ${
                !isActive && product.description.length > 200
                  ? "shadowBottom"
                  : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            ></div>

            {product.description.length > 200 && (
              <div className="showMore" onClick={this.handleToggle.bind(this)}>
                {isActive ? "Show less" : "Show more..."}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// const ProductDetail = ({ addToCart }) => {
//   const { productId } = useParams();
//   const [isActive, setActive] = useState(false);

//   const { loading, error, data } = useQuery(gql`
//   query GetProductDetailedInfo {
//     product(id: "${productId}") {
//       name
//       description
//       gallery
//       brand
//       inStock

//       attributes {
// 				id
//         name
//         type

//         items {
//           displayValue
//           value
//           id
//         }
//       }

//       prices {
//         currency {
//           symbol
//         }
//         amount
//       }
//     }
//   }
// `);

//   const handleToggle = () => {
//     setActive(!isActive);
//   };

//   const addToCartClick = (e) => {
//     addToCart(data.product);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :</p>;

//   return (
//     <div className="productDetails">
//       {/* Product Images Block */}
//       <div className="galleryWrapper">
//         <ProductDetailsSlider gallery={data.product.gallery} />
//       </div>

//       {/* Product Details Block */}
//       <div className="prodDetailsWrapper">
//         <div className="prodNameWrapper">
//           {!data.product.inStock && (<span className="outOfStock">Out of stock</span>)}
//           <span className="prodName">{data.product.name}</span>
//           <span className="prodBrand">{data.product.brand}</span>
//         </div>

//         <div className="attributes">
//           {data.product.attributes.map((att) => (
//             <div className="attWrapper">
//               <div className="attName">{att.name}:</div>
//               {/* Attribute Radio Buttons  */}
//               <div className="radioBtns">
//                 {/* getting each product attritube (size, color) */}
//                 {att.items.map((item) => {
//                   if (att.id === "Color") {
//                     return (
//                       <div className="radioBtnWrapper">
//                         <input
//                           id={att.id.replace(" ", "") + item.id}
//                           type="radio"
//                           name={att.id.replace(" ", "")}
//                           value={item.value}
//                         ></input>
//                         <label
//                           className="coloredLabel"
//                           htmlFor={att.id.replace(" ", "") + item.id}
//                           style={{ background: item.value }}
//                         ></label>
//                       </div>
//                     );
//                   } else {
//                     return (
//                       <div className="radioBtnWrapper">
//                         <input
//                           id={att.id.replace(" ", "") + item.id}
//                           type="radio"
//                           name={att.id.replace(" ", "")}
//                           value={item.value}
//                         ></input>
//                         <label htmlFor={att.id.replace(" ", "") + item.id}>
//                           {item.value}
//                         </label>
//                       </div>
//                     );
//                   }
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="priceWrapper">
//           <span>Price:</span>
//           <div className="price">
//             <span>{data.product.prices[0].currency.symbol}</span>
//             <span>{data.product.prices[0].amount}</span>
//           </div>
//         </div>

//         <button className={`${!data.product.inStock ? "inactive" : ""}`} type="button" onClick={addToCartClick}>
//           Add to cart
//         </button>

//         <div className={`descriptionWrapper ${isActive ? "showDesc" : ""}`}>
//           {/* parsing product description as a html */}
//           <div
//             className={`description ${
//               !isActive && data.product.description.length > 200
//                 ? "shadowBottom"
//                 : ""
//             }`}
//             dangerouslySetInnerHTML={{ __html: data.product.description }}
//           ></div>

//           {data.product.description.length > 200 && (
//             <div className="showMore" onClick={handleToggle}>
//               {isActive ? "Show less" : "Show more..."}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const mapStateToProps = (state) => {
  return {
    currencySymbol: state.currencies.symbol,
  };
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
