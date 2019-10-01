import Vue from "vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import Payment from "payment/lib";

export default {
    name: "Card",
    props: {
        cardInfo: {
            type: Object,
            default: function () {
                return {
                    amount: "",
                    fullname: "",
                    cardNumber: "",
                    expiry: {
                        month: "",
                        year: ""
                    },
                    cvv: ""
                };
            }
        }
    },
    data() {
        return {
            card: this.cardInfo,
            cardTypes: ["mastercard", "visa"],
            isError: false,
            errors: {
                cardNumber: "",
                cardExpiryDate: "",
                cardCVV: "",
                cardName: ""
            },
            isPaymentSuccess: false,
            isBackButtonPressed: false,
        };
    },
    created() {
        // set amount value once card instance is created
        this.card.amount = "1000";
    },
    methods: {
        /**
         * Display card type icon on the screen
         * @param {String} type - type of the card
         */
        getImgUrl(type) {
            var images = require.context("../../assets/", false, /\.png$/);
            return images("./" + type + ".png");
        },
        /**
         * if the errorString value exists, then input state is invalid
         * @param {String} errorString - error string
         */
        getValidityState(errorString) {
            return errorString && errorString.length > 0 ? false : null;
        },
        /**
         * Submit the credit card form
         */
        onSubmit() {
            this.validateForm(this.card);
            if (!this.isError) {
                this.isPaymentSuccess = true;
            } else {
                this.isPaymentSuccess = false;
            }
        },
        /**
         * Validates user provided values using a library called 'payment'
         * https://www.npmjs.com/package/payment
         * @param {Object} card - card object containing input values
         */
        validateForm(card) {
            const isValidNumber = Payment.fns.validateCardNumber(card.cardNumber);
            const isValidCVC = Payment.fns.validateCardCVC(card.cvc);
            const isValidExpiry = Payment.fns.validateCardExpiry(
                card.expiry.month,
                card.expiry.year
            );

            const isValidName = card.fullname.length > 0 && /^[a-zA-Z ]*$/.test(card.fullname) ? true : false;

            this.handleErrors(isValidNumber, isValidCVC, isValidExpiry, isValidName);
        },
        /**
         * Generate error messages based on provided input values
         * @param {Boolean} isValidNumber - validity result for card number
         * @param {Boolean} isValidCVC - validity result for card cvc
         * @param {Boolean} isValidExpiry - validity result for card expiration
         */
        handleErrors(isValidNumber, isValidCVC, isValidExpiry, isValidName) {
            this.errors = {
                cardNumber: "",
                expiryDate: "",
                cardCVC: "",
                cardName: ""
            };
            this.isError = false;
            if (!isValidNumber) {
                this.errors.cardNumber = "Please enter valid card number";
                this.isError = true;
            }
            if (!isValidCVC) {
                this.errors.cardCVC = "Please enter a valid CVC number";
                this.isError = true;
            }
            if (!isValidExpiry) {
                this.errors.expiryDate = "Please enter a valid expiry date";
                this.isError = true;
            }
            if (!isValidName) {
                this.errors.cardName = "Please enter a valid name";
                this.isError = true;
            }
        },
        /**
         * update backbutton variable to true when pressed
         */
        updateBackButtonToTrue: function () {
            this.isBackButtonPressed = true;
        },

        /**
         * update backbutton to false variable when other button pressed
         */
        updateBackButtonToFalse: function () {
            this.isBackButtonPressed = false;
        }
    },
    directives: {
        // allows only numeric values and spaces in an input field
        numericOnly: {
            bind(el) {
                el.addEventListener("keyup", () => {
                    let regex = /^[0-9 ]*$/;
                    if (!regex.test(el.value)) {
                        el.value = el.value.replace(/\D/g, '');
                    }
                });
            }
        },
        // allow only alphbet and spaces values in an input field
        alphabetsOnly: {
            bind(el) {
                el.addEventListener("keyup", () => {
                    let regex = /^[a-zA-Z ]*$/g;
                    if (!regex.test(el.value)) {
                        el.value = el.value.replace(/[^A-Za-z]/g, '');
                    }
                });
            }
        }
    },
    computed: {
        // https://www.npmjs.com/package/payment#paymentfnscardtypenumber
        cardType: function () {
            const isValidCardType = this.cardTypes.includes(
                Payment.fns.cardType(this.card.cardNumber)
            );
            if (isValidCardType) {
                return Payment.fns.cardType(this.card.cardNumber);
            } else {
                return "mastercard"
            }
        },
        // Format card number with space after every 4 digit
        cardNumberFormatting: function () {
            if (this.card.cardNumber && !this.isBackButtonPressed) {
                const cardNumberLength = this.card.cardNumber.replace(/\s/g, "").length;

                if (cardNumberLength > 0 && cardNumberLength < 16 && cardNumberLength % 4 === 0) {
                    this.card.cardNumber += " ";
                }
            }
        }
    }
};