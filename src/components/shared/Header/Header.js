import React from "react";
import { NavLink } from "react-router-dom";
import { GlobalSvgSelector } from "../../../assets/images/GlobalSvgSelector";
import MiniCart from "../MiniCart/MiniCart";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import { getCategoryName } from "../../../helpers/gqlQueries";
import { client } from "../../../index";
import s from "./Header.module.scss";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      isCurrencyOpen: false,
      categories: [],
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.onCloseHeaderDropdown.bind(this));

    client
      .query({
        query: getCategoryName(),
      })
      .then(({ data }) => {
        this.setState({
          categories: data.categories,
        });
      });
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.onCloseHeaderDropdown.bind(this)
    );
  }

  onCloseHeaderDropdown(e) {
    if (!this.state.isCurrencyOpen && !this.state.isCartOpen) return;

    if (
      e.target.classList.contains("drop-down-cart") ||
      e.target.classList.contains("deleteBtn") ||
      e.target.closest(".drop-down-cart")
    ) {
      return;
    }
    this.onClose();
  }

  onCartClicked = () => {
    this.setState({
      isCartOpen: !this.state.isCartOpen,
      isCurrencyOpen: false,
    });

    document.body.style.overflow = this.state.isCartOpen ? "auto" : "hidden";
  };

  onCurrencyClicked = () => {
    this.setState({
      isCurrencyOpen: !this.state.isCurrencyOpen,
      isCartOpen: false,
    });
  };

  onClose = () => {
    this.setState({
      isCurrencyOpen: false,
      isCartOpen: false,
    });

    document.body.style.overflow = "auto";
  };

  render() {
    return (
      <header>
        <div className={s.logo}>
          <GlobalSvgSelector id="header-logo" />
        </div>

        <div className={s.wrapper}>
          <nav>
            {this.state.categories.map((category) => (
              <NavLink
                to={category.name === "all" ? "/" : category.name}
                className={({ isActive }) => (isActive ? s.active : null)}
                key={"navCategory" + category.name}
              >
                {category.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={s.wrapper}>
          <div className={s.currency}>
            <CurrencySelector
              isOpen={this.state.isCurrencyOpen}
              onCurrencyClicked={this.onCurrencyClicked}
              onClose={this.onClose}
            />
          </div>

          <div className={s.cart}>
            <MiniCart
              isOpen={this.state.isCartOpen}
              onCartClicked={this.onCartClicked}
            />
          </div>
        </div>
      </header>
    );
  }
}
