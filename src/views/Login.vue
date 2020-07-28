<template>
  <main>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <i-input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem prop="password">
        <i-input
          type="password"
          v-model="formInline.password"
          placeholder="Password"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')"
          >Signin</Button
        >
      </FormItem>
    </Form>
    <ul>
      <li>
        <label><input v-model="account" type="text" /></label>
      </li>
      <li>
        <label><input v-model="password" type="text" /></label>
      </li>
      <li>
        <label><input @click="submit" type="button" value="提交" /></label>
      </li>
    </ul>
  </main>
</template>

<script>
import { loginAjax } from "../api";

export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    init() {},
    submit() {
      const { account, password } = this;
      loginAjax({ account, password });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  ul {
    line-height: 2;
  }
}
</style>
