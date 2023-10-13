
// https://shababe.pythonanywhere.com/swagger/
const baseUrl = "https://shababe.pythonanywhere.com/api/v1"

// {
//   "uid": 8,
const access_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3MTc0MzUzLCJpYXQiOjE2OTcxNjcxNTMsImp0aSI6IjE5OWI4OTc0ZjIzNjRlMThhNjMyYzFkMGY4MjVkNWYwIiwidXNlcl9pZCI6OH0.h6Foo5PrrskORI79M9aWnal7oHRkNcf7S1WPtHNPmo4"
const headers={
  "Content-Type": "application/json",
  "Authorization": `JWT ${access_token}`
}

//   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NzU5OTE1MywiaWF0IjoxNjk3MTY3MTUzLCJqdGkiOiJiM2QxNzk4NDliOGU0NGMxOThmYmI1ZDEyOTkyNDYxYiIsInVzZXJfaWQiOjh9.gsFxJlXS5_k5r--IE9FinimJc4P8uXeikzS8_eamtcg"
// }

// var orderData = {
//   order_name: "Your Order Name",
//   order_amount: 100.0,
//   delivery_date: "2023-09-30",
//   number_of_images: 100,
//   order_rating: 4.5,
//   user_id: "1",
//   category_id: "1",
//   style_id: "1",
//   addon: ["1", "2"]
// };

const getAddons = async () => {
  try {
    const response = await fetch(`${baseUrl}/addons/`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getOrders = async () => {
  try {
    const response = await fetch(`${baseUrl}/orders/`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


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
      headers:{
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

export { getOrders, postOrders, login }
