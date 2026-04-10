<template>
    <div class="input-field col s6">
        <span class="label">{{ label }}</span>

        <select class="browser-default" :value="value || ''" @change="updateValue">
            <option value="" disabled :selected="!value">Selecione</option>

            <option
                v-for="item in options"
                :key="item[optionValue]"
                :value="item[optionValue]"
            >
                {{ item[optionLabel] }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SelectCustom",
    props: {
        label: String,
        options: Array,
        value: [String, Number],
        optionLabel: {
            type: String,
            default: 'descricao'
        },
        optionValue: {
            type: String,
            default: 'id'
        }
    },
    methods: {
        updateValue(event) {
            const value = event.target.value

            this.$emit("input", value)
            this.$emit("change", value)
        }
    }
}
</script>

<style scoped>
.label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #9e9e9e;
}
</style>
