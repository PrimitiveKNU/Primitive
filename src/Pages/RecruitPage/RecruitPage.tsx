import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { recruitData } from '@/src/Pages/RecruitPage/data';
import Footer from '../../Components/common/Footer';
import NavBar from '../../Components/common/NavBar';
import { Popup, usePopup } from '../../Components/common/popup';
import { db } from '../../firebase';

const RecruitPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDate, setIsDate] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [formURL, setFormURL] = useState<string>(recruitData.form);
  const [otURL, setOtURL] = useState<string>(recruitData.ot);
  const [formFileName, setFormFileName] = useState<string>('모집신청서.hwp');
  const [otFileName, setOtFileName] = useState<string>('OT자료.pdf');
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [popupTitle, setPopupTitle] = useState<string>('');
  const popup = usePopup();

  // Firestore에서 동적으로 파일 정보 로드
  useEffect(() => {
    const fetchRecruitFiles = async () => {
      try {
        const year = new Date().getFullYear();
        const docRef = doc(db, 'recruitFiles', year.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.formFile?.downloadURL) {
            setFormURL(data.formFile.downloadURL);
            if (data.formFile.name) {
              setFormFileName(data.formFile.name);
            }
          }
          if (data.otFile?.downloadURL) {
            setOtURL(data.otFile.downloadURL);
            if (data.otFile.name) {
              setOtFileName(data.otFile.name);
            }
          }
        }
      } catch (error) {
        console.error('모집 파일 정보 로드 실패:', error);
      }
    };

    fetchRecruitFiles();
  }, []);

  // Firestore 또는 기본값으로부터 모집 일정 정보 로드
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const year = new Date().getFullYear();
        const docRef = doc(db, 'recruitSchedules', year.toString());
        const docSnap = await getDoc(docRef);

        const now = new Date();
        let start: Date;
        let end: Date;
        const weeks = ['일', '월', '화', '수', '목', '금', '토'];

        if (docSnap.exists()) {
          // Firestore에서 일정을 가져온 경우
          const scheduleData = docSnap.data();
          const [startYear, startMonth, startDay] = scheduleData.startDate
            .split('-')
            .map(Number);
          const [endYear, endMonth, endDay] = scheduleData.endDate
            .split('-')
            .map(Number);

          start = new Date(startYear, startMonth - 1, startDay);
          const startTime = scheduleData.startTime || '00:00';
          const [startHour, startMin] = startTime.split(':').map(Number);
          start.setHours(startHour, startMin, 0);

          end = new Date(endYear, endMonth - 1, endDay);
          const endTime = scheduleData.endTime || '23:59';
          const [endHour, endMin] = endTime.split(':').map(Number);
          end.setHours(endHour, endMin, 59);
        } else {
          // 기본값 사용 (data.ts의 값)
          start = new Date(
            recruitData.recruitStartDate.year,
            recruitData.recruitStartDate.month - 1,
            recruitData.recruitStartDate.day,
          );
          end = new Date(
            recruitData.recruitEndDate.year,
            recruitData.recruitEndDate.month - 1,
            recruitData.recruitEndDate.day,
            23,
            59,
            59,
          );
        }

        setTimeString(
          `${start.getFullYear()}년 모집 기간: ${start.getMonth() + 1}월 ${start.getDate()}일 (${weeks[start.getDay()]}) ~ ${end.getMonth() + 1}월 ${end.getDate()}일 (${weeks[end.getDay()]})`,
        );
        setIsDate(now >= start && now <= end);
      } catch (error) {
        console.error('모집 일정 로드 실패:', error);
        // 에러 발생 시 기본값 사용
        const now = new Date();
        const start = new Date(
          recruitData.recruitStartDate.year,
          recruitData.recruitStartDate.month - 1,
          recruitData.recruitStartDate.day,
        );
        const end = new Date(
          recruitData.recruitEndDate.year,
          recruitData.recruitEndDate.month - 1,
          recruitData.recruitEndDate.day,
          23,
          59,
          59,
        );
        const weeks = ['일', '월', '화', '수', '목', '금', '토'];

        setTimeString(
          `${start.getFullYear()}년 모집 기간: ${start.getMonth() + 1}월 ${start.getDate()}일 (${weeks[start.getDay()]}) ~ ${end.getMonth() + 1}월 ${end.getDate()}일 (${weeks[end.getDay()]})`,
        );
        setIsDate(now >= start && now <= end);
      }
    };

    fetchSchedule();
  }, []);

  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      maxHeight: 0,
    },
    config: {
      tension: 160,
    },
  }));

  const handleClick = () => {
    setShowInfo(!showInfo);
    api.start({
      to: {
        maxHeight: springs.maxHeight.get() === 0 ? 1440 : 0,
        opacity: springs.opacity.get() === 0 ? 1 : 0,
      },
    });
  };

  const handleFileDownload = async (fileURL: string, fileName: string) => {
    try {
      // Firebase Storage URL에서 파일명 추출
      const response = await fetch(fileURL);
      const blob = await response.blob();

      // Blob을 로컬 URL로 변환
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'download');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
      setPopupTitle('오류');
      setPopupMessage('파일 다운로드에 실패했습니다.');
      popup.open();
    }
  };

  const disabledStyle =
    'disabled:bg-gray-200 disabled:hover:shadow-xl disabled:cursor-not-allowed';

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className='flex-grow bg-slate-50 w-screen flex flex-col items-center justify-center py-32 gap-1'>
        {isDate ? (
          <h3 className='md:text-4xl text-3xl text-center'>
            많은 지원 부탁드립니다!
          </h3>
        ) : (
          <h3 className='md:text-4xl text-3xl text-center'>
            지금은 지원기간이 아닙니다!
          </h3>
        )}
        <p>{timeString}</p>
        <div className={'mt-4 flex flex-col gap-4'}>
          {isDate ? (
            <>
              {' '}
              <button
                disabled={!isDate}
                onClick={() => handleFileDownload(formURL, formFileName)}
                className={`bg-white shadow-xl py-2 px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-200  w-72 ${disabledStyle}`}
              >
                👉 모집 신청서 양식 다운로드
              </button>
              <button
                disabled={!isDate}
                onClick={() => handleFileDownload(otURL, otFileName)}
                className={`bg-white shadow-xl py-2 px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-200  w-72 ${disabledStyle}`}
              >
                👉 신입생 OT 자료 다운로드
              </button>
            </>
          ) : (
            <div className={'my-1'}></div>
          )}
          <a
            href='https://primitive-members-mbti.vercel.app/'
            target='_blank'
            rel='noreferrer'
          >
            <button className='bg-yellow-100 py-2 px-6 rounded-lg shadow-xl hover:bg-yellow-200 w-72 '>
              <div>🤔 내가 PRIMITIVE에 들어간다면?</div>
              <div>💡 심리테스트 해보기</div>
            </button>
          </a>
          <button
            className='bg-green-200 py-2 px-6 rounded-lg shadow-xl hover:bg-green-300  w-72'
            onClick={() => handleClick()}
          >
            👀 이번 모집공고 {showInfo ? '닫기' : '확인하기'}
          </button>
        </div>
        <div
          className={`flex flex-col justify-center items-center overflow-hidden ${
            showInfo && 'border-2'
          } p-3 rounded-lg `}
        >
          {loading && (
            <svg
              className='animate-pulse h-5 w-5 rounded-full bg-green-950'
              viewBox='0 0 24 24'
            ></svg>
          )}
          <animated.img
            className={`w-1/2  ${loading ? 'hidden' : ''} ${
              isZoomed ? 'w-full cursor-zoom-out' : 'w-1/2 cursor-zoom-in'
            }`}
            onClick={() => {
              setIsZoomed(!isZoomed);
            }}
            style={{ ...springs }}
            src={recruitData.recruitNotice}
            alt='26년도 모집공고'
            onLoad={() => {
              setLoading(false);
            }}
          ></animated.img>
        </div>
        <div className='flex flex-col items-center mt-20'>
          <p className='text-xl bg-black text-white w-full sm:w-fit px-16 py-1 rounded-tr-lg rounded-tl-lg'>
            신청서 제출 방법
          </p>
          <div className='flex sm:flex-row flex-col  w-full text-white rounded-none sm:rounded-lg overflow-hidden text-nowrap'>
            {[recruitData.presidentData, recruitData.vicePresidentData].map(
              (el) => (
                <div className='flex flex-col bg-slate-800 p-5 flex-1'>
                  <span>{el.position}</span>
                  <span className='text-2xl font-bold'>{el.name}</span>
                  <p>Kakao ID: {el.kakaoID}</p>
                  <p>Email: {el.email}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <Footer />

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

export default RecruitPage;
