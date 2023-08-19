import Image from "next/image"
import React from "react"

const MorphImage = () => {
  return (
    <div
      style={{ position: "relative", background: "yellow", height: "300px" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "red",
          height: "100%",
          width: "100%",
        }}
      >
        {/* <Image src={'/heroBackground'} layout="fill" className={'image'} style/> */}
        <Image
          src='/morphFrom.jpg'
          alt='editable studio background image'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div
        className='morph'
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src='/morphTo.jpg'
          alt='editable studio background image'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
    </div>
  )
}

export default MorphImage
