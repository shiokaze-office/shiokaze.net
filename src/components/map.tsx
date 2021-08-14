import React from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'

const Map: React.FC = () => {
  const key = `AIzaSyCxWeezNfUlaG2bDgvDpwpf3K_hsbzk5oA`
  const lat = 33.5863496
  const lng = 130.3116807
  const zoom = 15
  const name = ``
  const Marker = ({ text }) => <div><BouncedPin>{text}</BouncedPin><Pulse /></div>

  return (
    <Wrapper>
      <GoogleMapWrapper>
        <GoogleMapReact bootstrapURLKeys={{key}} defaultCenter={{lat,lng}} defaultZoom={zoom} >
          <Marker lat={lat} lng={lng} text={name} />
        </GoogleMapReact>
      </GoogleMapWrapper>
    </Wrapper>
  )
}

export default Map

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  position: relative;
  margin: var(--spacing-10) 0 var(--spacing-5);
  overflow: hidden;
`
const GoogleMapWrapper = styled.div`
  width: 100%;
  height: 50vh;
`
const BouncedPin = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: #cec0d9;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -13px;
  cursor: pointer;
  animation-name: bounce;
  animation-fill-mode: both;
  animation-duration: 1s;
  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translateY(-2000px) rotate(-45deg);
    }
    60% {
      opacity: 1;
      transform: translateY(30px) rotate(-45deg);
    }
    80% {
      transform: translateY(-10px) rotate(-45deg);
    }
    100% {
      transform: translateY(0) rotate(-45deg);
    }
  }
`

const Pulse = styled.div`
  background: #d6d4d4;
  background: #e6e0ed;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 11px 0px 0px -5px;
  transform: rotateX(55deg);
  z-index: -2;
  &:after {
    content: '';
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -20px;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #cec0d9;
    animation-delay: 1.1s;
  }
  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }
`
