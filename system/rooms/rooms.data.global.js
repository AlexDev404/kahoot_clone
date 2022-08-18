exports.default = {
  // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[[QUESTION, TIMEOUT], [..., ...]], _metadata: [[POSSIBLECHOICES, ...]], A:[ANSWERS, ...]}]
  "999999": [
    "init",
    30,
    0,
    "Cats",
    {
      "Q": [["Some kind of cat question", 5]],
      "_metadata": [["True", "False"]],
      "A": [0]
    }
  ],
  "123456": [
    "inProgress",
    0,
    3,
    "animals",
    {
      // Questions and their timeout
      "Q": [
        ["Dogs cannot smell", 10],
        ["Dogs are fat", 5],
        ["Doge is the best", 30]
      ],
      // Possible answers to questions above
      "_metadata": [
        ["True", "False"],
        ["True", "False"],
        ["True", "False"]
      ],
      // Answers as indexed in _metadata
      "A": [0, 0, 1]
    }
  ],
  "111111": [
    "init",
    10,
    0,
    "animals",
    {
      // Questions and their timeout
      "Q": [
        ["This is a question", 10],
        ["Dogs are fat", 5],
        ["Doge is the best", 30]
      ],
      // Possible answers to questions above
      "_metadata": [
        ["True", "False"],
        ["True", "False"],
        ["True", "False"]
      ],
      // Answers as indexed in _metadata
      "A": [0, 0, 1]
    }
  ]
}
