
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";

// This would typically come from Shopify APIs or Metafields
export async function loader() {
  const settings = {
    text: "Welcome to our store!",
    buttonText: "Shop Now",
    buttonUrl: "https://example.com"
  };
  return json(settings);
}

export async function action({ request }) {
  const formData = await request.formData();
  const text = formData.get("text");
  const buttonText = formData.get("buttonText");
  const buttonUrl = formData.get("buttonUrl");

  // Here you would normally call Shopify Admin API or use App Proxy to save data
  console.log("Saved settings:", { text, buttonText, buttonUrl });

  return redirect("/banner-settings");
}

export default function BannerSettings() {
  const { text, buttonText, buttonUrl } = useLoaderData();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Announcement Banner Settings</h1>
      <Form method="post">
        <div style={{ marginBottom: "1rem" }}>
          <label>Banner Text</label><br />
          <input type="text" name="text" defaultValue={text} style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Button Text</label><br />
          <input type="text" name="buttonText" defaultValue={buttonText} style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Button URL</label><br />
          <input type="url" name="buttonUrl" defaultValue={buttonUrl} style={{ width: "100%" }} />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#000", color: "#fff" }}>Save</button>
      </Form>
    </div>
  );
}
