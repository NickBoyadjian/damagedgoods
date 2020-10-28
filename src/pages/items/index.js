import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  useCheckoutEffect,
  createCheckout,
  checkoutLineItemsAdd,
  checkoutLineItemsUpdate,
  checkoutLineItemsRemove,
  checkoutCustomerAssociate,
} from '../../helpers/checkout';
import Cart from '../../components/cart';
import VoronoiTreeMap from '../../components/voronoiTreeMap';
import './style.scss';

const GetAllItems = gql`
  query GetAllItems {
    collectionByHandle(handle: "In-Stock") {
      products(first: 250) {
        edges {
          cursor
          node {
            id
            title
            productType
            description
            tags
            images(first: 10) {
              edges {
                node {
                  id
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Index() {
  const { loading: shopLoading, error: shopError, data: shopData } = useQuery(GetAllItems);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isNewCustomer, setNewCustomer] = useState(false);
  const [isCustomerAuthOpen, setCustomerAuthOpen] = useState(false);
  const [showAccountVerificationMessage, setAccountVerificationMessage] = useState(false);
  const [checkout, setCheckout] = useState({ lineItems: { edges: [] } });
  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  const [createCheckoutMutation,
    {
      data: createCheckoutData,
      loading: createCheckoutLoading,
      error: createCheckoutError
    }] = useMutation(createCheckout);

  const [lineItemAddMutation,
    {
      data: lineItemAddData,
      loading: lineItemAddLoading,
      error: lineItemAddError
    }] = useMutation(checkoutLineItemsAdd);

  const [lineItemUpdateMutation,
    {
      data: lineItemUpdateData,
      loading: lineItemUpdateLoading,
      error: lineItemUpdateError
    }] = useMutation(checkoutLineItemsUpdate);

  const [lineItemRemoveMutation,
    {
      data: lineItemRemoveData,
      loading: lineItemRemoveLoading,
      error: lineItemRemoveError
    }] = useMutation(checkoutLineItemsRemove);

  const [customerAssociateMutation,
    {
      data: customerAssociateData,
      loading: customerAssociateLoading,
      error: customerAssociateError
    }] = useMutation(checkoutCustomerAssociate);


  useEffect(() => {
    const variables = { input: {} };
    createCheckoutMutation({ variables }).then(
      res => {
        console.log(res);
      },
      err => {
        console.log('create checkout error', err);
      }
    );

  }, []);

  useCheckoutEffect(createCheckoutData, 'checkoutCreate', setCheckout);
  useCheckoutEffect(lineItemAddData, 'checkoutLineItemsAdd', setCheckout);
  useCheckoutEffect(lineItemUpdateData, 'checkoutLineItemsUpdate', setCheckout);
  useCheckoutEffect(lineItemRemoveData, 'checkoutLineItemsRemove', setCheckout);
  useCheckoutEffect(customerAssociateData, 'checkoutCustomerAssociate', setCheckout);

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const openCustomerAuth = (event) => {
    if (event.target.getAttribute('data-customer-type') === "new-customer") {
      setNewCustomer(true);
      setCustomerAuthOpen(true);
    } else {
      setNewCustomer(false);
      setCustomerAuthOpen(true);
    }
  };

  const accountVerificationMessage = () => {
    setAccountVerificationMessage(true)
    setTimeout(() => {
      setAccountVerificationMessage(false)
    }, 5000);
  };

  const closeCustomerAuth = () => {
    setCustomerAuthOpen(false);
  };

  const addVariantToCart = (variantId, quantity) => {
    const variables = { checkoutId: checkout.id, lineItems: [{ variantId, quantity: parseInt(quantity, 10) }] };
    // TODO replace for each mutation in the checkout thingy. can we export them from there???
    // create your own custom hook???

    lineItemAddMutation({ variables }).then(res => {
      setCartOpen(true);
    });
  };

  const updateLineItemInCart = (lineItemId, quantity) => {
    const variables = { checkoutId: checkout.id, lineItems: [{ id: lineItemId, quantity: parseInt(quantity, 10) }] };
    lineItemUpdateMutation({ variables });
  };

  const removeLineItemInCart = (lineItemId) => {
    const variables = { checkoutId: checkout.id, lineItemIds: [lineItemId] };
    lineItemRemoveMutation({ variables });
  };

  const associateCustomerCheckout = (customerAccessToken) => {

    const variables = { checkoutId: checkout.id, customerAccessToken: customerAccessToken };
    customerAssociateMutation({ variables }).then((res) => {
      setCustomerAuthOpen(false);
    });
  };

  if (shopLoading)
    return <>Loading...</>

  if (shopError)
    return <>Error fetching data</>

  console.log(shopData)
  return (
    <>
      <VoronoiTreeMap items={shopData.collectionByHandle.products.edges.map(obj => obj.node)} />
      <div className="App__view-cart-wrapper">
        <button className="App__view-cart" onClick={() => setCartOpen(!isCartOpen)}>Cart</button>
      </div>
      <Cart
        removeLineItemInCart={removeLineItemInCart}
        updateLineItemInCart={updateLineItemInCart}
        checkout={checkout}
        isCartOpen={isCartOpen}
        handleCartClose={handleCartClose}
        customerAccessToken={customerAccessToken}
      />
    </>
  )
}

