const reviewsData = [
  {
    "bank": "GXS",
    "sentiments": {
      "19 February 2024 - 25 February 2024": {
        "Negative": 0,
        "Neutral": 1,
        "Positive": 0
      },
      "26 February 2024 - 03 March 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "total": {
        "Negative": 0,
        "Neutral": 0.5,
        "Positive": 0.5
      }
    }
  },
  {
    "bank": "UOB",
    "sentiments": {
      "11 March 2024 - 17 March 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "12 February 2024 - 18 February 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "total": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      }
    }
  },
  {
    "bank": "DBS",
    "sentiments": {
      "04 March 2024 - 10 March 2024": {
        "Negative": 1,
        "Neutral": 0,
        "Positive": 0
      },
      "05 February 2024 - 11 February 2024": {
        "Negative": 1,
        "Neutral": 0,
        "Positive": 0
      },
      "15 January 2024 - 21 January 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "total": {
        "Negative": 0.667,
        "Neutral": 0,
        "Positive": 0.333
      }
    }
  },
  {
    "bank": "OCBC",
    "sentiments": {
      "04 March 2024 - 10 March 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "08 January 2024 - 14 January 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "19 February 2024 - 25 February 2024": {
        "Negative": 1,
        "Neutral": 0,
        "Positive": 0
      },
      "total": {
        "Negative": 0.333,
        "Neutral": 0,
        "Positive": 0.667
      }
    }
  },
  {
    "bank": "Trust",
    "sentiments": {
      "05 February 2024 - 11 February 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "15 January 2024 - 21 January 2024": {
        "Negative": 1,
        "Neutral": 0,
        "Positive": 0
      },
      "18 March 2024 - 24 March 2024": {
        "Negative": 1,
        "Neutral": 0,
        "Positive": 0
      },
      "total": {
        "Negative": 0.667,
        "Neutral": 0,
        "Positive": 0.333
      }
    }
  },
  {
    "bank": "MariBank",
    "sentiments": {
      "22 January 2024 - 28 January 2024": {
        "Negative": 0,
        "Neutral": 1,
        "Positive": 0
      },
      "25 March 2024 - 31 March 2024": {
        "Negative": 0,
        "Neutral": 1,
        "Positive": 0
      },
      "29 January 2024 - 04 February 2024": {
        "Negative": 0,
        "Neutral": 0,
        "Positive": 1
      },
      "total": {
        "Negative": 0,
        "Neutral": 0.667,
        "Positive": 0.333
      }
    }
  }
]

const gxsData = reviewsData.filter(item => item.bank === "GXS");

gxsData.forEach(item => {
  delete item.sentiments.total;
});
console.log(gxsData);