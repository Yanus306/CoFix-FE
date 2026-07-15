import ListDetailLayout from '../layouts/ListDetailLayout';
import ReviewList from '../components/reviewNote/ReviewList';
import ReviewDetail from '../components/reviewNote/ReviewDetail'; 

export default function ReviewNote() {
  return (
    <ListDetailLayout 
      leftContent={<ReviewList />} 
      rightContent={<ReviewDetail />} 
    />
  );
}