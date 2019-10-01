import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Card from "@/components/card/card.vue";

let cardData = {};

beforeEach(() => {
  cardData = {
    amount: "100",
    cardType: "visa",
    fullname: "gurpreetsingh",
    cardNumber: "4242424242424242",
    expiry: {
      month: "10",
      year: "2021"
    },
    cvc: "424"
  };
});

describe("Card.vue validation", () => {
  const wrapper = shallowMount(Card);
  it("payment should be successful if no errors", () => {
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.onSubmit();
    expect(wrapper.vm.isError).to.equal(false);
    expect(wrapper.vm.isPaymentSuccess).to.equal(true);
  });
  it("should validate card number", () => {
    // correct card number
    cardData.cardNumber = "4242424242424242";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardNumber).to.equal("");

    // incorrect card number
    cardData.cardNumber = "";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardNumber).to.equal("Please enter valid card number");
  });
  it("should validate card cvc", () => {
    // correct card cvc value
    cardData.cvc = "424";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardCVC).to.equal("");

    // incorrect card cvc value
    cardData.cvc = "4*2";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardCVC).to.equal("Please enter a valid CVC number");
  });
  it("should validate card expiry", () => {
    // correct card expiry date
    cardData.expiry.month = "12";
    cardData.expiry.year = "2019";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.expiryDate).to.equal("");

    // incorrect value for expiry month
    cardData.expiry.month = "21";
    cardData.expiry.year = "2019";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.expiryDate).to.equal("Please enter a valid expiry date");

    // incorrect value for expiry year
    cardData.expiry.month = "08";
    cardData.expiry.year = "2012";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.expiryDate).to.equal("Please enter a valid expiry date");
  });
  it("should validate user name on the card", () => {
    // correct card cvc
    cardData.fullname = "gurpreetsingh";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardName).to.equal("");

    // empty name value
    cardData.fullname = "";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardName).to.equal("Please enter a valid name");
  });
});