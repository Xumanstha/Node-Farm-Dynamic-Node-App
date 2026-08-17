# 🌽 Node Farm - Learning Node.js Fundamentals

A dynamic e-commerce website built with **Node.js vanilla HTTP server** to learn core backend concepts. This project demonstrates how to build a full-featured web application without frameworks, using only Node.js built-in modules.

## 📚 Project Overview

**Node Farm** is an agricultural product marketplace website that showcases fresh produce with individual product pages and an API endpoint. The project is designed to teach fundamental Node.js concepts including:

- HTTP server creation
- File system operations
- URL routing and parsing
- Template rendering
- JSON data handling
- Module exports and imports
- Asynchronous operations

## 🎯 Key Learning Outcomes

This project covers essential Node.js skills:

### 1. **HTTP Server Basics**
- Creating a server using the `http` module
- Handling HTTP requests and responses
- Setting content-type headers
- Understanding request URL parsing

### 2. **File System Operations (fs Module)**
- Reading files synchronously and asynchronously
- Writing files to disk
- Working with file paths using `__dirname`
- Template file management

### 3. **URL Routing & Parsing**
- Using the `URL` API for parsing URLs
- Handling query parameters
- Creating dynamic routes
- Implementing proper HTTP status codes (200, 404)

### 4. **Template Rendering**
- Replacing template variables with dynamic data
- Using regular expressions for string replacement
- Creating reusable HTML templates

### 5. **Module System**
- Creating custom modules (CommonJS)
- Exporting and importing modules
- Organizing code into separate files

### 6. **Data Management**
- Reading and parsing JSON files
- Working with arrays and objects
- Transforming data for display

## 📁 Project Structure

```
Node-Farm-Dynamic-Node-App/
├── index.js                          # Main server file
├── package.json                      # Project metadata & dependencies
├── readme.md                         # This file
├── dev-data/
│   └── data.json                    # Product database (JSON)
├── modules/
│   └── replaceTemplate.js           # Template rendering function
├── templates/
│   ├── template-overview.html       # Homepage layout
│   ├── template-card.html           # Product card component
│   ├── template-product.html        # Individual product page
│   └── template-overview1.html      # Alternative overview (styled)
└── txt/
    └── [Various .txt files]         # File system operation examples
```

## 📖 How the Application Works

### **1. Server Initialization** (`index.js`)

The application starts by:
1. Loading HTML templates from the `templates/` folder
2. Reading product data from `dev-data/data.json`
3. Creating a URL slug for each product using the `slugify` package
4. Creating an HTTP server that listens on port 8000

### **2. URL Routing**

The server handles three main routes:

#### **Route 1: Homepage (`/` or `/overview`)**
- Loads `template-overview.html`
- Generates product cards by iterating through the JSON data
- Uses `replaceTemplate()` to insert product information into each card
- Combines all cards into a single HTML page
- Response: Fully rendered HTML page

```
GET / → Overview page with all products
GET /overview → Same as /
```

#### **Route 2: Product Details (`/product`)**
- Accepts a query parameter: `?id=0` (product ID)
- Loads `template-product.html`
- Fetches the specific product from JSON data using the ID
- Replaces template placeholders with product details
- Response: Individual product page with full information

```
GET /product?id=0 → Fresh Avocados detail page
GET /product?id=1 → Goat and Sheep Cheese detail page
```

#### **Route 3: API Endpoint (`/api`)**
- Returns raw JSON data of all products
- Used for programmatic access
- Response: JSON array of products

```
GET /api → Returns product data as JSON
```

#### **Route 4: 404 Error Handling**
- Any other URL returns a 404 error page
- Demonstrates proper HTTP error handling

### **3. Template Rendering** (`modules/replaceTemplate.js`)

The `replaceTemplate` function:
- Takes an HTML template and a product object
- Replaces placeholders like `{%PRODUCTNAME%}` with actual data
- Handles conditional rendering (hides "Organic" badge for non-organic products)
- Returns the processed HTML

**Template Placeholders:**
```
{%PRODUCTNAME%}    → Product name
{%IMAGE%}          → Emoji or image icon
{%PRICE%}          → Price in EUR
{%FROM%}           → Country of origin
{%NUTRIENTS%}      → Health benefits
{%QUANTITY%}       → Quantity per unit
{%DESCRIPTION%}    → Full product description
{%ID%}             → Product ID
{%NOT_ORGANIC%}    → CSS class for non-organic products
```

### **4. Product Data** (`dev-data/data.json`)

Product structure:
```json
{
  "id": 0,
  "productName": "Fresh Avocados",
  "image": "🥑",
  "from": "Spain",
  "nutrients": "Vitamin B, Vitamin K",
  "quantity": "4",
  "price": "6.50",
  "organic": true,
  "description": "..."
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd Node-Farm-Dynamic-Node-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs:
   - `slugify` - Converts product names to URL-friendly format
   - `nodemon` - Auto-restarts server on file changes (dev only)

### Running the Application

**Development Mode (with auto-reload):**
```bash
npm start
```

**Manual Start:**
```bash
node index.js
```

The server will start on `http://localhost:8000`

## 🌐 Testing the Application

Once the server is running:

### **View Homepage**
```
Open: http://localhost:8000/
```
Shows all products in card format

### **View Product Details**
```
Open: http://localhost:8000/product?id=0
```
Replace `0` with any product ID (0-7) to see different products

### **Access API**
```
Open: http://localhost:8000/api
```
Returns JSON data of all products (useful for frontend frameworks)

## 💡 Key Concepts Explained

### **Blocking vs Non-Blocking Code** (in `index.js` comments)
The code demonstrates:
- **Synchronous (Blocking)**: `fs.readFileSync()` - waits for file to read
- **Asynchronous (Non-Blocking)**: `fs.readFile()` - reads file in background

### **Module Exports**
Using CommonJS module system:
```javascript
module.exports = function // Export
const func = require('./path') // Import
```

### **String Replacement for Templating**
```javascript
template.replace(/{%PLACEHOLDER%}/g, value)
// /g = global flag (replace all occurrences)
```

### **URL Parsing**
```javascript
const myUrl = new URL(req.url, `http://${req.headers.host}`);
const id = myUrl.searchParams.get("id"); // Get query parameter
```

## 🎨 Frontend Styling

The project includes enhanced CSS styling:
- **CSS Variables** for consistent theming
- **Responsive Design** for mobile devices
- **Animations** for better UX
- **Dark Mode Support**
- **Accessibility Features** (focus states, keyboard navigation)
- **Smooth Transitions** for interactive elements

## 📦 Dependencies

### Production
- **slugify** (~1.6.9) - Converts strings to URL-friendly slugs

### Development
- **nodemon** (^3.1.14) - Automatically restarts server on file changes

## 🔄 Common Development Tasks

### Adding a New Product
1. Add a new object to `dev-data/data.json`
2. Assign a unique `id`
3. Fill in all required fields
4. Server will automatically render it on the homepage

### Customizing Templates
- Edit HTML files in `templates/` folder
- Add new placeholders like `{%NEWFIELD%}`
- Update `replaceTemplate.js` to handle the new field

### Styling
- CSS is embedded in each HTML template
- Modern CSS Variables and responsive design included
- Use DevTools (F12) to inspect and modify styles

## 🧪 Code Examples from Project

### Reading a File
```javascript
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
```

### Parsing JSON
```javascript
const DataObj = JSON.parse(data);
```

### Handling a Route
```javascript
if (pathname === "/product") {
  const id = myUrl.searchParams.get("id");
  const product = DataObj[id];
  const output = replaceTemplate(tempProduct, product);
  res.end(output);
}
```

### Creating a Module
```javascript
// replaceTemplate.js
module.exports = (temp, product) => {
  return temp.replace(/{%PRODUCTNAME%}/g, product.productName);
};
```

## 🎓 What You've Learned

✅ How HTTP servers work under the hood  
✅ How to handle multiple routes without a framework  
✅ How to read and write files in Node.js  
✅ How to work with JSON data  
✅ How to create and use custom modules  
✅ How to parse URLs and query parameters  
✅ How to render dynamic HTML templates  
✅ Synchronous vs asynchronous operations  
✅ HTTP status codes and error handling  

## 🚀 Next Steps for Learning

After mastering this project, consider:
1. **Express.js** - Simplify server code with a web framework
2. **Database Integration** - Replace JSON with a real database
3. **Authentication** - Add user login functionality
4. **REST API** - Build a proper API with CRUD operations
5. **Frontend Framework** - Add React/Vue for dynamic UI

## 📝 Author
Created as a learning project for understanding Node.js fundamentals.

## 📄 License
ISC

---

**Happy Learning! 🌱**