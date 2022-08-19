exports.default = {
  // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[[QUESTION, TIMEOUT], [..., ...]], _metadata: [[POSSIBLECHOICES, ...]], A:[ANSWERS, ...]}]

  "111111": [
    "init",
    1,
    0,
    "General Science with Star Wars",
    {
      // Questions and their timeout
      "Q": [
        ["Echo Base is hidden on Hoth, a frozen world. What type of precipitation is likely to fall on Hoth?", 10],
        ["The timeout is set to one", 5],
        ["The room is unlocked", 30]
      ],
      // Possible answers to questions above
      "_metadata": [
        ["Dew", "Rain", "Fog", "Snow"],
        ["True", "False"],
        ["True", "False"]
      ],
      // Answers as indexed in _metadata
      "A": [3, 0, 1]
    }
  ]
}
