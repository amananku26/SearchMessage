import "./styles.css";
import React from "react";

export default function App() {
  const [useData, setUseData] = React.useState([]);
  const [apiData, setApiData] = React.useState([]);
  React.useEffect(() => {
    fetch(
      "https://randomuser.me/api/?results=20&amp;inc=name,picture,id,cell&amp;nat=in"
    )
      .then((response) => response.json())
      .then((response) => {
        setApiData(response.results);
        setUseData(response.results);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      setUseData(apiData);
    } else {
      const newresult = apiData.filter((item) =>
        item.name.first.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUseData(newresult);
    }
  };
  console.log("useData", useData);
  return (
    <div className="App">
      <div>
        <div className="header">
          <h1>Messages</h1>
        </div>
        <div className="header">
          <input
            className="inputBox"
            onChange={handleChange}
            placeholder="search People"
          />
        </div>
      </div>
      <div>
        {useData &&
          useData.map((item) => {
            return (
              <div className="Contact">
                <div>
                  <img src={item.picture.large} />
                </div>
                <div className="textContact">
                  <div>
                    {item.name.title} {item.name.first} {item.name.last}
                  </div>
                  <div>{item.cell}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
