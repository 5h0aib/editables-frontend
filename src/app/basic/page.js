import ServiceLayout from "@/components/ServiceLayout"
import React from "react"
import Step2 from "./Step2"

const Basic = () => {
  return (
    <ServiceLayout
      formTitle={"Just upload pictures & you’re good to go!"}
      subLines={[
        "Tell us your album details, photos and preferred file format  ",
      ]}
    >
      <Step2/>
    </ServiceLayout>
  )
}

export default Basic
