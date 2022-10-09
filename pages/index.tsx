import { FormEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import converterResponse from "../interfaces/converterResponse";

const Home: NextPage = () => {
  const [data, setData] = useState<converterResponse>();
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [linkToConvert, setLinkToConvert] = useState<string>("");

  const options = {
    method: "GET",
    url: "https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess",
    params: {
      url: linkToConvert,
      format: "mp3",
      responseFormat: "json",
      lang: "en",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "t-one-youtube-converter.p.rapidapi.com",
    },
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_RAPID_API_KEY);
    return axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube convertisseur</title>
        <meta name="description" content="Youtube convertisseur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.scrollingBackground}></div>
        <div className={styles.main_absoluteContent}>
          <h2>Bienvenue sur le convertisseur de vidéo open source</h2>
          <p>Entrez le lien de votre vidéo dans le champ ci-dessous</p>
          {data && (
            <div>
              <a href={data.YoutubeAPI.urlMp3} target="blank">
                Téléchargez l&apos;audio
              </a>
              {data.YoutubeAPI.urlVideo && (
                <a href={data.YoutubeAPI.urlVideo} target="blank">
                  Téléchargez la vidéo
                </a>
              )}
            </div>
          )}
          <form className={styles.formStyle} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={linkToConvert}
              onChange={(e) => setLinkToConvert(e.target.value)}
              className={styles.inputStyle}
            />
            <button
              className={styles.buttonStyle}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Convertir
            </button>
          </form>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
