import { useState, useEffect } from "react"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"

import { apiUrl } from "../../Api";

function Home() {
  const [items, setItems] = useState(null);

  useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await 
          fetch (`${apiUrl}`) 
            const data = await 
            response.json()
            setItems(data)
        } catch (error) {
          console.error(`oh no, ocurrió un error: ${error}`);
        }
      }
     fetchData()
  }, []);

  return (
      <Layout>
        Home
        <div className="gap-4 grid grid-cols-4 w-full max-w-screen-lg">
          {
            items?.map((item) => (
              <Card  key={item.id} data={item}/>
            ))
          };
        </div>
        
        
      </Layout>
    
  );
}

export default Home
