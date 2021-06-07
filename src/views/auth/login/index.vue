<template>
  <a-card title="LOGIN">
    <a-form
      ref="loginFormRef"
      layout="vertical"
      :model="loginFormState"
      :rules="loginRules"
    >
      <a-form-item ref="username" label="Username" name="username">
        <a-input v-model:value="loginFormState.username" />
      </a-form-item>

      <a-form-item ref="password" label="Password" name="password">
        <a-input-password v-model:value="loginFormState.password" />
      </a-form-item>
    </a-form>

    <a-button type="primary" @click="handleLogin">Submit</a-button>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { Card, Form, Input, Button } from 'ant-design-vue'

export default defineComponent({
  components: {
    [Card.name]: Card,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Input.Password.name]: Input.Password,
    [Button.name]: Button
  },

  setup() {
    const router = useRouter()
    const store = useStore()
    const loginFormRef = ref()
    const loginFormState = reactive({
      username: '',
      password: ''
    })
    const loginRules = {
      username: [
        { required: true, message: 'Please input Username', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please input Password', trigger: 'blur' }
      ]
    }

    const handleLogin = () => {
      const { username: user_name, password: passwd } = loginFormState
      const params = { user_name, passwd, user_type: 3 }
      store.dispatch('user/Login', params).then(() => {
        router.push({ path: '/' })
      })
    }

    return { loginFormRef, loginFormState, loginRules, handleLogin }
  }
})
</script>
