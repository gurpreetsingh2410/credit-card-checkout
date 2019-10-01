<template>
  <div class="form-container">
    <b-alert variant="success" :show="isPaymentSuccess">Payment Successfully Saved</b-alert>
    <b-form @submit.prevent="onSubmit" name="creditCardForm">
      <div class="left-container">
        <b-form-group
          label="CARD NUMBER"
          id="cardNumber"
          :invalid-feedback="errors.cardNumber"
          :state="getValidityState(errors.cardNumber)"
        >
          <b-row>
            <b-col cols="8">
              <b-form-input
                @keydown.delete="updateBackButtonToTrue()"
                @keypress="updateBackButtonToFalse()"
                type="text"
                maxlength="19"
                id="cardNumber"
                v-model="card.cardNumber"
                v-numericOnly
                required
                autocomplete="off"
                placeholder="**** **** **** ****"
                :state="cardNumberFormatting"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-form-group>
        <b-row>
          <b-col cols="6">
            <b-form-group label="NAME">
              <b-form-input
                type="text"
                maxlength="20"
                v-alphabetsOnly
                v-model="card.fullname"
                required
                autocomplete="off"
                :state="getValidityState(errors.cardName)"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="MONTH"
              :invalid-feedback="errors.expiryDate"
              :state="getValidityState(errors.expiryDate)"
            >
              <b-form-input
                type="text"
                id="expiryMonth"
                v-numericOnly
                maxlength="2"
                v-model="card.expiry.month"
                required
                autocomplete="off"
                :state="getValidityState(errors.expiryDate)"
                placeholder="00"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="YEAR" :state="getValidityState(errors.expiryDate)">
              <b-form-input
                type="text"
                id="expiryYear"
                v-numericOnly
                maxlength="4"
                v-model="card.expiry.year"
                required
                autocomplete="off"
                :state="getValidityState(errors.expiryDate)"
                placeholder="0000"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col></b-col>
          <b-col>
            <b-form-group
              label="CVC"
              :invalid-feedback="errors.cardCVC"
              :state="getValidityState(errors.cardCVC)"
            >
              <b-form-input
                type="text"
                id="cvc"
                v-numericOnly
                maxlength="3"
                v-model="card.cvc"
                required
                autocomplete="off"
                :state="getValidityState(errors.cardCVC)"
                placeholder="000"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <div class="right-container">
        <div>
          <img :src="getImgUrl(cardType)" alt="card type" />
        </div>
      </div>
      <div class="card-footer">
        <b-row>
          <b-col>
            <div class="total-amount-info">
              <span>TOTAL:</span>
              <span class="amount">{{ card.amount + "$" }}</span>
            </div>
          </b-col>
          <b-col cols="4"></b-col>
          <b-col>
            <b-button
              class="button-paynow"
              :disabled="isPaymentSuccess"
              type="submit"
              variant="primary"
            >PAY NOW</b-button>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </div>
</template>

<script src="./card.js"></script>
<style src="./card.scss" lang="scss" scoped></style>