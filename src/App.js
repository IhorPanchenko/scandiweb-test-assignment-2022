import React from "react";
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from "./components/shared/Header/Header";
import { Category } from "./pages/Category/Category";
import ProductDetail from "./components/shared/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";

export default class App extends React.Component {
  render() {
    const ProductDetailWrapper = (props) => {
      const params = useParams();
      return <ProductDetail {...{ ...props, match: { params } }} />;
    };

    return (
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Category category="all" />} />
            <Route path="/tech" element={<Category category="tech" />} />
            <Route path="/clothes" element={<Category category="clothes" />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailWrapper />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
