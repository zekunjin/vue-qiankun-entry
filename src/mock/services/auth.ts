import Mock from 'mockjs'
import { Response } from '../index'

const authLogin = ({
  username,
  password
}: {
  username: string
  password: string
}) => {
  if (username === 'admin' && password === 'admin') {
    return new Response({ token: 'TOKEN' })
  }
}

Mock.mock('/api/auth/login', 'post', authLogin)
