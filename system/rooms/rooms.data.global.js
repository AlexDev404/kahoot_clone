exports.default = {
  // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[[QUESTION, TIMEOUT], [..., ...]], _metadata: [[POSSIBLECHOICES, ...]], A:[ANSWERS, ...]}]

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
