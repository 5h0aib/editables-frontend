
const baseUrl = "https://shababe.pythonanywhere.com/api/v1"

function getCookie(cookieName) {
  const name = cookieName + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(";")
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim()
    if (cookie.indexOf(name) === 0) {
      console.log(cookieName + "token: ", cookie.substring(name.length))
      return cookie.substring(name.length)
    }
  }
  console.log("cookie not found")
  return null // Cookie not found
}
function deleteAllCookies() {
  const cookies = document.cookie.split(";")

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf("=")
    const cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
}




// const access_token = localStorage.getItem("access_token");

// if (access_token) {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `JWT ${access_token}`,
//   };
//   // You can now use the 'headers' object for your HTTP requests.
// } else {
//   // Handle the case where the access token is not available.
//   console.error("Access token is missing or invalid.");
// }

  var item = ''
  if (typeof window !== 'undefined') {
    item = localStorage.getItem('access_token')
  }

const headers = {
  "Content-Type": "application/json",
  Authorization: `JWT ${item}`,
}



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
const getAddons = async (style_id) => {
  try {
    const response = await fetch(`${baseUrl}/get_addons/${style_id}/`, {
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

const checkout = async (postData) => {
  try {
    const response = await fetch(`${baseUrl}/create-checkout-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData = await response.json()
    // console.log("response", responseData)
    window.location.replace(responseData.stripe_url)
    return responseData
  } catch (error) {
    console.error("Error posting data:", error)
  }
}

//user
const getOrdersofThisUser = async () => {
  // console.log("access#token: ",getCookie("access_token"))
  try {
    const response = await fetch(`${baseUrl}/orders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    // console.log("response: ", responseData)
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
const getUserDetails = async (id) => {
  console.log("cookies: ", document.cookie)
  console.log("access token: ")
  try {
    const response = await fetch(`${baseUrl}/users/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
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

const putUserDetails = async (postData, id) => {
  // postData.newsletter_opt_in=postData.newsletter_opt_in?"true":"false"
  delete postData.email
  console.log("put data: ", postData)
  try {
    const response = await fetch(`${baseUrl}/users/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
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

const createBooking = async (contact_number) => {
  // Get the current date
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0")
  const day = currentDate.getDate().toString().padStart(2, "0")

  // Format the current date as "YYYY-MM-DD"
  const bookingDate = `${year}-${month}-${day}`

  // Get the current time
  const hours = currentDate.getHours().toString().padStart(2, "0")
  const minutes = currentDate.getMinutes().toString().padStart(2, "0")

  const startTime = `${hours}:${minutes} ${hours < 12 ? "AM" : "PM"}`
  let data = {
    user_id: localStorage.getItem("uid"),
    browser_time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    booking_status: "Scheduled",
    contact_number,
  }
  console.log("Bookin Data: ", data)
  try {
    const response = await fetch(`${baseUrl}/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(data),
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

//admin
const getOrders = async () => {
  try {
    const response = await fetch(`${baseUrl}/orders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
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

const getTransactions = async () => {
  console.log("cookies: ", document.cookie)
  console.log("access token: ")
  try {
    const response = await fetch(`${baseUrl}/transactions/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
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

const getBookings = async () => {
  console.log("cookies: ", document.cookie)
  console.log("access token: ")
  try {
    const response = await fetch(`${baseUrl}/bookings/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
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

const changeOrderStatus = async (order_status, id) => {
  console.log("status: ", order_status)
  try {
    const response = await fetch(`${baseUrl}/update_order/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ order_status }),
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

const postOrders = async (postData) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access_token")}`,
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
const login = async (postData) => {
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

const logOut = () => {
  localStorage.removeItem("uid")
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.setItem("isLoggedIn", false)
}

export {
  getCategories,
  getStyles,
  checkout,
  getAddons,
  getOrdersofThisUser,
  getUserDetails,
  putUserDetails,
  createBooking,
  getOrders,
  getTransactions,
  getBookings,
  changeOrderStatus,
  postOrders,
  login,
  logOut,
  getCookie,
}
