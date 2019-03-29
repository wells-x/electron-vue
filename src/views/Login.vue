<template>
    <main>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <i-input type="text" v-model="formInline.account" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem prop="password">
                <i-input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
        </Form>
    </main>
</template>

<script>
    import {loginAjax} from "../api";

    export default {
        name: "Login",
        data() {
            return {
                account: '',
                password: '',
                formInline: {
                    account: '',
                    password: ''
                },
                ruleInline: {
                    account: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            init() {
            },
            submit() {
                let {account, password} = this.formInline;
                loginAjax({account, password})
                    .then(res => {
                        console.log(res);
                    })
                    .catch(e => {
                        this.$Message.error(e.msg || e.message || JSON.stringify(e));
                    })
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        this.submit()
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    main {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .ivu-form {
            height: 240px;
            width: 260px;
        }
    }
</style>
