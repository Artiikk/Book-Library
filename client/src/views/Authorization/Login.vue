<template>
  <div>
    <Header />
    <div class="wrapper">
      <v-container>
        <div class="auth-content">
          <h1>Login</h1>

          <form @submit.prevent="onSubmit" lazy-validation>
            <TextField
              required
              blurValidate
              label="E-mail"
              type="email"
              name="email"
              :value="email"
              :rules="rules.email"
              @handle-field="handleField"
            />
            <TextField
              required
              label="Password"
              type="password"
              name="password"
              :value="password"
              @handle-field="handleField"
            />

            <v-btn
              class="button"
              elevation="2"
              x-large
              type="submit"
              :disabled="isDisabled"
            >
              Log in
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
import { getNotification } from "@/utils/helpers/notification";
import { changeRoute } from "@/utils/helpers/router";
import { emailRegex } from "@/utils/helpers/regExp";
import axios from "@/http";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      rules: {
        email: [(val) => emailRegex.test(val) || "Check email format"]
      },
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const activation = urlParams.get("activation");

    if (activation === "successfull") {
      getNotification({
        message: "Activation is succeeded!",
        variant: "success",
        duration: 10000
      });
    }
  },
  methods: {
    handleField(name, value) {
      this[name] = value;
    },
    async onSubmit() {
      try {
        const { email, password } = this
        const { data } = await axios.post(`/api/auth/login`, { email, password })

        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("isAuthorized", "true");
          changeRoute('/')
          getNotification({ message: "Login is successful!", variant: "success" })
        }
      } catch (e) {
        console.log('Error: ', e.message)
      }
    }
  },
  computed: {
    isDisabled() {
      return !emailRegex.test(this.email)
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
      &:disabled {
        opacity: 0.35 !important;
        color: $white !important;
      }
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
