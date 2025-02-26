# Protect Route

To create a protected route in a Next.js application using **Axios** for API requests and **MongoDB** for database management, you can follow these steps:

---

### **1. Backend Setup:**

You'll need an API route in Next.js to validate the user's session or token. Ensure you have a connection to MongoDB for user authentication.

### **API Route Example: `/pages/api/auth/validate.js`**

```jsx
import { connectToDatabase } from "@/utils/mongodb"; // Custom MongoDB connection utility

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ token });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

```

---

### **2. MongoDB Connection Utility**

Create a utility function to connect to MongoDB.

### **`/utils/mongodb.js`**

```jsx
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("your-database-name"); // Replace with your DB name
  return { db, client };
}

```

---

### **3. Axios Setup**

Use Axios for client-side requests.

### **`/utils/axios.js`**

```jsx
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Base API URL for Next.js API routes
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

```

---

### **4. Protected Route Component**

A Higher-Order Component (HOC) to protect routes.

### **`/components/ProtectedRoute.js`**

```jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token");
        }

        const response = await axios.post("/auth/validate", { token });

        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

```

---

### **5. Use the ProtectedRoute HOC**

Wrap your pages or components with `ProtectedRoute`.

### **Example: `/pages/dashboard.js`**

```jsx
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
};

export default function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

```

---

### **6. Add a Login Page**

Create a login page that sets the token in `localStorage` upon successful login.

### **Example: `/pages/login.js`**

```jsx
import { useState } from "react";
import axios from "@/utils/axios";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

```

---

### **7. Environment Variables**

Add the required environment variables in `.env.local`:

```
MONGODB_URI=your-mongodb-connection-string

```

---

### **Key Notes**

1. **JWT Tokens:** Use libraries like `jsonwebtoken` for secure token generation and validation.
2. **Secure Storage:** Avoid storing tokens in `localStorage` for critical applications. Use cookies with `httpOnly` flags for better security.
3. **Styling:** Use Tailwind or your preferred library to enhance the UI.

Let me know if you need additional clarification!

To implement a protected route using **Next.js**, **Express.js**, **Axios**, and **MongoDB**, you’ll set up an Express server alongside your Next.js app for handling authentication and API logic. Below are the detailed steps:

---

### **1. Setup an Express Server**

You’ll create an Express server to handle backend routes and manage user authentication.

### **1.1 Create a new server file**

Create a `server.js` file at the root of your project.

```jsx
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db("your-database-name"); // Replace with your DB name
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToDB();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Routes
// 1. Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. Validate Token Route
app.post("/api/validate", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Start Express Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```

---

### **2. Modify Next.js App to Use Express Server**

Update your Next.js app to work alongside the Express server.

### **Update `package.json`**

Add a script to run both the Next.js app and Express server.

```json
"scripts": {
  "dev": "concurrently \"next dev\" \"node server.js\"",
  "build": "next build",
  "start": "next start"
}

```

Install `concurrently`:

```bash
npm install concurrently

```

---

### **3. Axios Setup**

Create a reusable Axios instance for making API calls to your Express server.

### **`/utils/axios.js`**

```jsx
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for the Express server
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

```

---

### **4. Protected Route Component**

Create a Higher-Order Component (HOC) for protected routes.

### **`/components/ProtectedRoute.js`**

```jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token");
        }

        const response = await axios.post("/validate", { token });

        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

```

---

### **5. Login Page**

Implement a login page to authenticate the user and store the token.

### **Example: `/pages/login.js`**

```jsx
import { useState } from "react";
import axios from "@/utils/axios";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

```

---

### **6. Dashboard Page**

Use the `ProtectedRoute` component to protect your pages.

### **Example: `/pages/dashboard.js`**

```jsx
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
};

export default function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

```

---

### **7. Environment Variables**

Add the required environment variables in `.env.local`:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

```

---

### **Key Notes**

1. **Security:** Use HTTPS in production and secure cookies instead of `localStorage` for sensitive applications.
2. **Deployment:** Ensure the Express server is deployed alongside your Next.js app (e.g., on a single VPS or containerized environment).
3. **Scaling:** Consider using `passport.js` or `auth0` for more complex auth requirements.

Let me know if you need help with deployment or further explanations!