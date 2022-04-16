import { gql } from "@apollo/client";

export const getCategoryName = () => {
  return gql`
    query getCategoryName {
      categories {
        name
      }
    }
  `;
};

export const getProducts = (category) => {
  return gql`
    query GetTechProductInfo {
      category(input: { title: "${category}" }) {
        products {
          id
          name
          category
          gallery
          inStock
          brand

          attributes {
            id
            name
            type

            items {
              displayValue
              value
              id
            }
          }

          prices {
            currency {
              symbol
            }
            amount
          }
        }
      }
    }
  `;
};

export const getCurrency = () => {
  return gql`
    query GetCurrencies {
      currencies {
        symbol
        label
      }
    }
  `;
};

export const getProductDetails = (productId) => {
  return gql`
    query GetProductDetails {
      product(id: "${productId}") {
        id
        name
        description
        gallery
        inStock
        brand

        attributes {
          id
          name
          type

          items {
            displayValue
            value
            id
          }
        }

        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  `;
};
