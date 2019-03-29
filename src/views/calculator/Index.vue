<template>
    <div class="box">
        <main>
            <div class="show">
                <!--<template v-for="item in showing">{{item.key||item.value}}</template>-->
                {{ showing.toString() || 0 }}
            </div>
            <buttons @change="buttonInput"/>
        </main>
    </div>

</template>

<script>
    import Buttons from "./Buttons";

    export default {
        name: "Calculator",
        components: {Buttons},
        data() {
            return {
                showing: [],
                formula: [],
                result: [],
            }
        },
        methods: {
            init() {
            },
            addShow(key) {
                let last = this.formula[this.formula.length - 1];
                let str = '';
                switch (key.type) {
                    case 'clear':
                        this.showing = '';
                        this.formula = [];
                        return;
                    case 'enter':
                        this.formula.forEach(item => {
                            str += item.value
                        });
                        this.showing = eval(str);
                        this.result.push(this.showing);
                        this.formula = [{value: this.showing}];
                        return;
                    case 'function':
                        if (!last) break;
                        if (last.type === 'function') (this.formula[this.formula.length - 1] = key);
                        else this.formula.push(key);
                        break;
                    default:
                        this.formula.push(key);
                        break;
                }
                this.formula.forEach(item => {
                    str += item.key || item.value;
                });
                this.showing = str;
            },
            buttonInput(key) {
                this.addShow(key)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    main {
        height: 400px;
        width: 300px;

        .show {
            height: 60px;
            background: #8b8b8b;
            color: #fff;
            font-size: 20px;
            line-height: 60px;
            text-align: right;
            padding: 0 .5em;
        }


    }
</style>
