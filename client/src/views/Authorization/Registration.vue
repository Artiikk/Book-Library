<template>
  <div>
    <Header />
    <div class="wrapper">
      <v-container>
        <div class="auth-content">
          <h1>Registration</h1>

          <form @submit.prevent="onSubmit" lazy-validation>
            <TextField
              label="E-mail"
              type="search"
              name="email"
              required
              blurValidate
              :rules="rules.email"
              :value="email"
              @handle-field="handleField"
            />
            <TextField
              label="Your name"
              type="search"
              name="name"
              maxlength="20"
              required
              blurValidate
              :rules="rules.required"
              :value="name"
              @handle-field="handleField"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              counter
              required
              :value="password"
              :rules="rules.password"
              @handle-field="handleField"
            />
            <TextField
              label="Confirm password"
              type="password"
              name="passwordConfirm"
              counter
              required
              :value="passwordConfirm"
              :rules="rules.passwordConfirm"
              @handle-field="handleField"
            />

            <v-btn
              class="button"
              elevation="2"
              type="submit"
              x-large
              :disabled="isDisabled"
            >
              Register
            </v-btn>
          </form>
        </div>
      </v-container>
      <div class="image-wrap">
        <img src="../../images/auth/library.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/layout/header";
import TextField from "@/components/TextField/TextField";
import { changeRoute } from "@/utils/helpers/router";
import { emailRegex } from "@/utils/helpers/regExp";
import { getNotification } from "@/utils/helpers/notification";
import axios from "@/http";

export default {
  data: function () {
    return {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      rules: {
        email: [(val) => emailRegex.test(val) || "Check email format"],
        required: [(val) => (val || "").length > 0 || "This field is required"],
        password: [
          (val) => !!val || "Please type password",
          (val) =>
            this.passwordConfirm.length === 0 ||
            val === this.passwordConfirm ||
            "Passwords should be equal!",
        ],
        passwordConfirm: [
          (val) => !!val || "Please type password",
          (val) =>
            this.password.length === 0 ||
            val === this.password ||
            "Passwords should be equal!",
        ],
      },
    };
  },
  methods: {
    handleField(name, value) {
      this[name] = value;
    },
    async onSubmit() {
      // if (!this.checkForm) return;

      try {
        const { email, name, password } = this;
        const { data } = await axios.post(`/api/auth/register`, {
          email,
          name,
          password,
        });
        if (data) {
          changeRoute("/login");
          getNotification({
            message: data,
            variant: "success",
            duration: 10000,
          });
          getNotification({
            message: "Check your email to activate an account!",
            variant: "info",
            duration: 60000,
          });
        }
      } catch (e) {
        console.log("e", e);
        getNotification({
          message: "Login was not successful!",
          variant: "success",
        });
      }
    },
  },
  computed: {
    isDisabled() {
      return (
        !this.email || !this.name || !this.password || !this.passwordConfirm
      );
    },
  },
  components: {
    Header,
    TextField,
  },
};
</script>

<style scoped lang='scss'>
@import "@/styles/_variables.scss";

.wrapper {
  position: relative;
  height: calc(100vh - 64px);
  background: $layoutGrey;
  font-family: "Italianno", cursive;
}
.container {
  display: flex;
}
.auth-content {
  width: 40%;
  h1 {
    color: $darkYellow;
    font-size: 80px;
  }
  form {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .button {
      font-family: "Times New Roman", Times, serif;
      margin-top: 10px;
    }
  }
}
.image-wrap {
  position: absolute;
  right: 0;
  top: 0;
  height: calc(100vh - 64px);
  width: 55%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
