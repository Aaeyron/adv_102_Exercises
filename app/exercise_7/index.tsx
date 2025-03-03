import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator, StyleSheet } from "react-native";

// Define the type for a Question
type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const QuizApp = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const fetchQuestions = async () => {
    if (numQuestions < 10 || numQuestions > 30) {
      alert("Please enter a number between 10 and 30.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=9&difficulty=easy&type=multiple`);
      const data = await response.json();
      setQuestions(data.results as Question[]);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    } catch (error) {
      alert("Error fetching questions. Try again.");
    }
    setLoading(false);
  };

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz App</Text>
      <Text style={styles.label}>Enter number of questions (10-30):</Text>
      <TextInput
        keyboardType="numeric"
        value={numQuestions.toString()}
        onChangeText={(text) => setNumQuestions(Number(text))}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={fetchQuestions} disabled={loading}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#6200EE" />}
      {questions.length > 0 && !quizCompleted && (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Question {currentQuestion + 1}/{questions.length}:</Text>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          <FlatList
            data={[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer].sort()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer(item)}>
                <Text style={styles.answerText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {quizCompleted && (
        <Text style={styles.scoreText}>Quiz Completed! Your score: {score}/{questions.length}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  questionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  answerButton: {
    backgroundColor: "#03A9F4",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    width: "100%",
  },
  answerText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#6200EE",
  },
});

export default QuizApp;
