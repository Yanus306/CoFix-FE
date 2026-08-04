import { useState, useEffect, useMemo } from 'react';
import ListDetailLayout from '../layouts/ListDetailLayout';
import ReviewList from '../components/reviewNote/ReviewList';
import ReviewDetail from '../components/reviewNote/ReviewDetail';
import { fetchReviewNoteList } from '../hooks/ReviewNoteApi';

export default function ReviewNote() {
  // 1. 리뷰 목록 상태 관리 (selectedReview 조회용, ReviewList와는 별개로 조회)
  const [reviews, setReviews] = useState([]);

  // 2. 선택된 리뷰 ID 상태 관리
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // 3. 컴포넌트 마운트 시 리뷰 목록 조회
  useEffect(() => {
    const loadReviews = async () => {
      const result = await fetchReviewNoteList();
      if (result.success) {
        setReviews(result.data);
      }
    };

    loadReviews();
  }, []);

  // 4. 선택된 ID에 해당하는 리뷰 객체 계산
  const selectedReview = useMemo(() => {
    return reviews.find((item) => item.id === selectedReviewId) || null;
  }, [reviews, selectedReviewId]);

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