import React, { useState, useEffect } from "react";
// Admin dashboard component with localStorage backed CMS.
// This component implements a simple login and editing interface
// for updating site content such as hero text, services, social links,
// contact info and gallery images. All changes persist to
// localStorage under the "zazContent" key. The component also
// exposes a hook `useZazContent` for reading the content on the
// public pages. See instructions for wiring this into your app.

// Optionally configure Cloudinary here. If these values are set to
// non-empty strings, the gallery upload button will upload images to
// Cloudinary and store the resulting secure URL in the gallery.
const CLOUD_NAME = "";
const UPLOAD_PRESET = "";

// Default content structure. This is used when there is nothing
// persisted in localStorage. Feel free to customise the defaults.
const DEFAULT_CONTENT = {
  heroTitle: "Premium Auto Detailing in Coastal NC",
  heroSubtitle:
    "Zaz Precision Auto Detailing, LLC brings showroom quality to your driveway.",
  services: [
    {
      title: "Exterior Wash",
      description: "Hand wash, dry & tire shine.",
      price: "",
    },
    {
      title: "Interior Cleaning",
      description: "Vacuum, wipe down, glass cleaning.",
      price: "",
    },
  ],
  social: {
    instagram: "https://www.instagram.com/zaz_precision_auto_detailing",
    youtube: "https://www.youtube.com/@ZAZPRECISIONAUTODETAILING",
  },
  contact: {
    phone: "",
    email: "",
    hours: "",
  },
  gallery: [],
};

/**
 * Read the persisted content from localStorage.
 * If nothing is stored or the stored value is invalid, return the defaults.
 */
function loadContent() {
  try {
    const raw = localStorage.getItem("zazContent");
    if (!raw) return DEFAULT_CONTENT;
    const parsed = JSON.parse(raw);
    // Ensure all keys exist to avoid undefined access.
    return {
      ...DEFAULT_CONTENT,
      ...parsed,
      services: Array.isArray(parsed.services)
        ? parsed.services.map((s) => ({
            title: s.title || "",
            description: s.description || "",
            price: s.price || "",
          }))
        : DEFAULT_CONTENT.services,
      social: {
        ...DEFAULT_CONTENT.social,
        ...(parsed.social || {}),
      },
      contact: {
        ...DEFAULT_CONTENT.contact,
        ...(parsed.contact || {}),
      },
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
    };
  } catch (e) {
    console.error("Failed to parse stored zazContent", e);
    return DEFAULT_CONTENT;
  }
}

/**
 * Persist the content to localStorage.
 * @param {object} content
 */
function persistContent(content) {
  localStorage.setItem("zazContent", JSON.stringify(content));
}

/**
 * Hook that provides access to the persisted content.
 * It returns the current content and a save function.
 * Components can use this to read dynamic content on the public site.
 */
export function useZazContent() {
  const [content, setContent] = useState(() => loadContent());
  // Save changes to localStorage whenever content changes.
  useEffect(() => {
    persistContent(content);
  }, [content]);
  // Save helper which merges and persists.
  const saveContent = (newContent) => {
    setContent((prev) => {
      const merged = { ...prev, ...newContent };
      persistContent(merged);
      return merged;
    });
  };
  return { content, saveContent };
}

/**
 * Perform an image upload to Cloudinary.
 * @param {File} file
 * @returns {Promise<string>} The secure URL of the uploaded image.
 */
async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error(
      `Upload failed: ${response.status} ${response.statusText}`
    );
  }
  const result = await response.json();
  return result.secure_url;
}

export default function AdminDashboard() {
  // Login state persisted in localStorage under zazLoggedIn.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("zazLoggedIn") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Content state.
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [services, setServices] = useState([]);
  const [social, setSocial] = useState({ instagram: "", youtube: "" });
  const [contact, setContact] = useState({ phone: "", email: "", hours: "" });
  const [gallery, setGallery] = useState([]);

  // Load content on mount.
  useEffect(() => {
    const content = loadContent();
    setHeroTitle(content.heroTitle);
    setHeroSubtitle(content.heroSubtitle);
    setServices(content.services);
    setSocial(content.social);
    setContact(content.contact);
    setGallery(content.gallery);
  }, []);

  // Save button handler.
  const handleSave = () => {
    const content = {
      heroTitle,
      heroSubtitle,
      services,
      social,
      contact,
      gallery,
    };
    persistContent(content);
    alert("Changes saved!");
  };

  // Export JSON.
  const handleExport = () => {
    const content = {
      heroTitle,
      heroSubtitle,
      services,
      social,
      contact,
      gallery,
    };
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "zaz-content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON handler.
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        // Validate keys and merge with defaults.
        const merged = {
          ...DEFAULT_CONTENT,
          ...parsed,
          services: Array.isArray(parsed.services)
            ? parsed.services.map((s) => ({
                title: s.title || "",
                description: s.description || "",
                price: s.price || "",
              }))
            : DEFAULT_CONTENT.services,
          social: {
            ...DEFAULT_CONTENT.social,
            ...(parsed.social || {}),
          },
          contact: {
            ...DEFAULT_CONTENT.contact,
            ...(parsed.contact || {}),
          },
          gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
        };
        setHeroTitle(merged.heroTitle);
        setHeroSubtitle(merged.heroSubtitle);
        setServices(merged.services);
        setSocial(merged.social);
        setContact(merged.contact);
        setGallery(merged.gallery);
        persistContent(merged);
        alert("Content imported successfully.");
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Service handlers.
  const handleServiceChange = (index, field, value) => {
    setServices((prev) => {
      const updated = prev.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      );
      return updated;
    });
  };
  const addService = () => {
    setServices((prev) => [
      ...prev,
      { title: "", description: "", price: "" },
    ]);
  };
  const removeService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  // Gallery handlers.
  const addGalleryUrl = () => {
    const url = prompt("Enter image URL");
    if (url) {
      setGallery((prev) => [...prev, url]);
    }
  };
  const removeGalleryItem = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      alert("Cloudinary not configured.");
      return;
    }
    try {
      const url = await uploadToCloudinary(file);
      setGallery((prev) => [...prev, url]);
    } catch (err) {
      alert(err.message);
    }
  };

  // Login logic.
  const handleLogin = () => {
    if (username === "admin" && password === "zaz2025!") {
      localStorage.setItem("zazLoggedIn", "true");
      setIsLoggedIn(true);
      // Reset login fields.
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid login.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("zazLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="p-10 max-w-md mx-auto">
        <h1 className="text-xl mb-4 font-bold">Admin Login</h1>
        <input
          className="block w-full p-2 mb-2 border"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="block w-full p-2 mb-4 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Hero Section</h3>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="block w-full p-2 border mb-2"
          value={heroTitle}
          onChange={(e) => setHeroTitle(e.target.value)}
        />
        <label className="block text-sm font-medium mb-1">Subtitle</label>
        <textarea
          className="block w-full p-2 border"
          rows={3}
          value={heroSubtitle}
          onChange={(e) => setHeroSubtitle(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Services</h3>
        {services.map((service, i) => (
          <div key={i} className="mb-4 border p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Service {i + 1}</span>
              <button
                className="text-red-500 text-sm"
                onClick={() => removeService(i)}
              >
                Remove
              </button>
            </div>
            <input
              className="block w-full p-2 border mb-1"
              placeholder="Service Title"
              value={service.title}
              onChange={(e) =>
                handleServiceChange(i, "title", e.target.value)
              }
            />
            <textarea
              className="block w-full p-2 border mb-1"
              rows={2}
              placeholder="Service Description"
              value={service.description}
              onChange={(e) =>
                handleServiceChange(i, "description", e.target.value)
              }
            />
            <input
              className="block w-full p-2 border"
              placeholder="Price (optional)"
              value={service.price}
              onChange={(e) =>
                handleServiceChange(i, "price", e.target.value)
              }
            />
          </div>
        ))}
        <button
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={addService}
        >
          Add Service
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Social Media Links</h3>
        <label className="block text-sm font-medium mb-1">Instagram</label>
        <input
          className="block w-full p-2 border mb-2"
          value={social.instagram}
          onChange={(e) =>
            setSocial((prev) => ({ ...prev, instagram: e.target.value }))
          }
        />
        <label className="block text-sm font-medium mb-1">YouTube</label>
        <input
          className="block w-full p-2 border"
          value={social.youtube}
          onChange={(e) =>
            setSocial((prev) => ({ ...prev, youtube: e.target.value }))
          }
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          className="block w-full p-2 border mb-2"
          value={contact.phone}
          onChange={(e) =>
            setContact((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          className="block w-full p-2 border mb-2"
          value={contact.email}
          onChange={(e) =>
            setContact((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label className="block text-sm font-medium mb-1">Hours</label>
        <input
          className="block w-full p-2 border"
          value={contact.hours}
          onChange={(e) =>
            setContact((prev) => ({ ...prev, hours: e.target.value }))
          }
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Gallery</h3>
        <div className="space-y-2">
          {gallery.map((url, i) => (
            <div
              key={i}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={url}
                  alt={`Gallery ${i}`}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="text-xs break-all">{url}</span>
              </div>
              <button
                className="text-red-500 text-sm"
                onClick={() => removeGalleryItem(i)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center space-x-3">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={addGalleryUrl}
          >
            Add by URL
          </button>
          <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
        {(!CLOUD_NAME || !UPLOAD_PRESET) && (
          <p className="text-xs text-gray-500 mt-2">
            Set CLOUD_NAME and UPLOAD_PRESET at the top of this file to enable
            Cloudinary uploads.
          </p>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded shadow"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-3 rounded shadow"
          onClick={handleExport}
        >
          Export JSON
        </button>
        <label className="bg-orange-500 text-white px-6 py-3 rounded shadow cursor-pointer">
          Import JSON
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
      </div>
    </div>
  );
}
