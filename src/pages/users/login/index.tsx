import Taro, { useEffect, useState, useCallback, useReducer } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar, AtButton, AtForm, AtInput } from 'taro-ui'
import api from '../../../utils/api'
import './style.scss'

interface IState {
  value: string
  code: string
  getCode: boolean
  submit: boolean
}

const INITIAL_STATE: IState = {
  value: '',
  code: '',
  getCode: true,
  submit: true
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload
      }
    case 'SET_CODE':
      return {
        ...state,
        code: action.payload
      }
    case 'GET_CODE':
      return {
        ...state,
        getCode: false
      }
    case 'DISABLED_CODE':
      return {
        ...state,
        getCode: true
      }
    case 'DISBALED_SUBMIT':
      return {
        ...state,
        submit: true
      }
    case 'SUBMIT':
      return {
        ...state,
        submit: false
      }
    default:
      return state
  }
}

const Index = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [text, setText] = useState<string>('获取验证码')
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '账户信息'
    })
  }, [])

  useEffect(() => {
    if (state.value) {
      dispatch({ type: 'GET_CODE' })
    } else {
      dispatch({ type: 'DISABLED_CODE' })
    }
  }, [state.value])

  useEffect(() => {
    let number = 60
    let time
    if (text === '60s') {
      time = setInterval(() => {
        number -= 1
        setText(`${number}s`)
        if(number === 0){
          dispatch({ type: 'GET_CODE' })
          dispatch({ type: 'DISABLED_SUBMIT' })
          setText('重新获取')
          clearInterval(time)
        }
      }, 1000)
    }
    console.log('-21321321')
    // return () => clearInterval(time)
  }, [text])
  const onSubmit = (event) => {
    console.log(event)
    console.log(state)
  }
  const handleChange = (value: string) => {
    dispatch({ type: 'SET_VALUE', payload: value })
  }

  const handleChangeCode = (value: string) => {
    dispatch({ type: 'SET_CODE', payload: value })
    
  }
  const getPhoneCode = () => {
    console.log('获取验证码')
    dispatch({ type: 'DISABLED_CODE' })
    dispatch({ type: 'SUBMIT' })
    setText('60s')
  }
  return (
    <View>
      <AtForm onSubmit={onSubmit}>
        <AtInput
          clear
          focus
          placeholder="请输入手机号"
          type="text"
          name="phone"
          value={state.value}
          onChange={handleChange}
        />
        <AtInput
          type="text"
          maxLength="4"
          name="code"
          placeholder="请输入手机验证码"
          value={state.code}
          onChange={handleChangeCode}
        >
          <AtButton circle size="small" onClick={getPhoneCode} disabled={state.getCode}>
            {text}
          </AtButton>
        </AtInput>
        <AtButton type="primary" formType="submit" disabled={state.submit}>
          确定
        </AtButton>
      </AtForm>
    </View>
  )
}

export default Index
