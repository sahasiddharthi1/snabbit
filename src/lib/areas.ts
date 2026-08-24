import type { Area, Expert } from "./types"

const experts: Record<string, Expert[]> = {
  "koramangala": [
    { name: "Priya Sharma", rating: 4.8, bookings: 342, photo: "👩" },
    { name: "Rohit Menon", rating: 4.7, bookings: 289, photo: "👨" },
    { name: "Anjali Nair", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Vikram Das", rating: 4.6, bookings: 198, photo: "👨" },
    { name: "Meera Iyer", rating: 4.8, bookings: 367, photo: "👩" }
  ],
  "hsr-layout": [
    { name: "Deepa Gupta", rating: 4.7, bookings: 276, photo: "👩" },
    { name: "Arjun Reddy", rating: 4.8, bookings: 334, photo: "👨" },
    { name: "Kavitha Raj", rating: 4.6, bookings: 213, photo: "👩" },
    { name: "Suresh Kumar", rating: 4.9, bookings: 389, photo: "👨" },
    { name: "Lakshmi Venkat", rating: 4.5, bookings: 178, photo: "👩" }
  ],
  "bellandur": [
    { name: "Nisha Pillai", rating: 4.8, bookings: 301, photo: "👩" },
    { name: "Rajesh Menon", rating: 4.7, bookings: 267, photo: "👨" },
    { name: "Swathi Rao", rating: 4.9, bookings: 445, photo: "👩" },
    { name: "Manoj Prasad", rating: 4.6, bookings: 234, photo: "👨" },
    { name: "Geeta Shetty", rating: 4.8, bookings: 312, photo: "👩" }
  ],
  "indiranagar": [
    { name: "Pooja Hegde", rating: 4.9, bookings: 398, photo: "👩" },
    { name: "Karthik S", rating: 4.7, bookings: 256, photo: "👨" },
    { name: "Divya Krishna", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Ashok Raj", rating: 4.6, bookings: 189, photo: "👨" },
    { name: "Revathi Sharma", rating: 4.5, bookings: 156, photo: "👩" }
  ],
  "jayanagar": [
    { name: "Shruthi Gowda", rating: 4.7, bookings: 278, photo: "👩" },
    { name: "Aditya Holla", rating: 4.8, bookings: 321, photo: "👨" },
    { name: "Vani Prakash", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Sathish Kumar", rating: 4.9, bookings: 412, photo: "👨" },
    { name: "Kavitha Devi", rating: 4.7, bookings: 267, photo: "👩" }
  ],
  "jp-nagar": [
    { name: "Preethi Rao", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Manjunath K", rating: 4.6, bookings: 213, photo: "👨" },
    { name: "Deepika Sharma", rating: 4.9, bookings: 389, photo: "👩" },
    { name: "Naveen Reddy", rating: 4.7, bookings: 267, photo: "👨" },
    { name: "Usha Nair", rating: 4.5, bookings: 189, photo: "👩" }
  ],
  "btm-layout": [
    { name: "Madhavi Latha", rating: 4.7, bookings: 256, photo: "👩" },
    { name: "Prashanth Gowda", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Swetha Raj", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Ravi Shankar", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Padma Shri", rating: 4.8, bookings: 312, photo: "👩" }
  ],
  "basavanagudi": [
    { name: "Suma Devi", rating: 4.8, bookings: 367, photo: "👩" },
    { name: "Venkatesh Prasad", rating: 4.7, bookings: 289, photo: "👨" },
    { name: "Ranjani Menon", rating: 4.9, bookings: 423, photo: "👩" },
    { name: "Gopal Krishna", rating: 4.6, bookings: 234, photo: "👨" },
    { name: "Lalitha Bai", rating: 4.7, bookings: 278, photo: "👩" }
  ],
  "malleshwaram": [
    { name: "Shobha Raj", rating: 4.9, bookings: 445, photo: "👩" },
    { name: "Chandrashekar", rating: 4.7, bookings: 312, photo: "👨" },
    { name: "Pushpa Kumari", rating: 4.8, bookings: 356, photo: "👩" },
    { name: "Raghunandan", rating: 4.6, bookings: 234, photo: "👨" },
    { name: "Vijaya Lakshmi", rating: 4.5, bookings: 189, photo: "👩" }
  ],
  "frazer-town": [
    { name: "Nasreen Begum", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Irfan Khan", rating: 4.8, bookings: 334, photo: "👨" },
    { name: "Rukhsana Ali", rating: 4.6, bookings: 223, photo: "👩" },
    { name: "Mohammed Rashid", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Farida Banu", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "shivaji-nagar": [
    { name: "Ayesha Siddiqui", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Tanveer Ahmed", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Nazreen Begum", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Asif Pasha", rating: 4.9, bookings: 412, photo: "👨" },
    { name: "Rabia Khatoon", rating: 4.8, bookings: 356, photo: "👩" }
  ],
  "rajajinagar": [
    { name: "Shilpa Shetty", rating: 4.7, bookings: 289, photo: "👩" },
    { name: "Rajesh Verma", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Nandini Prasad", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Vijay Kumar", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Sunitha Rao", rating: 4.7, bookings: 267, photo: "👩" }
  ],
  "vijayanagar": [
    { name: "Padma Devi", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Mohan Raj", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Lakshmi Priya", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Srinivas Rao", rating: 4.7, bookings: 289, photo: "👨" },
    { name: "Kamala Bai", rating: 4.5, bookings: 178, photo: "👩" }
  ],
  "whitefield": [
    { name: "Arundhati Reddy", rating: 4.9, bookings: 423, photo: "👩" },
    { name: "Karthik Gowda", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Pallavi Singh", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Nitin Sharma", rating: 4.6, bookings: 234, photo: "👨" },
    { name: "Sunita Menon", rating: 4.7, bookings: 267, photo: "👩" }
  ],
  "marathahalli": [
    { name: "Ramya Krishnan", rating: 4.8, bookings: 356, photo: "👩" },
    { name: "Rajesh Nair", rating: 4.7, bookings: 289, photo: "👨" },
    { name: "Divya Prakash", rating: 4.9, bookings: 398, photo: "👩" },
    { name: "Sanjay Patel", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Anitha Kumari", rating: 4.8, bookings: 334, photo: "👩" }
  ],
  "electronic-city": [
    { name: "Shravani Reddy", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Vinod Kumar", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Hema Malini", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Pradeep Menon", rating: 4.9, bookings: 412, photo: "👨" },
    { name: "Jyothi Prasad", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "banashankari": [
    { name: "Vasantha Kumari", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Ganesh Prasad", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Saraswathi Raj", rating: 4.9, bookings: 398, photo: "👩" },
    { name: "Madhusudan", rating: 4.6, bookings: 234, photo: "👨" },
    { name: "Parvathi Bai", rating: 4.5, bookings: 189, photo: "👩" }
  ],
  "kumaraswamy-layout": [
    { name: "Ranjitha Devi", rating: 4.7, bookings: 256, photo: "👩" },
    { name: "Chetan Kumar", rating: 4.8, bookings: 323, photo: "👨" },
    { name: "Geeta Prakash", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Suresh Babu", rating: 4.9, bookings: 389, photo: "👨" },
    { name: "Shashi Rekha", rating: 4.7, bookings: 267, photo: "👩" }
  ],
  "hebbal": [
    { name: "Annapurna Devi", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Ravindra Prasad", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Shalini Menon", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Prakash Raj", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Kamala Devi", rating: 4.8, bookings: 334, photo: "👩" }
  ],
  "yelahanka": [
    { name: "Sarojini Reddy", rating: 4.7, bookings: 289, photo: "👩" },
    { name: "Bharath Gowda", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Vidya Lakshmi", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Nagaraj Shetty", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Uma Devi", rating: 4.7, bookings: 267, photo: "👩" }
  ],
  "sarjapur-road": [
    { name: "Chitralekha", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Arun Kumar", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Meenakshi Raj", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Deepak Prasad", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Geetha Nair", rating: 4.8, bookings: 356, photo: "👩" }
  ],
  "bannerghatta-road": [
    { name: "Kavitha Shetty", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Rajesh Menon", rating: 4.8, bookings: 334, photo: "👨" },
    { name: "Latha Prasad", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Srinivas Menon", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Padma Raj", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "kengeri": [
    { name: "Sumathi Rao", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Venkatesh Gowda", rating: 4.7, bookings: 289, photo: "👨" },
    { name: "Shobha Devi", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Prashanth Raj", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Lalitha Prasad", rating: 4.8, bookings: 334, photo: "👩" }
  ],
  "kr-puram": [
    { name: "Nirmala Devi", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Kumar Raj", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Sujatha Menon", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Ravi Prasad", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Geeta Bai", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "hoodi": [
    { name: "Asha Reddy", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Manohar Prasad", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Vijaya Lakshmi", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Girish Kumar", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Saroja Devi", rating: 4.8, bookings: 356, photo: "👩" }
  ],
  "itpl": [
    { name: "Rashmi Menon", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Anil Kumar", rating: 4.8, bookings: 334, photo: "👨" },
    { name: "Sarojini Bai", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Rajendra Prasad", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Usha Devi", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "brookefield": [
    { name: "Kavitha Gowda", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Suresh Nair", rating: 4.7, bookings: 289, photo: "👨" },
    { name: "Meera Raj", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Prakash Menon", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Padma Shri", rating: 4.8, bookings: 334, photo: "👩" }
  ],
  "kadugodi": [
    { name: "Shanthi Devi", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Rajesh Prasad", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Lakshmi Menon", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Narasimha Raju", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Kamala Bai", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "varthur": [
    { name: "Swathi Reddy", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Vinay Kumar", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Annapurna Bai", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Mohan Raj", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Vasanthi Devi", rating: 4.8, bookings: 356, photo: "👩" }
  ],
  "gunjur": [
    { name: "Nalini Prasad", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Srinivas Gowda", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Hema Devi", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Ramesh Babu", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Geetha Kumari", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "jakkur": [
    { name: "Prathima Reddy", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Kishore Kumar", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Shashikala", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Mahesh Prasad", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Chandrika Bai", rating: 4.8, bookings: 356, photo: "👩" }
  ],
  "thanisandra": [
    { name: "Latha Shetty", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Raghavendra Prasad", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Sarojini Nair", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Prabhakar Raj", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Vasantha Bai", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "kalyan-nagar": [
    { name: "Shubha Menon", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Sanjay Prasad", rating: 4.7, bookings: 289, photo: "👨" },
    { name: "Nandini Gowda", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Arun Raj", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Padmavathi", rating: 4.8, bookings: 334, photo: "👩" }
  ],
  "hennur": [
    { name: "Ranjitha Menon", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Bharath Reddy", rating: 4.8, bookings: 334, photo: "👨" },
    { name: "Saraswathi Bai", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Venkata Prasad", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Chitra Devi", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "banswadi": [
    { name: "Uma Prakash", rating: 4.8, bookings: 345, photo: "👩" },
    { name: "Krishna Raj", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Padma Shri", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Gopal Menon", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Shanthala Devi", rating: 4.8, bookings: 334, photo: "👩" }
  ],
  "kammanahalli": [
    { name: "Nirmala Gowda", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Ravi Shankar", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Lakshmi Bai", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Suresh Reddy", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Geetha Nair", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "nagarbhavi": [
    { name: "Vijayalakshmi", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Manjunath Prasad", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Sharada Devi", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Rajesh Gowda", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Kamala Prasad", rating: 4.8, bookings: 356, photo: "👩" }
  ],
  "sahakar-nagar": [
    { name: "Sumithra Bai", rating: 4.7, bookings: 267, photo: "👩" },
    { name: "Vasudev Prasad", rating: 4.8, bookings: 345, photo: "👨" },
    { name: "Shylaja Menon", rating: 4.6, bookings: 234, photo: "👩" },
    { name: "Narasimha Prasad", rating: 4.9, bookings: 398, photo: "👨" },
    { name: "Parvathi Devi", rating: 4.7, bookings: 289, photo: "👩" }
  ],
  "basaveshwara-nagar": [
    { name: "Lalitha Gowda", rating: 4.8, bookings: 334, photo: "👩" },
    { name: "Srinivasan Raj", rating: 4.7, bookings: 278, photo: "👨" },
    { name: "Vasantha Kumari", rating: 4.9, bookings: 412, photo: "👩" },
    { name: "Prashanth Menon", rating: 4.6, bookings: 223, photo: "👨" },
    { name: "Sharada Bai", rating: 4.8, bookings: 356, photo: "👩" }
  ]
}

const areaNames: Record<string, string> = {
  "koramangala": "Koramangala",
  "hsr-layout": "HSR Layout",
  "bellandur": "Bellandur",
  "indiranagar": "Indiranagar",
  "jayanagar": "Jayanagar",
  "jp-nagar": "JP Nagar",
  "btm-layout": "BTM Layout",
  "basavanagudi": "Basavanagudi",
  "malleshwaram": "Malleshwaram",
  "frazer-town": "Frazer Town",
  "shivaji-nagar": "Shivaji Nagar",
  "rajajinagar": "Rajajinagar",
  "vijayanagar": "Vijayanagar",
  "whitefield": "Whitefield",
  "marathahalli": "Marathahalli",
  "electronic-city": "Electronic City",
  "banashankari": "Banashankari",
  "kumaraswamy-layout": "Kumaraswamy Layout",
  "hebbal": "Hebbal",
  "yelahanka": "Yelahanka",
  "sarjapur-road": "Sarjapur Road",
  "bannerghatta-road": "Bannerghatta Road",
  "kengeri": "Kengeri",
  "kr-puram": "KR Puram",
  "hoodi": "Hoodi",
  "itpl": "ITPL",
  "brookefield": "Brookefield",
  "kadugodi": "Kadugodi",
  "varthur": "Varthur",
  "gunjur": "Gunjur",
  "jakkur": "Jakkur",
  "thanisandra": "Thanisandra",
  "kalyan-nagar": "Kalyan Nagar",
  "hennur": "Hennur",
  "banswadi": "Banaswadi",
  "kammanahalli": "Kammanahalli",
  "nagarbhavi": "Nagarbhavi",
  "sahakar-nagar": "Sahakar Nagar",
  "basaveshwara-nagar": "Basaveshwara Nagar"
}

const areaCoords: Record<string, { lat: number; lng: number }> = {
  "koramangala": { lat: 12.9352, lng: 77.6245 },
  "hsr-layout": { lat: 12.9116, lng: 77.6389 },
  "bellandur": { lat: 12.9166, lng: 77.6833 },
  "indiranagar": { lat: 12.9784, lng: 77.6408 },
  "jayanagar": { lat: 12.9226, lng: 77.5831 },
  "jp-nagar": { lat: 12.8910, lng: 77.5844 },
  "btm-layout": { lat: 12.9166, lng: 77.6103 },
  "basavanagudi": { lat: 12.9226, lng: 77.5736 },
  "malleshwaram": { lat: 13.0031, lng: 77.5640 },
  "frazer-town": { lat: 12.9930, lng: 77.6103 },
  "shivaji-nagar": { lat: 12.9850, lng: 77.5780 },
  "rajajinagar": { lat: 12.9930, lng: 77.5545 },
  "vijayanagar": { lat: 12.9592, lng: 77.5347 },
  "whitefield": { lat: 12.9698, lng: 77.7500 },
  "marathahalli": { lat: 12.9560, lng: 77.7014 },
  "electronic-city": { lat: 12.8410, lng: 77.6606 },
  "banashankari": { lat: 12.9256, lng: 77.5488 },
  "kumaraswamy-layout": { lat: 12.9074, lng: 77.5640 },
  "hebbal": { lat: 13.0358, lng: 77.5970 },
  "yelahanka": { lat: 13.1007, lng: 77.5963 },
  "sarjapur-road": { lat: 12.9092, lng: 77.6917 },
  "bannerghatta-road": { lat: 12.8800, lng: 77.6000 },
  "kengeri": { lat: 12.9084, lng: 77.4852 },
  "kr-puram": { lat: 12.9988, lng: 77.7450 },
  "hoodi": { lat: 12.9935, lng: 77.7273 },
  "itpl": { lat: 12.9892, lng: 77.7446 },
  "brookefield": { lat: 12.9630, lng: 77.7340 },
  "kadugodi": { lat: 12.9972, lng: 77.7620 },
  "varthur": { lat: 12.9360, lng: 77.7470 },
  "gunjur": { lat: 12.9280, lng: 77.7380 },
  "jakkur": { lat: 13.0410, lng: 77.5860 },
  "thanisandra": { lat: 13.0250, lng: 77.5830 },
  "kalyan-nagar": { lat: 13.0110, lng: 77.6390 },
  "hennur": { lat: 13.0440, lng: 77.6390 },
  "banswadi": { lat: 13.0070, lng: 77.6540 },
  "kammanahalli": { lat: 13.0130, lng: 77.6490 },
  "nagarbhavi": { lat: 12.9620, lng: 77.5140 },
  "sahakar-nagar": { lat: 13.0250, lng: 77.5430 },
  "basaveshwara-nagar": { lat: 12.9860, lng: 77.5410 }
}

const areaAbbreviations: Record<string, string> = {
  "hsr": "hsr-layout",
  "hsr layout": "hsr-layout",
  "btm": "btm-layout",
  "btm layout": "btm-layout",
  "jp nagar": "jp-nagar",
  "j.p. nagar": "jp-nagar",
  "jp": "jp-nagar",
  "frazer": "frazer-town",
  "fraser": "frazer-town",
  "frazer town": "frazer-town",
  "fraser town": "frazer-town",
  "shivaji": "shivaji-nagar",
  "shivaji nagar": "shivaji-nagar",
  "sahakar": "sahakar-nagar",
  "sahakar nagar": "sahakar-nagar",
  "rajajinagar": "rajajinagar",
  "rajaji nagar": "rajajinagar",
  "vijayanagar": "vijayanagar",
  "vijayanagara": "vijayanagar",
  "basaveshwara": "basaveshwara-nagar",
  "basaveshwara nagar": "basaveshwara-nagar",
  "marathahalli": "marathahalli",
  "marathahally": "marathahalli",
  "kr puram": "kr-puram",
  "k.r. puram": "kr-puram",
  "electronic city phase 1": "electronic-city",
  "electronic city phase 2": "electronic-city",
  "electronic city": "electronic-city",
  "e-city": "electronic-city",
  "e city": "electronic-city",
  "kumaraswamy": "kumaraswamy-layout",
  "kumaraswamy layout": "kumaraswamy-layout",
  "kalyan nagar": "kalyan-nagar",
  "kalyannagar": "kalyan-nagar",
  "sarjapur": "sarjapur-road",
  "sarjapur road": "sarjapur-road",
  "bannerghatta": "bannerghatta-road",
  "bannerghatta road": "bannerghatta-road",
  "malleshwaram": "malleshwaram",
  "malleshwara": "malleshwaram",
  "koramangala": "koramangala",
  "bellandur": "bellandur",
  "indiranagar": "indiranagar",
  "jayanagar": "jayanagar",
  "basavanagudi": "basavanagudi",
  "whitefield": "whitefield",
  "banashankari": "banashankari",
  "hebbal": "hebbal",
  "yelahanka": "yelahanka",
  "kengeri": "kengeri",
  "hoodi": "hoodi",
  "itpl": "itpl",
  "brookefield": "brookefield",
  "kadugodi": "kadugodi",
  "varthur": "varthur",
  "gunjur": "gunjur",
  "jakkur": "jakkur",
  "thanisandra": "thanisandra",
  "hennur": "hennur",
  "banswadi": "banswadi",
  "kammanahalli": "kammanahalli",
  "nagarbhavi": "nagarbhavi"
}

export function resolveArea(text: string): string | undefined {
  const lower = text.toLowerCase().trim()

  for (const [key, slug] of Object.entries(areaAbbreviations)) {
    if (lower.includes(key)) {
      return slug
    }
  }

  for (const slug of Object.keys(experts)) {
    if (lower.includes(slug)) {
      return slug
    }
  }

  return undefined
}

export function getArea(slug: string): Area | undefined {
  const areaExperts = experts[slug]
  const name = areaNames[slug]
  if (!areaExperts || !name) return undefined

  return {
    slug,
    name,
    experts: areaExperts,
    availableServices: ["cleaning", "plumbing", "electrical", "painting"]
  }
}

export function getAreas(): Area[] {
  return Object.keys(experts)
    .map((slug) => getArea(slug))
    .filter((area): area is Area => area !== undefined)
}

export function randomExpert(slug: string): Expert | undefined {
  const areaExperts = experts[slug]
  if (!areaExperts || areaExperts.length === 0) return undefined
  return areaExperts[Math.floor(Math.random() * areaExperts.length)]
}

export function getEta(): string {
  return `${10 + Math.floor(Math.random() * 15)} min`
}

export function getArrivalSlot(): string {
  const now = new Date()
  const minutesToAdd = 15 + Math.floor(Math.random() * 16)
  const arrival = new Date(now.getTime() + minutesToAdd * 60 * 1000)
  return arrival.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })
}

export function getGoogleMapsLink(areaSlug: string): string {
  const coords = areaCoords[areaSlug]
  if (!coords) return ""
  return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
}

export function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export { experts, areaNames, areaCoords }
