import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { client } from "../../../index";
import { selectCurrency } from "../../../redux/actions";
import { getCurrency } from "../../../helpers/gqlQueries";
import { GlobalSvgSelector } from "../../../assets/images/GlobalSvgSelector";
import s from "./CurrencySelector.module.scss";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      currencies: [],
    };
  }

  getData() {
    client
      .query({
        query: getCurrency(),
      })
      .then(({ loading, error, data }) => {
        this.setState({
          currencies: data.currencies,
          loading,
          error,
          selected: data.currencies.find(
            (currency) => currency.symbol === this.props.currency
          ),
        });
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { selected, currencies } = this.state;
    const { isOpen, onCurrencyClicked } = this.props;

    return (
      <div className={s.dropdown}>
        <div
          className={`${s.dropdownBtn} ${isOpen ? s.svgTransform : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onCurrencyClicked();
          }}
        >
          {selected.symbol}
          <GlobalSvgSelector id="currency-selector" />
        </div>

        {isOpen && (
          <div className={s.dropdownContent}>
            {currencies.map((option, index) => (
              <div
                key={option.symbol + index}
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ selected: option });
                  onCurrencyClicked();
                  this.props.selectCurrency(option.symbol);
                }}
                className={s.dropdownItem}
              >
                {option.symbol} {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

CurrencySelector.propTypes = {
  currency: PropTypes.string,
  isOpen: PropTypes.bool,
  onCurrencyClicked: PropTypes.func,
  selectCurrency: PropTypes.func,
};

const mapDispatchToProps = {
  selectCurrency,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencies.symbol,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
