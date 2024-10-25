<template>
    <div>
        <span>{{ spanMsg }}</span>
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
            :type="type" :class="inputClass" />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: [String, Number],
            required: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        inputClass: {
            type: String,
            default: ''
        },
        spanMsg: {
            type: String,
            default: ''
        }
    }
};
</script>