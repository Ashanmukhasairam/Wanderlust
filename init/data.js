const sampleListings = [
    {
      title: "Cozy Mountain Retreat",
      description: "A charming cabin nestled in the mountains, perfect for a weekend gateway.",
      image: {
        url: "https://www.holidify.com/images/compressed/3660.jpg",
        filename: "mountain_retreat.jpg",
      },
      price: 150,
      location: "Leh, India",
      country: "India",
      category: "mountains",
      geometry: {
        type: "Point",
        coordinates: [77.5833, 34.1526], // Longitude, Latitude
      },
    },
    {
      title: "Beachfront Paradise",
      description: "A luxurious beachfront property with stunning ocean views.",
      image: {
        url: "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_479585620_20191024174904.jpg",
        filename: "beachfront_paradise.jpg",
      },
      price: 300,
      location: "Goa, India",
      country: "India",
      category: "beaches",
      geometry: {
        type: "Point",
        coordinates: [73.8567, 15.2993],
      },
    },
    {
      title: "Historic City Center Apartment",
      description: "A spacious apartment located in the heart of the city's historic district.",
      image: {
        url: "https://hblimg.mmtcdn.com/content/hubble/img/leh/mmt/destination/m_leh-landscape_l_400_640.jpg",
        filename: "city_center_apartment.jpg",
      },
      price: 200,
      location: "Delhi, India",
      country: "India",
      category: "iconic-cities",
      geometry: {
        type: "Point",
        coordinates: [77.1025, 28.7041],
      },
    },
    {
      title: "Countryside Farmhouse",
      description: "A peaceful farmhouse surrounded by lush greenery, ideal for nature lovers.",
      image: {
        url: "https://hblimg.mmtcdn.com/content/hubble/img/delhi/mmt/activities/m_activities_delhi_red_fort_l_341_817.jpg",
        filename: "countryside_farmhouse.jpg",
      },
      price: 120,
      location: "Punjab, India",
      country: "India",
      category: "farms",
      geometry: {
        type: "Point",
        coordinates: [75.3412, 31.1471],
      },
    },
    {
      title: "Arctic Adventure Lodge",
      description: "An exclusive lodge offering unique experiences in the Arctic region.",
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvqN19JThr6rJ7fJxsRjDMqmjPg4bjV0_jg&s",
        filename: "arctic_adventure_lodge.jpg",
      },
      price: 500,
      location: "Svalbard, Norway",
      country: "Norway",
      category: "arctic",
      geometry: {
        type: "Point",
        coordinates: [15.6333, 78.2167],
      },
    },
    {
      title: "Luxury Hotel Suite",
      description: "A lavish hotel suite with state-of-the-art amenities and services.",
      image: {
        url: "https://www.holidify.com/images/compressed/3660.jpg",
        filename: "luxury_hotel_suite.jpg",
      },
      price: 400,
      location: "Mumbai, India",
      country: "India",
      category: "hotels",
      geometry: {
        type: "Point",
        coordinates: [72.8777, 19.0760],
      },
    },
    {
      title: "Modern Urban Loft",
      description: "A stylish loft apartment in the city's vibrant downtown area.",
      image: {
        url: "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_479585620_20191024174904.jpg",
        filename: "urban_loft.jpg",
      },
      price: 250,
      location: "Bengaluru, India",
      country: "India",
      category: "rooms",
      geometry: {
        type: "Point",
        coordinates: [77.5946, 12.9716],
      },
    },
    {
      title: "Amazing Poolside Villa",
      description: "A luxurious villa featuring an infinity pool with panoramic views.",
      image: {
        url: "https://hblimg.mmtcdn.com/content/hubble/img/leh/mmt/destination/m_leh-landscape_l_400_640.jpg",
        filename: "poolside_villa.jpg",
      },
      price: 350,
      location: "Kochi, India",
      country: "India",
      category: "amazing-pools",
      geometry: {
        type: "Point",
        coordinates: [76.2673, 9.9312],
      },
    },
    {
      title: "Camping Site by the Lake",
      description: "A serene camping site located beside a tranquil lake, perfect for outdoor enthusiasts.",
      image: {
        url: "https://hblimg.mmtcdn.com/content/hubble/img/delhi/mmt/activities/m_activities_delhi_red_fort_l_341_817.jpg",
        filename: "lake_camping_site.jpg",
      },
      price: 50,
      location: "Nainital, India",
      country: "India",
      category: "camping",
      geometry: {
        type: "Point",
        coordinates: [79.4591, 29.3919],
      },
    },
    {
      title: "Iconic City Penthouse",
      description: "A luxurious penthouse offering breathtaking views of the city's skyline.",
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvqN19JThr6rJ7fJxsRjDMqmjPg4bjV0_jg&s",
        filename: "city_penthouse.jpg",
      },
      price: 600,
      location: "New York, USA",
      country: "USA",
      category: "iconic-cities",
      geometry: {
        type: "Point",
        coordinates: [-74.0060, 40.7128],
      },
    },
  ];
  

module.exports = { data: sampleListings };