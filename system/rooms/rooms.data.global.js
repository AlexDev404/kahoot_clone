exports.default = {
  // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[[QUESTION, TIMEOUT], [..., ...]], _metadata: [[POSSIBLECHOICES, ...]], A:[ANSWERS, ...]}]

  "888888": [
    "end",
    30,
    0,
    "Dead Room",
    {
      "Q": [["This is an example of a room that has ended", 5]],
      "_metadata": [["True", "False"]],
      "A": [0]
    }
  ],
  

  "999999": [
    "init",
    30,
    0,
    "Empty",
    {
      "Q": [["This is an example of an empty room", 5]],
      "_metadata": [["True", "False"]],
      "A": [0]
    }
  ],
  "123456": [
    "inProgress",
    0,
    // Current question is 3
    3,
    "Progression",
    {
      // Questions and their timeout
      "Q": [
        ["This is an example of a room with a game in progress [LOCKED]", 10],
        ["Question #2", 5],
        ["Question #3", 30]
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
    1,
    0,
    "Room With Users",
    {
      // Questions and their timeout
      "Q": [
        ["This is an example of a room with users [UNLOCKED]", 10],
        ["The timeout is set to one", 5],
        ["The room is unlocked", 30]
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
