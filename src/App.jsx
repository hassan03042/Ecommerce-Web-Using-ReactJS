import { useEffect, useState } from "react";
import Button from "./components/Button";

function App() {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState ("")

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  const filteredArr = post.filter(
    (data) => data.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
  const filteredArrByCategory = post.filter(
    (data) => data.category.toLowerCase().indexOf(category.toLowerCase()) !== -1
    );

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  }

  const priceLessThanThous = (price)=>{
    setPrice (price < 1000)
      
  }

  return (
    <div>
      <h1 className="text-center my-5 text-3xl font-semibold underline">
        Products
      </h1>
      <div class="categorydiv">
        <button onClick={() => handleCategoryChange("men's clothing")}>
          <span class="catheading"> Men's Clothing</span>
        </button>
        <button onClick={() => handleCategoryChange("women's clothing")}>
          <span class="catheading">Womens Clothing</span>
        </button>
        <button onClick={() => handleCategoryChange("jewelery")}>
          <span class="catheading">Jewelery</span>
        </button>
        <button onClick={() => handleCategoryChange("electronics")}>
          <span class="catheading">Electronics</span>
        </button>
      </div>
      <div className="w-3/4 mx-auto ">
        <input
          placeholder="Search"
          type="search"
          className="w-full border-2  p-3 font-bold"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <aside className="pricefilter">
        <h2>Filter by Price</h2>
        <button onclick={priceLessThanThous}>Less than $1000</button>
        <button onclick="filterByPrice(200)">Less than $500</button>
        <button onclick="filterByPrice(300)">Less than $200</button>
        <button onclick="filterByPrice(400)">Less than $100</button>
        <button onclick="filterByPrice(500)">Less than $50</button>
    </aside>
    
      <div className="flex flex-wrap m-4">
        {category ? filteredArrByCategory.map((data) => (
          <div key={data.id} className="lg:w-1/4 md:w-1/2 p-2 w-full">
            <div className="border  rounded-md overflow-hidden">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={data.image}
                />
              </a>
              <div className="mt-4 p-2">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {data.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {data.title}
                </h2>
                <p className="mt-1">${data.price}</p>
              </div>
            </div>
          </div>
        )) : filteredArr.map((data) => (
          <div key={data.id} className="lg:w-1/4 md:w-1/2 p-2 w-full">
            <div className="border  rounded-md overflow-hidden">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={data.image}
                />
              </a>
              <div className="mt-4 p-2">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {data.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {data.title}
                </h2>
                <p className="mt-1">${data.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;