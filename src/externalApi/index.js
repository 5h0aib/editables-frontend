// https://shababe.pythonanywhere.com/swagger/
const baseUrl = "https://shababe.pythonanywhere.com/api/v1"

function getCookie(cookieName) {
  const name = cookieName + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(";")
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim()
    if (cookie.indexOf(name) === 0) {
      console.log("token: ", cookie.substring(name.length))
      return cookie.substring(name.length)
    }
  }
  return null // Cookie not found
}

// {
//   "uid": 8,
// const access_token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3MTc0MzUzLCJpYXQiOjE2OTcxNjcxNTMsImp0aSI6IjE5OWI4OTc0ZjIzNjRlMThhNjMyYzFkMGY4MjVkNWYwIiwidXNlcl9pZCI6OH0.h6Foo5PrrskORI79M9aWnal7oHRkNcf7S1WPtHNPmo4"
const headers = {
  "Content-Type": "application/json",
  Authorization: `JWT ${getCookie("access_token")}`,
}

//   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NzU5OTE1MywiaWF0IjoxNjk3MTY3MTUzLCJqdGkiOiJiM2QxNzk4NDliOGU0NGMxOThmYmI1ZDEyOTkyNDYxYiIsInVzZXJfaWQiOjh9.gsFxJlXS5_k5r--IE9FinimJc4P8uXeikzS8_eamtcg"
// }


// Step 1
const getCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
const getStyles = async () => {
  try {
    const response = await fetch(`${baseUrl}/styles/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
//step two
const getAddons = async () => {
  try {
    const response = await fetch(`${baseUrl}/addons/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

const checkout= async (postData) => {
  try {
    const response = await fetch(`${baseUrl}/create-checkout-session/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData = await response.json()
    console.log("response", responseData)
    return responseData
  } catch (error) {
    console.error("Error posting data:", error)
  }
}

const getOrders = async () => {
  console.log("cookies: ", document.cookie)
  console.log("access token: ")
  try {
    const response = await fetch(`${baseUrl}/orders/`, {
      method: "GET",
      headers: headers,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

const postOrders = async (postData) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData = await response.json()
    console.log("response", responseData)
    return responseData
  } catch (error) {
    console.error("Error posting data:", error)
  }
}
const login = async (postData) => {
  console.log(postData)
  try {
    const response = await fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData = await response.json()
    console.log("response", responseData)
    return responseData
  } catch (error) {
    console.error("Error posting data:", error)
  }
}

export { getCategories, getStyles, checkout, getAddons, getOrders, postOrders, login, getCookie }
