import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axiosInstance from '../services/axios.instance';
import { useDispatch, useSelector } from 'react-redux';
import { addResponse, resetResponses } from '../store/slices/survey.slice';
import { RootState } from '../store';
import { Question } from '../types/survey.type';
import { useNavigationApp } from '../hooks/useNavigation';

const SurveyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigationApp('Survey');
  const responses = useSelector((state: RootState) => state.survey.responses);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    setIsFormComplete(
      questions.length > 0 &&
        questions.every(q => responses.some(r => r.question_id === q.id))
    );
  }, [responses, questions]);

  const handleOptionSelect = (questionId: string, answerId: string) => {
    dispatch(addResponse({ question_id: questionId, answer_id: answerId }));
  };

  const handleSubmit = () => {
    const submissionData = {
      date: new Date().toISOString(),
      data: responses,
    };
    axiosInstance
      .post('/answer', submissionData)
      .then(() => navigation.navigate('Completion'))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.text}</Text>
            {item.options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={() => handleOptionSelect(item.id, option.id)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <Button
        title="Finalizar"
        onPress={handleSubmit}
        disabled={!isFormComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  option: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SurveyScreen;
