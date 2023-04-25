import Head from "next/head";
import { useState } from "react";
import styles from "../index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>GPT-3.5</title>
        <link rel="icon" href="/gpt.png" />
      </Head>

      <main className={styles.main}>
        <img src="/gpt.png" className={styles.icon} />
        <h3>CHATGPT-3.5</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="content"
            placeholder="Please Enter"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="ok" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
