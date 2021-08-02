import React from "react"
//import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

const Contact = () => {
  return (
    <form method="post" action="#">
      <Label>
        氏名
        <input type="text" name="name" id="name" />
      </Label>
      <Label>
        メールアドレス
        <input type="email" name="email" id="email" />
      </Label>
      <Label>
        電話番号
        <input type="phone" name="phone" id="phone" />
      </Label>
      <Label>
        住所
        <input type="text" name="address" id="address" />
      </Label>
      <Label>
        内容
        <textarea name="message" id="message" rows="5" />
      </Label>
      <Button type="submit">送信する</Button>
    </form>
  )
}

export default Contact

const Label = styled.label`
`
const Button = styled.button`
`
