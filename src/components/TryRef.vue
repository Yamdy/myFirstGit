<template>
<button @click="inc">{{ count }}</button>
</template>

<script>
import {
    ref
} from 'vue'

export default {
    setup() {
        const count = ref(0)
        const inc = () => count.value++

        return {
            count,
            inc,
        }
    },
}
</script>
