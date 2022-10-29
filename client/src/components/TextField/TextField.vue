<template>
  <v-text-field
    dark
    class="text-field-custom"
    color="darkYellow"
    autocomplete="off"
    :validate-on-blur="blurValidate"
    :rules="rules"
    :required="required"
    :name="name"
    :type="type"
    :label="label"
    :value="value"
    :conter="counter"
    :maxlength="maxlength"
    @input="onInput"
  ></v-text-field>
</template>

<script>
export default {
  props: [
    "label",
    "type",
    "name",
    "value",
    "required",
    "rules",
    "counter",
    "maxlength",
    "blurValidate",
  ],
  methods: {
    onInput(value) {
      this.$emit("handle-field", this._props.name, value);
    },
  },
};
</script>

<style scoped lang='scss'>
@import "@/styles/_variables.scss";

.v-text-field {
  font-size: 30px;
  margin: 10px 0;
  ::v-deep .v-label {
    color: $darkYellow;
    font-size: 25px;
    width: 100%;
  }

  ::v-deep .v-label.error--text {
    font-size: 25px !important;
  }

  ::v-deep .v-input__slot {
    &:before {
      border-color: $darkYellow !important;
    }
  }

  ::v-deep .error--text {
    margin-top: 3px;
    font-size: 20px;
  }
}

.v-text-field.error--text {
  ::v-deep .v-input__slot {
    &:before {
      border-color: $error !important;
    }
  }
}
</style>