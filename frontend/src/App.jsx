import { useEffect, useState } from "react";
import axios from "axios"

function App() {

  const [url, setUrl] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(url);
    const response = await axios.post("http://localhost:5252/shortUrl", { url });
    console.log(response.data);
    alert(response.data.message);
    setShortedUrl(response.data.shortedUrl);
    setUrl("");
  }


  return (
    <>
      <div className="flex w-full h-full justify-center items-center p-10">
      <div className="w-1/3 h-1/3 bg-cyan-100 p-5">

        <form onSubmit={handleSubmit}>

          <input type="text" placeholder="Enter your long website to short" value={url} onChange={(e) => {
            setUrl(e.target.value);  
          }}  className="border-2 m-3 hover:border-red-500 rounded-lg px-5 py-1"/>
          <input type="submit" className="px-3 py-1 text-white hover:bg-yellow-300 rounded-lg bg-amber-500"/>
          
        </form>
<div>

{shortedUrl && shortedUrl.length > 0 ? <p>Your Shorted Url is : <span style={{"color":"red"}}>{shortedUrl}</span></p> : "" }
</div>
        </div>
        </div>
    </>
  )
}

export default App
