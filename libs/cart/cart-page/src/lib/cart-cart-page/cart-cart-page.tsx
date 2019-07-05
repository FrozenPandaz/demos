import React from 'react';

import '@nx-example/shared/product/ui';

import { products } from '@nx-example/shared/product/data';
import { Product } from '@nx-example/shared/product/types';
import styled from 'styled-components';

const StyledNxExampleProduct = styled('nx-example-product').attrs(props => {
  return {
    name: props.name,
    image: props.image,
    price: props.price
  };
})`
  width: 200px;
`;

export const CartCartPage = () => {
  return (
    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>
          <nx-example-product
            style={{
              width: '200px'
            }}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        </li>
      ))}
    </ul>
  );
};

export default CartCartPage;
