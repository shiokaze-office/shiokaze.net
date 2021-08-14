import React, { useState } from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

const Contact: React.FC = () => {
  const endpoint = `https://linyows.lolipop.jp/contact.shiokaze.net/`
  const initQuery = {
    name: ``,
    phone: ``,
    email: ``,
    address: ``,
    message: ``,
    agree: ``,
  }
  const [formStatus, setFormStatus] = useState(false)
  const [lockStatus, setLockStatus] = useState(false)
  const [query, setQuery] = useState(initQuery)
  const [errors, setErrors] = useState(initQuery)

  const handleChange = () => (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateEmail = (v) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(v)
  }

  const validatePhone = (v) => {
    const re = /^[0-9]{10,13}$/
    return re.test(v.replaceAll('-', ''))
  }

  const validate = () => {
    let isValid = true

    Object.entries(query).forEach(([k, v]) => {
      if (k !== 'agree' && v.length === 0) {
        isValid = false
        setErrors((prevState) => ({
          ...prevState,
          [k]: `* このフィールドは入力必須です`
        }))
      } else if (k !== 'agree' && v.length < 3) {
        isValid = false
        setErrors((prevState) => ({
          ...prevState,
          [k]: `* 入力が短かすぎるようです。`
        }))
      } else if (k === 'email' && !validateEmail(v)) {
        isValid = false
        setErrors((prevState) => ({
          ...prevState,
          [k]: `* メールアドレスの形式が正しくないようです。`
        }))
      } else if (k === 'phone' && !validatePhone(v)) {
        isValid = false
        setErrors((prevState) => ({
          ...prevState,
          [k]: `* 電話番号の形式が正しくないようです。`
        }))
      } else if (k === 'agree' && v !== 'agree') {
        isValid = false
        setErrors((prevState) => ({
          ...prevState,
          [k]: `* プライバシーポリシーをご確認ください。`
        }))
      }
    })

    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLockStatus(true)
    setErrors(initQuery)

    if (!validate()) {
      setLockStatus(false)
      return
    }

    const formData = new FormData()
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value)
    })

    fetch(endpoint, { method: 'POST', body: formData })
      .then(response => {
        setLockStatus(false)
        setFormStatus(true)
        setQuery(initQuery)
        console.log(response)
      })
      .catch(error => setLockStatus(false) && console.log(error))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TwoColumn>
        <One>
          <Label htmlFor="name">
            氏名
            {errors.name && (<Err>{errors.name}</Err>)}
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="潮風 花子"
            name="name"
            value={query.name}
            onChange={handleChange()}
          />
        </One>
        <Two>
          <Label htmlFor="email">
            電話番号
            {errors.phone && (<Err>{errors.phone}</Err>)}
          </Label>
          <Input
            type="tel"
            id="phone"
            placeholder="000-0000-0000"
            name="phone"
            value={query.phone}
            onChange={handleChange()}
          />
        </Two>
      </TwoColumn>
      <Label htmlFor="email">
        メールアドレス
        {errors.email && (<Err>{errors.email}</Err>)}
      </Label>
      <Input
        type="email"
        id="email"
        placeholder="account@example.com"
        name="email"
        value={query.email}
        onChange={handleChange()}
      />
      <Label htmlFor="address">
        住所
        {errors.address && (<Err>{errors.address}</Err>)}
      </Label>
      <Input
        type="text"
        id="address"
        placeholder="福岡市西区..."
        name="address"
        value={query.address}
        onChange={handleChange()}
      />
      <Label htmlFor="message">
        内容
        {errors.message && (<Err>{errors.message}</Err>)}
      </Label>
      <Textarea
        name="message"
        id="message"
        rows="5"
        value={query.message}
        onChange={handleChange()}
      />
      <Checkbox>
        <Check
          name="agree"
          id="agree"
          type="checkbox"
          value="agree"
          onChange={handleChange()}
        />
        <label htmlFor="agree">
          <a href="/privacy-policy/" target="_blank">プライバシーポリシー</a> に同意する
          {errors.agree && (<AgreementErr className="privacy-policy-agreement">{errors.agree}</AgreementErr>)}
        </label>
      </Checkbox>
      {formStatus ? (<Sent>お問い合わせを送信しました。</Sent>) : (
        <ButtonBox>
          {lockStatus && (<Spinner type="Grid" color="#FFF" height={30} width={30} />)}
          <Button className="button-dark" type="submit" disabled={lockStatus}>送信する</Button>
        </ButtonBox>
      )}
    </Form>
  )
}

export default Contact

const Form = styled.form`
  font-family: var(--fontFamily-sans);
  padding-top: var(--spacing-10);
`
const Label = styled.label`
  letter-spacing: .2rem;
  font-size: var(--fontSize-2);
  display: block;
  padding-top: var(--spacing-5);
  padding-bottom: var(--spacing-2);
`
const Input = styled.input`
  width: 100%;
  border: 2px solid var(--color-primary);
  padding: var(--spacing-2);
`
const Check = styled.input`
  margin-right: var(--spacing-2);
  font-size: var(--fontSize-10);
`
const Checkbox = styled.div`
  margin-top: var(--spacing-5);
  text-align: center;
  label {
    font-size: var(--fontSize-2);
    cursor: pointer;
  }
`
const Textarea = styled.textarea`
  width: 100%;
  border: 2px solid var(--color-primary);
  padding: var(--spacing-2);
`
const Button = styled.button`
  font-size: var(--fontSize-2);
  border: 1px solid var(--color-primary);
  margin: var(--spacing-10) auto;
  display: block;
  padding: var(--spacing-3) var(--spacing-10);
`
const Sent = styled.div`
  background-color: #99ffcc;
  padding: var(--spacing-5);
  margin-top: var(--spacing-5);
`
const TwoColumn = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: auto var(--spacing-10) auto;
`
const One = styled.div`
  grid-column: 1 / 3;
  input {
    width: 90%;
  }
`
const Two = styled.div`
  grid-column: 3 / 3;
`
const Err = styled.span`
  letter-spacing: 0;
  color: red;
  padding-left: var(--spacing-3);
  font-size: var(--fontSize-2);
  padding-top: var(--spacing-2);
`
const AgreementErr = styled(Err)`
  display: block;
  padding-left: 0;
`
const Spinner = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px;
  display: inline;
`
const ButtonBox = styled.div`
  position: relative;
  button:disabled {
    color: var(--color-primary);
  }
`
