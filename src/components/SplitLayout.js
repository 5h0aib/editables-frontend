import { Grid } from "@mui/material"
import React from "react"

const SplitLayout = ({ children, form, alignItems }) => {
  return form ? (
    <Grid container spacing={2} alignItems={alignItems || "center"}>
      <Grid item xs={12} md={7}>
        {children[0]}
      </Grid>
      <Grid item xs={12} md={5}>
        {children[1]}
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={2} alignItems={alignItems || "center"}>
      {children.map((child, i) => (
        <Grid item xs={12} md={6} key={i}>
          {child}
        </Grid>
      ))}
    </Grid>
  )
}

export default SplitLayout
