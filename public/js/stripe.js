/* eslint-disable */
console.log("stripe");
// import { showAlert } from "./alerts";
const stripe = Stripe(
  "pk_test_51MSoOzSG8corGcy5bd38d12aXBBI0pPTQMDGXyfS8DzYtD2W3h8SiKRYWY8kjfnioqwFZx7X9leaL6UUpbniLcth000fCaqa1g"
);

const bookplan = async (price, balance, wallet) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${price}/${balance}/${wallet}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    // showAlert("error", err);
  }
};
