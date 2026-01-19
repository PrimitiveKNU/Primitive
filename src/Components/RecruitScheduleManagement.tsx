import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Popup, usePopup } from '../Components/common/popup';
import { db } from '../firebase';
import { RecruitSchedule } from '../Types/RecruitFileType';

const RecruitScheduleManagement = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [years, setYears] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endTime, setEndTime] = useState<string>('23:59');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [popupTitle, setPopupTitle] = useState<string>('');
  const popup = usePopup();

  // 연도 선택 범위 설정
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let i = currentYear - 3; i <= currentYear + 3; i++) {
      yearList.push(i);
    }
    setYears(yearList);
  }, []);

  // 선택된 연도의 모집 일정 로드
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        // 과거 연도인지 확인
        const isPastYear = selectedYear < currentYear;
        setIsReadOnly(isPastYear);

        const docRef = doc(db, 'recruitSchedules', selectedYear.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as RecruitSchedule;
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setStartTime(data.startTime || '00:00');
          setEndTime(data.endTime || '23:59');
          setLastUpdated(new Date(data.updatedAt));
        } else {
          // 기본값 설정
          const today = new Date().toISOString().split('T')[0];
          setStartDate(today);
          setEndDate(today);
          setStartTime('00:00');
          setEndTime('23:59');
          setLastUpdated(null);
        }
      } catch (error) {
        console.error('모집 일정 로드 실패:', error);
        setPopupTitle('오류');
        setPopupMessage('모집 일정을 로드하는 데 실패했습니다.');
        popup.open();
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedYear, currentYear]);

  const showPopup = (title: string, message: string) => {
    setPopupTitle(title);
    setPopupMessage(message);
    popup.open();
  };

  const handleSave = async () => {
    if (isReadOnly) {
      showPopup('알림', '과거 연도의 모집 일정은 수정할 수 없습니다.');
      return;
    }

    if (!startDate || !endDate) {
      showPopup('알림', '시작 날짜와 종료 날짜를 입력해주세요.');
      return;
    }

    // 날짜 검증
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      showPopup('알림', '시작 날짜가 종료 날짜보다 클 수 없습니다.');
      return;
    }

    try {
      setSaving(true);
      const schedule: RecruitSchedule = {
        year: selectedYear,
        startDate,
        endDate,
        startTime,
        endTime,
        updatedAt: new Date(),
      };

      const docRef = doc(db, 'recruitSchedules', selectedYear.toString());
      await setDoc(docRef, {
        ...schedule,
        updatedAt: new Date().toISOString(),
      });

      setLastUpdated(new Date());
      showPopup('성공', '모집 일정이 저장되었습니다.');
    } catch (error) {
      console.error('모집 일정 저장 실패:', error);
      showPopup('오류', '모집 일정 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return '저장된 일정 없음';
    return lastUpdated.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='w-full mx-auto bg-white rounded px-8 pt-6 pb-8 mb-4'>
      {/* 연도 선택 */}
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-3'>
          연도 선택
        </label>
        <div className='flex gap-2 flex-wrap'>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedYear === year
                  ? 'bg-emerald-950 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 마지막 수정 정보 */}
      <div className='mb-6 p-3 bg-blue-50 border border-blue-200 rounded'>
        <p className='text-sm text-gray-700'>
          마지막 업데이트: <span className='font-semibold'>{formatLastUpdated()}</span>
        </p>
      </div>

      {/* 과거 연도 안내 */}
      {isReadOnly && (
        <div className='mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded'>
          <p className='text-sm font-semibold text-yellow-800'>
            ⚠️ 과거 연도입니다
          </p>
          <p className='text-xs text-yellow-700 mt-1'>
            {selectedYear}년의 모집 일정은 조회만 가능하며 수정할 수 없습니다.
          </p>
        </div>
      )}

      {loading ? (
        <div className='flex justify-center'>
          <svg
            className='animate-pulse h-5 w-5 rounded-full bg-green-950'
            viewBox='0 0 24 24'
          ></svg>
        </div>
      ) : (
        <div className='space-y-6'>
          {/* 시작 날짜 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                모집 시작 날짜
              </label>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={isReadOnly}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                  isReadOnly
                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed text-gray-500'
                    : 'border-gray-300 focus:ring-emerald-950'
                }`}
              />
            </div>

            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                시작 시간 (선택)
              </label>
              <input
                type='time'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={isReadOnly}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                  isReadOnly
                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed text-gray-500'
                    : 'border-gray-300 focus:ring-emerald-950'
                }`}
              />
            </div>
          </div>

          {/* 종료 날짜 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                모집 종료 날짜
              </label>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isReadOnly}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                  isReadOnly
                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed text-gray-500'
                    : 'border-gray-300 focus:ring-emerald-950'
                }`}
              />
            </div>

            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                종료 시간 (선택)
              </label>
              <input
                type='time'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={isReadOnly}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                  isReadOnly
                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed text-gray-500'
                    : 'border-gray-300 focus:ring-emerald-950'
                }`}
              />
            </div>
          </div>

          {/* 미리보기 */}
          <div className='p-4 bg-gray-50 border border-gray-200 rounded'>
            <p className='text-sm font-semibold text-gray-700 mb-2'>일정 미리보기</p>
            <p className='text-sm text-gray-600'>
              {startDate} {startTime} ~ {endDate} {endTime}
            </p>
          </div>

          {/* 저장 버튼 */}
          <div className='flex justify-end gap-3'>
            <button
              onClick={handleSave}
              disabled={saving || isReadOnly}
              className={`px-6 py-2 font-bold rounded transition-colors text-white ${
                isReadOnly
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-950 hover:bg-emerald-900 disabled:bg-gray-400'
              }`}
            >
              {isReadOnly ? '과거 연도 (수정 불가)' : saving ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </div>
      )}

      {/* Popup */}
      <Popup isOpen={popup.isOpen} onClose={popup.close}>
        <Popup.Title>{popupTitle}</Popup.Title>
        <Popup.Content>{popupMessage}</Popup.Content>
        <Popup.Button variant='primary' onClick={popup.close}>
          확인
        </Popup.Button>
      </Popup>
    </div>
  );
};

export default RecruitScheduleManagement;
