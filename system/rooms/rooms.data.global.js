exports.default = {
  // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[[QUESTION, TIMEOUT], [..., ...]], _metadata: [[POSSIBLECHOICES, ...]], A:[ANSWERS, ...]}]

  111111: [
    "init",
    45,
    0,
    "General Science with Star Wars",
    {
      // Questions and their timeout
      Q: [
        [
          "Echo Base is hidden on Hoth, a frozen world. What type of precipitation is likely to fall on Hoth?",
          30,
        ],
        [
          "If water were present on Hoth, at what temperature on Earth would it freeze?",
          30,
        ],
        [
          "Han & Lando can breathe outside Cloud City. What must be our atmosphere on Earth to do so?",
          30,
        ],
        [
          "The wampa on Hoth fed on a tauntaun. On Earth, a meat-eater is called",
          30,
        ],
        [
          'The Star Wars galaxy contains many planets. What defines a "planet" in our galaxy?',
          15,
        ],
        [
          "Which of these characters does not have similar traits to those found in mammals on Earth?",
          30,
        ],
        [
          "Mimas, a moon orbiting Saturn, resembles the Death Star due to a large crater on its surface",
          20,
        ],
        [
          "Tatooine dewbacks are 4-legged vertebrates with scales, similar to which earthly animal class?",
          30,
        ],
        [
          "Tatooine eopies carry heavy cargo and are adapted to the desert. What Earth animal is similar?",
          30,
        ],
        [
          "Monstrous acklays have multiple eyes & folding legs. Which Earth insect resembles acklays?",
          30,
        ],
        [
          "Planets in the Star Wars galaxy are spherical. What force shapes cosmic objects into spheres?",
          25,
        ],
      ],
      // Possible answers to questions above
      _metadata: [
        ["Dew", "Rain", "Fog", "Snow"],
        ["0C or 32F", "10C or 50F", "20C or 68F", "32C or 87F"],
        ["Helium", "Chlorine", "Oxygen", "Carbon"],
        ["A herbivore", "A carnivore", "An omnivore", "A producer"],
        [
          "It orbits the universe",
          "It orbits a star",
          "It orbits a moon",
          "It has an elliptical orbit",
        ],
        ["Chewbacca", "Han Solo", "C-3PO", "Princess Leia"],
        ["True", "False"],
        ["Amphibians", "Mammals", "Reptiles", "Birds"],
        ["Elephant", "Camel", "Ox", "Buffalo"],
        ["Praying mantis", "Grasshopper", "Cricket", "Aphid"],
        ["Friction", "Magnetism", "Gravity", "Strong Force"],
      ],
      // Answers as indexed in _metadata
      A: [3, 0, 2, 1, 1, 2, 0, 2, 1, 0, 2],
    },
  ],
};
