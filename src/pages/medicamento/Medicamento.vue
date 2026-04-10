<template>
    <site>
        <span slot="principal">
            <div class="container center-align">
                <h3 class="title">EM CONSTRUÇÃO</h3>
            </div>
        </span>
    </site>
</template>

<script>
import Site from "../../template/Site";

export default {
    name: "Medicamentos",
    components: { Site }
}
</script>

<style scoped>
.container {
    margin-top: 80px;
}

.title {
    font-weight: bold;
    color: #777;
}
</style>
