import Taro, { useEffect, useState } from '@tarojs/taro'
import { AtButton, AtForm, AtInput, AtModal } from 'taro-ui'
import api from '../../utils/api'
import utils from '../../utils/index'
import { connect } from '@tarojs/redux'
import './style.scss'

const Index = ({ dispatch }) => {
  const [value, setValue] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(true)
  const [propmt, setPropmt] = useState({
    isOpend: false,
    text: ''
  })
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '账户登录'
    })
  }, [])
  useEffect(() => {
    if (value.length === 11 && password) {
      setSubmit(false)
    } else {
      setSubmit(true)
    }
  }, [value, password])
  const handleChange = (value: string) => {
    setValue(value)
  }
  const handleChangeCode = (value: string) => {
    setPassword(value)
  }
  const onSubmit = async () => {
    try {
      let data = await api.login(value, password)
      if (data.code === 400) {
        setPropmt({
          ...propmt,
          isOpend: true,
          text: '请输入正确的手机号'
        })
      }
      if (data.code && data.msg) {
        setPropmt({
          ...propmt,
          isOpend: true,
          text: data.message
        })
      }
      if (data.cookies) {
        wx.setStorageSync('token', data['cookies'])
        dispatch({ type: 'LOGIN', payload: data })
        utils.handleLaunch('/pages/find/index')
      }
    } catch (error) {
      setPropmt({
        ...propmt,
        isOpend: true,
        text: error
      })
    }
  }
  const handleConfirm = () => {
    setPropmt({ ...propmt, isOpend: false })
  }
  return (
    <AtForm onSubmit={onSubmit}>
      <AtInput
        clear
        focus
        placeholder="请输入手机号"
        type="text"
        name="phone"
        value={value}
        onChange={handleChange}
      />
      <AtInput
        clear
        type="password"
        name="password"
        placeholder="请输入密码"
        value={password}
        onChange={handleChangeCode}
      />
      <AtButton type="primary" formType="submit" disabled={submit}>
        确定
      </AtButton>
      <AtModal
        isOpened={propmt.isOpend}
        confirmText="确认"
        onConfirm={handleConfirm}
        content={propmt.text}
      />
    </AtForm>
  )
}
function mapPropsToState(state) {
  const { userInfo } = state.users
  return {
    userInfo
  }
}

export default connect(mapPropsToState)(Index)
