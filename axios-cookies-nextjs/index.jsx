// To use Axios in a Next.js project for making API requests, follow these steps:

// ### 1. Install the necessary dependencies:
// ```bash
// npm install axios cookies-next
// ```

// ### 2. Example for `GET`, `POST`, `PUT`, and `DELETE` using Axios:

// #### `GET` Request:
// ```tsx
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data', error);
  }
};
// ```

// #### `POST` Request:
// ```tsx
import axios from 'axios';

const postData = async () => {
  try {
    const response = await axios.post('https://api.example.com/data', {
      key: 'value',
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error posting data', error);
  }
};
// ```

// #### `PUT` Request:
// ```tsx
import axios from 'axios';

const updateData = async () => {
  try {
    const response = await axios.put('https://api.example.com/data/1', {
      key: 'new_value',
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error updating data', error);
  }
};
// ```

// #### `DELETE` Request:
// ```tsx
import axios from 'axios';

const deleteData = async () => {
  try {
    const response = await axios.delete('https://api.example.com/data/1');
    console.log(response.data);
  } catch (error) {
    console.error('Error deleting data', error);
  }
};
// ```

// ### 3. Using cookies in signup and login with `cookies-next`:

// #### Signup (POST request with cookie):
// ```tsx
import axios from 'axios';
import { setCookie } from 'cookies-next';

const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://api.example.com/signup', {
      email,
      password,
    });

    // Set a cookie with the token after successful signup
    setCookie('token', response.data.token, { maxAge: 60 * 60 * 24 }); // 1 day expiration
    console.log('User signed up and token set in cookie');
  } catch (error) {
    console.error('Error signing up', error);
  }
};
// ```

// #### Login (POST request with cookie):
// ```tsx
import axios from 'axios';
import { setCookie } from 'cookies-next';

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://api.example.com/login', {
      email,
      password,
    });

    // Set a cookie with the token after successful login
    setCookie('token', response.data.token, { maxAge: 60 * 60 * 24 }); // 1 day expiration
    console.log('User logged in and token set in cookie');
  } catch (error) {
    console.error('Error logging in', error);
  }
};
// ```

// ### 4. Accessing the cookie:

// To access the cookie on the client side or in API routes:

// #### Accessing the cookie on the client side:
// ```tsx
import { getCookie } from 'cookies-next';

const token = getCookie('token');
console.log('Token from cookie:', token);
// ```

// #### Accessing the cookie in API routes:
// ```tsx
import { getCookie } from 'cookies-next';

export async function handler(req, res) {
  const token = getCookie('token', { req, res });
  console.log('Token from cookie:', token);
  res.status(200).json({ message: 'Success', token });
}
// ```

// ### 5. Using Axios with Cookies (Authentication):
// For authentication, you can pass the token stored in cookies in your Axios requests.

// ```tsx
import axios from 'axios';
import { getCookie } from 'cookies-next';

const fetchDataWithAuth = async () => {
  try {
    const token = getCookie('token');
    const response = await axios.get('https://api.example.com/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data with auth', error);
  }
};
// ```

// This way, you can handle API requests using Axios and manage authentication with cookies in your Next.js project.

// Let me know if you need more details or examples!
































// Here’s an example of how to send `POST`, `PUT`, or `DELETE` requests with both headers and a body using Axios in a Next.js project.

// ### Example: `POST` Request with Headers and Body
// ```tsx
import axios from 'axios';

const postDataWithHeaders = async () => {
  try {
    const response = await axios.post(
      'https://api.example.com/data',
      {
        key: 'value', // Body of the request
        anotherKey: 'anotherValue',
      },
      {
        headers: {
          'Content-Type': 'application/json', // Specify content type
          Authorization: 'Bearer yourAccessToken', // Add an Authorization header
          'Custom-Header': 'CustomHeaderValue', // Add any custom headers
        },
      }
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error posting data', error);
  }
};
// ```

// ### Example: `PUT` Request with Headers and Body
// ```tsx
import axios from 'axios';

const updateDataWithHeaders = async () => {
  try {
    const response = await axios.put(
      'https://api.example.com/data/1', // API endpoint to update specific data
      {
        key: 'updatedValue', // Body with updated data
      },
      {
        headers: {
          'Content-Type': 'application/json', // Specify content type
          Authorization: 'Bearer yourAccessToken', // Include Authorization header for authentication
          'Another-Header': 'AnotherValue', // Custom header
        },
      }
    );
    console.log('Updated data:', response.data);
  } catch (error) {
    console.error('Error updating data', error);
  }
};
// ```

// ### Example: `DELETE` Request with Headers and Body
// ```tsx
import axios from 'axios';

const deleteDataWithHeaders = async () => {
  try {
    const response = await axios.delete(
      'https://api.example.com/data/1', // API endpoint to delete specific data
      {
        headers: {
          Authorization: 'Bearer yourAccessToken', // Add Authorization header
          'Custom-Header': 'CustomValue', // Add any custom headers
        },
        data: {
          reason: 'Deleting the item for testing', // Body (optional) for DELETE request (some APIs require this)
        },
      }
    );
    console.log('Deleted data:', response.data);
  } catch (error) {
    console.error('Error deleting data', error);
  }
};
// ```

// ### Key Points:
// - **Body:** The body of the request (data) is passed as the second argument to `axios.post()`, `axios.put()`, or `axios.delete()`.
// - **Headers:** Headers are passed as an object inside the third argument to specify `Authorization`, content type, or custom headers.
// - **Authorization:** Often used to pass tokens or credentials for authentication. Replace `yourAccessToken` with your actual token.

// Let me know if you'd like further clarification!