export default {
  login: {
    step1: {
      text: "Inserisci il tuo numero di cellulare",
      button: "Continua",
      error: "Il codice inserito è scaduto!"
    },
    step2: {
      text: "Inserisci il codice di conferma",
      button: "Verifica numero",
      error: "Codice errato! Riprova"
    },
    footer: [
      {
        title: "Se ti devi registrare",
        description: "Ci vogliono pochi secondi ed è completamente gratis"
      },
      {
        title: "Se sei già registrato",
        description:
          "Per effettuare il login ti basterà inserire il codice che riceverai via SMS"
      }
    ]
  },
  sidebar: {
    items: [
      {
        name: "Il mio account",
        link: "Account"
      },
      {
        name: "Istruzioni d'uso",
        link: "Instructions"
      },
      {
        name: "Logout",
        link: "Logout"
      }
    ],
    logout: {
      title: "Sei sicuro di voler fare il logout?",
      subtitle: "Dovrai rieffettuare la verifica SMS",
      cancel: "Annulla",
      button: "Logout"
    }
  }
};
