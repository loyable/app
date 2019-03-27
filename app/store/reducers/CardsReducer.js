const initialState = {
  filter: "",
  cardsFiltered: [],
  cards: [
    {
      id: "62db33d8-bc6e-4864-b50f-281aab7c9893",
      marked: 5,
      settings: {
        design: "horizontal",
        marks: {
          mark: {
            image: {
              width: 38,
              height: 11,
              src:
                "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png"
            },
            style: {
              backgroundColor: "#000",
              shape: {
                type: "round",
                value: 12
              },
              borderColor: "#fff",
              borderWidth: 0
            }
          },
          rows: 2,
          total: 10,
          rowSpacing: 15,
          style: {
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            padding: 2,
            borderWidth: 0,
            borderColor: "#fff",
            shape: {
              type: "round",
              value: 12
            }
          }
        },
        style: {
          height: 210,
          backgroundColor: "#333",
          borderRadius: 10,
          borderWidth: 0,
          borderColor: "#fff"
        },
        text: {
          title: {
            value: "MiNi Sushi",
            fontSize: 22,
            textAlign: "left",
            color: "#3c3c3c",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: 22,
            letterSpacing: 0
          },
          address: {
            value: "Via Emilio Morosini, 5, 20135 Milano MI",
            fontSize: 16,
            textAlign: "left",
            color: "#8e8e8e",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: 16,
            letterSpacing: 0
          }
        }
      },
      header: {
        logo: {
          width: 112,
          height: 35,
          position: "left",
          src:
            "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png",
          verticalPosition: "top",
          marginBottom: 0,
          marginLeft: 0
        },
        text1: {
          value: "Tessera Pranzo",
          color: "#fff",
          fontSize: 20,
          textAlign: "right",
          fontStyle: "normal",
          fontWeight: "normal",
          lineHeight: 20,
          letterSpacing: 0
        },
        text2: {
          value: "Ogni 10 Pranzi 1 Omaggio!",
          color: "#fff",
          fontSize: 16,
          textAlign: "right",
          fontStyle: "normal",
          fontWeight: "normal",
          lineHeight: 16,
          letterSpacing: 0
        }
      },
      footer: {
        value: "N.B. Non valido nei giorni festivi",
        color: "#fff",
        fontSize: 14,
        textAlign: "right",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: 14,
        letterSpacing: 0
      }
    },
    {
      id: "fa21dd26-501e-4ce5-886c-59e97854df96",
      settings: {
        design: "horizontal",
        marks: {
          mark: {
            image: {
              width: 35,
              height: 16,
              src: "http://www.pizzeriaspontini.it//graphic/headLogo.png"
            },
            style: {
              backgroundColor: "#b40001",
              shape: {
                type: "circle",
                value: 0
              },
              borderColor: "#fff",
              borderWidth: 0
            }
          },
          rows: 3,
          total: 15,
          rowSpacing: 10,
          style: {
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            padding: 2,
            borderWidth: 0,
            borderColor: "#fff",
            shape: {
              type: "circle",
              value: 0
            }
          }
        },
        style: {
          height: 270,
          backgroundColor: "#b40001",
          borderRadius: 10,
          borderWidth: 0,
          borderColor: "#fff"
        },
        text: {
          title: {
            value: "Spontini - Papiniano",
            fontSize: 22,
            textAlign: "left",
            color: "#3c3c3c",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: 22,
            letterSpacing: 0
          },
          address: {
            value: "Viale Papiniano, 23, 20123 Milano MI",
            fontSize: 16,
            textAlign: "left",
            color: "#8e8e8e",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: 16,
            letterSpacing: 0
          }
        }
      },
      header: {
        logo: {
          width: 112,
          height: 52,
          position: "left",
          src: "http://www.pizzeriaspontini.it//graphic/headLogo.png",
          verticalPosition: "top",
          marginBottom: 0,
          marginLeft: 0
        },
        text1: {
          value: "Menu Pranzo",
          color: "#fff",
          fontSize: 20,
          textAlign: "right",
          fontStyle: "normal",
          fontWeight: "normal",
          lineHeight: 20,
          letterSpacing: 0
        },
        text2: {
          value: "15 Pizze 1 Omaggio",
          color: "#fff",
          fontSize: 16,
          textAlign: "right",
          fontStyle: "normal",
          fontWeight: "normal",
          lineHeight: 16,
          letterSpacing: 0
        }
      },
      footer: {
        value: "Scadenza: 05/05/2019",
        color: "#fff",
        fontSize: 14,
        textAlign: "right",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: 14,
        letterSpacing: 0
      }
    },
    {
      id: "7188e682-4184-4b6f-8243-78c4c41da2f7",
      settings: {
        design: "horizontal",
        marks: {
          mark: {
            image: {
              width: 38,
              height: 23,
              src:
                "http://www.ilpomodorino.net/wp-content/uploads/2017/01/logo-283×174_il-pomodorino.png"
            },
            style: {
              backgroundColor: "#fff",
              shape: {
                type: "circle",
                value: 0
              },
              borderColor: "#aaa",
              borderWidth: 1
            }
          },
          rows: 2,
          total: 10,
          rowSpacing: 10,
          style: {
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            padding: 2,
            borderWidth: 1,
            borderColor: "#eee",
            shape: {
              type: "circle",
              value: 0
            }
          }
        },
        style: {
          height: 280,
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 0,
          borderColor: "#fff"
        },
        text: {
          title: {
            value: "Il Pomodorino",
            fontSize: 22,
            textAlign: "left",
            color: "#3c3c3c",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: 22,
            letterSpacing: 0
          },
          address: {
            value: "Via Crema, 3, 20135 Milano MI",
            fontSize: 16,
            textAlign: "left",
            color: "#8e8e8e",
            fontStyle: "normal",
            fontWeight: "normal",
            lineHeight: 16,
            letterSpacing: 0
          }
        }
      },
      header: {
        logo: {
          width: 112,
          height: 69,
          position: "center",
          src:
            "http://www.ilpomodorino.net/wp-content/uploads/2017/01/logo-283×174_il-pomodorino.png",
          verticalPosition: "top",
          marginBottom: 0,
          marginLeft: 0
        },
        text1: {
          value: "Menu Pranzo",
          color: "#333",
          fontSize: 20,
          textAlign: "center",
          fontStyle: "normal",
          fontWeight: "normal",
          lineHeight: 20,
          letterSpacing: 0
        },
        text2: {
          value: "10 Pizze 1 Omaggio",
          color: "#aaa",
          fontSize: 16,
          textAlign: "center",
          fontStyle: "normal",
          fontWeight: "normal",
          lineHeight: 16,
          letterSpacing: 0
        }
      },
      footer: {
        value: "Valido solo nel weekend",
        color: "#aaa",
        fontSize: 14,
        textAlign: "center",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: 14,
        letterSpacing: 0
      }
    }
  ],
  user: {
    user: {
      id: "4048ed6b-bcad-4e73-9852-1ba4c585acdb",
      _id: "5c937d37ca4e1ef614538acb",
      phone: "+393391848457",
      merchants: [
        {
          cards: [
            {
              marked: 5,
              created: "2019-03-21T12:01:06.243Z",
              history: [
                {
                  value: "+1",
                  time: "2019-03-21T12:01:06.243Z",
                  _id: "5c937d37ca4e1ef614538ace",
                  type: "add"
                }
              ],
              _id: "5c937d37ca4e1ef614538acd",
              id: "62db33d8-bc6e-4864-b50f-281aab7c9893"
            }
          ],
          history: [
            {
              value: "+1",
              time: "2019-03-21T12:01:06.243Z",
              _id: "5c937d37ca4e1ef614538acf",
              type: "completed"
            }
          ],
          _id: "5c937d37ca4e1ef614538acc",
          merchantID: "e61665bf-9d4b-478f-b82c-5db61efd84c1",
          merchant: {
            address: {
              coordinate: { lat: 45.4563687, lng: 9.2090525 },
              value: "Via Emilio Morosini, 5, 20135 Milano MI"
            },
            logo: {
              backgroundColor: "#333",
              src:
                "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png",
              width: 227,
              height: 72
            },
            _id: "5c935b2b0d05f2aa54c7190f",
            id: "e61665bf-9d4b-478f-b82c-5db61efd84c1",
            name: "MiNi Sushi",
            description:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, blanditiis. Nesciunt, aperiam suscipit? Corrupti quam minima sequi voluptate, vitae neque?",
            cards: [
              {
                _id: "5c935b2b0d05f2aa54c71910",
                id: "62db33d8-bc6e-4864-b50f-281aab7c9893",
                card: {
                  settings: {
                    marks: {
                      mark: {
                        image: {
                          width: 38,
                          height: 11,
                          src:
                            "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png"
                        },
                        style: {
                          shape: { type: "round", value: 12 },
                          backgroundColor: "#000",
                          borderWidth: 0,
                          borderColor: "#fff"
                        }
                      },
                      style: {
                        shape: { type: "round", value: 12 },
                        backgroundColor: "#fff",
                        padding: 2,
                        borderWidth: 0,
                        borderColor: "#fff",
                        width: 50,
                        height: 50
                      },
                      rows: 2,
                      total: 10,
                      rowSpacing: 15
                    },
                    style: {
                      backgroundColor: "#333",
                      borderWidth: 0,
                      borderColor: "#fff",
                      height: 210,
                      borderRadius: 10
                    },
                    text: {
                      address: {
                        fontSize: 16,
                        textAlign: "left",
                        color: "#8e8e8e",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        value: "Via Emilio Morosini, 5, 20135 Milano MI",
                        lineHeight: 16,
                        letterSpacing: 0
                      },
                      title: {
                        fontSize: 22,
                        textAlign: "left",
                        color: "#3c3c3c",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        value: "MiNi Sushi",
                        lineHeight: 22,
                        letterSpacing: 0
                      }
                    },
                    design: "horizontal"
                  },
                  header: {
                    logo: {
                      verticalPosition: "top",
                      width: 112,
                      height: 35,
                      position: "left",
                      src:
                        "http://www.minisushi.it/wp-content/uploads/2016/06/minilogo.png",
                      marginBottom: 0,
                      marginLeft: 0
                    },
                    text1: {
                      color: "#fff",
                      fontSize: 20,
                      textAlign: "right",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      value: "Tessera Pranzo",
                      lineHeight: 20,
                      letterSpacing: 0
                    },
                    text2: {
                      color: "#fff",
                      fontSize: 16,
                      textAlign: "right",
                      fontStyle: "normal",
                      fontWeight: "normal",
                      value: "Ogni 10 Pranzi 1 Omaggio!",
                      lineHeight: 16,
                      letterSpacing: 0
                    }
                  },
                  footer: {
                    color: "#fff",
                    fontSize: 14,
                    textAlign: "right",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    value: "N.B. Non valido nei giorni festivi",
                    lineHeight: 14,
                    letterSpacing: 0
                  },
                  id: "62db33d8-bc6e-4864-b50f-281aab7c9893",
                  _id: "5c921ec1623b0873a7226238",
                  __v: 0
                }
              }
            ],
            __v: 0
          }
        }
      ],
      __v: 0
    },
    hash: "3449c9e5e332f1dbb81505cd739fbf3f"
  }
};

const CardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_CARDS":
      cardsFiltered = state.cards.filter(card => {
        if (
          card.settings.text.title.value
            .toLowerCase()
            .indexOf(state.filter.toLowerCase()) > -1 ||
          card.settings.text.address.value
            .toLowerCase()
            .indexOf(state.filter.toLowerCase()) > -1
        ) {
          return card;
        }
      });
      return {
        ...state,
        cardsFiltered
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };
    case "GET_CARDS":
      return { ...state, cards: action.payload };
    default:
      return state;
  }
};

export default CardsReducer;
