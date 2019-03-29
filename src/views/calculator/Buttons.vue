<template>
    <div class="input-button">
        <div class="button-item" v-for="(item,i) in buttonList"
             @click="buttonClick(item)"
             :key="i">{{item.key||item.value}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Buttons",
        data() {
            return {
                buttonList: [
                    {
                        value: 'c',
                        type: 'clear',
                    },
                    {
                        value: 'ce',
                        type: 'clear',
                    },
                    {
                        key: '-',
                        value: '-',
                        type: 'function',
                    },
                    {
                        key: '÷',
                        value: '/',
                        type: 'function',
                    },
                    {
                        value: '1',
                        type: 'number',
                    },
                    {
                        value: '2',
                        type: 'number',
                    },
                    {
                        value: '3',
                        type: 'number',
                    },
                    {
                        key: '×',
                        value: '*',
                        type: 'function',
                    },
                    {
                        value: '4',
                        type: 'number',
                    },
                    {
                        value: '5',
                        type: 'number',
                    },
                    {
                        value: '6',
                        type: 'number',
                    },
                    {
                        key: '+',
                        value: '+',
                        type: 'function',
                    },
                    {
                        value: '7',
                        type: 'number',
                    },
                    {
                        value: '8',
                        type: 'number',
                    },
                    {
                        value: '9',
                        type: 'number',
                    },
                    {
                        key: '=',
                        value: '=',
                        type: 'enter',
                    },
                ]
            };
        },
        methods: {
            buttonClick(k) {
                this.$emit('change',k)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .input-button {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .button-item {
            width: 20%;
            height: 60px;
            background: #d4d4d4;
            margin: 10px 2px;
            font-size: 16px;
            border-radius: 8px;
            vertical-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &.long {
                width: 180px;
            }
        }
    }
</style>
