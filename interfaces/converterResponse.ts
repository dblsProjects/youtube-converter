export default interface converterResponse {
  guid: string;
  message: string;
  YoutubeAPI: {
    id: string;
    definizione: string;
    contatore_visualizzazioni: string;
    descrizione: string;
    titolo: string;
    data_pubblicazione: string;
    thumbUrl: string;
    licenza: string;
    durata_video: string;
    duration_original: string;
    counter: number;
    paesi: null;
    urlMp3: string;
    urlVideo: string;
  };
}
