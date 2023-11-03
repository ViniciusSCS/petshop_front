<template>
    <login-template>
        <span slot="principal">
            <acesso/>
        </span>
    </login-template>
</template>

<script>
import Acesso from "../../template/Acesso";
import LoginTemplate from "../../template/LoginTemplate";
export default {
    name: "Login",
    components: {Acesso, LoginTemplate}
}
</script>

<style scoped>

</style>
