"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const loginBackground = "/assets/images/login_background_image.jpg";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Your login logic
      if (username === "brewmaster" && password === "brewmaster") {
        window.location.href = "http://localhost:9011"; // Redirect to protected frontend
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };
  
  if (!isClient) return null;

  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(250, 249, 241, 0.8), rgba(250, 249, 241, 0.3)), url(${loginBackground})`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "10px",
          padding: "40px 20px 20px",
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 4px 10px",
          marginLeft: "-40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "rgb(252, 252, 248)",
            marginBottom: "10px",
          }}
        >
          Welcome Back, Brewmaster!
        </h1>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="username"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "rgb(252, 252, 248)",
              }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid rgb(204, 204, 204)",
                color: "#2B2D42", // Updated font color
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "rgb(252, 252, 248)",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid rgb(204, 204, 204)",
                color: "#2B2D42", // Updated font color
              }}
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex" }}>
            <label
              htmlFor="terms"
              style={{
                color: "rgb(252, 252, 248)",
                fontSize: "12px",
              }}
            >
              Understand, you are loggin into <b>YOUR Local App</b> - NOT the HasABrewery Online Dashboard.<br/>
              When logging in, you accept the current{" "}
              <a
                href="https://hasabrewery.com/tnc"
                style={{
                  color: "rgb(250, 188, 24)",
                  textDecoration: "underline",
                }}
              >
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a
                href="https://hasabrewery.com/privacy"
                style={{
                  color: "rgb(250, 188, 24)",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "rgb(43, 45, 66)",
              color: "rgb(255, 255, 255)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Log In
          </button>
        </form>

        <p
          style={{
            fontSize: "14px",
            color: "rgb(252, 252, 248)",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don’t have an account?{" "}
          <a
                href="https://hasabrewery.com/get-started"
                style={{
                  color: "rgb(250, 188, 24)",
                  textDecoration: "underline",
                }}
              >
                Get Started
              </a> here.
        </p>
      </div>
    </div>
  );
}
