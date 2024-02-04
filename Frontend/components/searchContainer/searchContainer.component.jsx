import {ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {
	SearchArea,
	SearchBoxContainer,
	SearchBox,
	BackgroundContainer,
	TopicContainer,
	Topic,
} from './searchContainer.styles';

const SearchContainer = ({categories}) => {
	return (
		<SearchArea>
			<SearchBoxContainer>
				<SearchBox>
					<Ionicons name="search-outline" size={25} color={'#E19C97'} />
				</SearchBox>
				<BackgroundContainer>
					<Ionicons name="options-outline" size={20} color={'#E19C97'} />
				</BackgroundContainer>
			</SearchBoxContainer>
			<TopicContainer horizontal={true} showsHorizontalScrollIndicator={false}>
				{categories.map((category) => (
					<Topic key={category._id}>{category.title}</Topic>
				))}
			</TopicContainer>
		</SearchArea>
	);
};

export default SearchContainer;
