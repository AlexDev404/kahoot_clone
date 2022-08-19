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
        ["Echo Base is hidden on Hoth, a frozen world. What type of precipitation is likely to fall on Hoth?", 30],
        ["If water were present on Hoth, at what temperature on Earth would it freeze?", 30],
        ["Han & Lando can breathe outside Cloud City. What must be our atmosphere on Earth to do so?", 30]
        ["The wampa on Hoth fed on a tauntaun. On Earth, a meat-eater is called", 30]
      ],
      // Possible answers to questions above
      "_metadata": [
        ["Dew", "Rain", "Fog", "Snow"],
        ["Helium", "Chlorine", "Oxygen", "Carbon"],
        ["A herbivore", "A carnivore", "An omnivore", "A producer"]
      ],
      // Answers as indexed in _metadata
      "A": [3, 2, 1]
    }
  ]
}
