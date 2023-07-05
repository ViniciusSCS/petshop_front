<template>
    <ul class="pagination">
        <li :class="{ disabled : source.current_page == 1}">
            <a href="#" @click="nextPrev($event, source.current_page-1)">
                <i class="material-icons">chevron_left</i>
            </a>
        </li>
        <li :class="{active: source.current_page == page}" v-for="page in pages">
            <a href="#" @click="nevegacao($event, page)">{{ page }}</a>
        </li>
        <li :class="{ disabled : source.current_page == source.last_page}">
            <a href="#!" @click="nextPrev($event, source.current_page+1)">
                <i class="material-icons">chevron_right</i>
            </a>
        </li>
    </ul>
</template>

<script>
import lodash from 'lodash'

export default {
    name: "paginacao",
    props: [
        'source',
    ],
    data() {
        return {
            pages: [],
        }
    },
    methods: {
        nevegacao(event, page) {
            var self = this

            event.preventDefault()
            self.$emit('navegacao', page)
        },

        nextPrev(event, page) {
            var self = this

            if(page == 0 || page == self.source.last_page+1){
                return;
            }

            self.nevegacao(event, page)
        }
    },
    watch: {
        source() {
            var self = this

            self.pages = lodash.range(1, self.source.last_page + 1)
        }
    }

}
</script>

<style scoped>

</style>
