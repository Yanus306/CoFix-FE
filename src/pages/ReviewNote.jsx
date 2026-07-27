import { useState, useMemo } from 'react';
import ListDetailLayout from '../layouts/ListDetailLayout';
import ReviewList from '../components/reviewNote/ReviewList';
import ReviewDetail from '../components/reviewNote/ReviewDetail'; 
import { MOCK_REVIEWS } from '../mocks/reviewdata'; // 데이터 출처에 맞춰 경로 확인 필요

export default function ReviewNote() {
  // 1. 선택된 리뷰 ID 상태 관리
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // 2. 선택된 ID에 해당하는 리뷰 객체 계산
  const selectedReview = useMemo(() => {
    return MOCK_REVIEWS.find((item) => item.id === selectedReviewId) || null;
  }, [selectedReviewId]);

  return (
    <ListDetailLayout 
      leftContent={
        <ReviewList 
          selectedReviewId={selectedReviewId}
          onSelectReview={setSelectedReviewId}
        />
      } 
      rightContent={
        <ReviewDetail 
          review={selectedReview} 
        />
      } 
    />
  );
}