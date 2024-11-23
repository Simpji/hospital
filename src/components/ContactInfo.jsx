import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

const ContactInfo = () => {
  const [coordinates, setCoordinates] = useState(null); 
  const [address, setAddress] = useState('20A Simbiat Abiola Ikeja, Lagos'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  useEffect(() => {
    const geocodeAddress = async (address) => {
      setLoading(true); 
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates([parseFloat(lat), parseFloat(lon)]); 
          setLoading(false);
        } else {
          setError('Address not found.');
          setLoading(false); 
        }
      } catch (error) {
        setError('Geocoding failed. Please try again later.');
        setLoading(false); 
      }
    };

    
    geocodeAddress(address);

  }, [address]); 

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-blue-600">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-500">Doctoral Medical Center</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Our Location</h3>
            <p className="text-gray-600">
              <strong>Doctoral Medical Center</strong>
              <br />
              123 20A Medical Road, Ikeja, Lagos, Nigeria
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
              <p className="text-gray-600">
                <strong>Phone:</strong> +234 8168606080
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> simplewilliams965@gamil.com
              </p>
              <p className="text-gray-600">
                <strong>Hours:</strong> Monday - Friday: 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="mt-2 p-4 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  className="mt-2 p-4 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  required
                  rows="4"
                  className="mt-2 p-4 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your message here"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Error and Loading States */}
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}

        {/* Map Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Find Us on the Map</h3>
          <div className="relative w-full h-96">
            {/* OpenStreetMap (OSM) with Leaflet.js */}
            {coordinates ? (
              <MapContainer
                center={coordinates}
                zoom={17}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={coordinates}>
                  <Popup>
                    <strong>{address}</strong> 
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="text-gray-600">Map is loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
