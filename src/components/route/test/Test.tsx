import { useState } from "react";
import { getApiData, postApiData } from "../../api/ApiUtils";

function Test(): JSX.Element {
  const [randomString, setRandomString] = useState<string>("");
  const [inputString, setInputString] = useState<string>("");

  const getRandomString = async (): Promise<void> => {
    try {
      const response = await getApiData<string>("/random-string");
      setRandomString(response.data);
    } catch (error) {
      console.error("Error fetching random string:", error);
    }
  };

  const echoString = async (): Promise<void> => {
    try {
      const response = await postApiData<string>("/echo", inputString);
      setRandomString(response.data);
    } catch (error) {
      console.error("Error echoing string:", error);
    }
  };

  return (
    <div>
      <h1>Random String: {randomString}</h1>
      <div>
        <button onClick={getRandomString}>Get Random String</button>
      </div>
      <div>
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
        />
        <button onClick={echoString}>Echo String</button>
      </div>
    </div>
  );
}

export default Test;
