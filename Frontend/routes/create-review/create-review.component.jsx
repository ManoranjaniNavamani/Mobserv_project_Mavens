// CreateReviewPage.js
import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';

import {
	Container,
	TitleContainer,
	InputContainer,
	ReviewInput,
	MLogo,
	Title,
	RatingContainer,
	StarIcon,
	SubmitButton,
	SubmitButtonText,
} from './create-review.styles';
import {sendReview} from '../../requests/review';
import {useAuth} from '../../context/authContext';
import {useRoute} from '@react-navigation/native';

const CreateReviewPage = ({navigation}) => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);
	const {token} = useAuth();
	const route = useRoute();
	const {courseId} = route.params;

	const handleStarClick = (selectedRating) => {
		setRating(selectedRating);
	};

	const handleReviewSubmit = () => {
		if (rating >= 1 && rating <= 5 && reviewText != '') {
			let response = sendReview(token, courseId, {text: reviewText, rating});

			if (response) {
				setReviewText('');
				setRating(0);
				navigation.navigate('CourseDescriptionPage', {id: courseId});
			}
		}
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#111313'}}>
			<Container>
				<TitleContainer>
					<MLogo source={require('../../assets/MLogo/MLogo.svg')} />
					<Title>Create a Review</Title>
				</TitleContainer>
				<InputContainer>
					<ReviewInput
						placeholder="Write your review here..."
						multiline
						value={reviewText}
						onChangeText={(text) => setReviewText(text)}
						placeholderTextColor="#808080"
					/>
					<RatingContainer>
						{[1, 2, 3, 4, 5].map((star) => (
							<TouchableOpacity
								key={star}
								onPress={() => handleStarClick(star)}
							>
								<StarIcon
									name={star <= rating ? 'star' : 'star-outline'}
									size={30}
									color="#e19c97"
								/>
							</TouchableOpacity>
						))}
					</RatingContainer>
				</InputContainer>
				<SubmitButton onPress={handleReviewSubmit}>
					<SubmitButtonText>Submit Review</SubmitButtonText>
				</SubmitButton>
			</Container>
		</SafeAreaView>
	);
};

export default CreateReviewPage;
