import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/common/Footer';
import LoadingCircle from '../Components/common/LoadingCircle';
import NavBar from '../Components/common/NavBar';
import NoticeBox from '../Components/NoticeBox';
import { db } from '../firebase';
import Notice from '../Types/NoticeType';

const NoticePage = () => {
  const filtercategorys = ['전체', '공지사항', '업데이트', '서비스', '공고'];

  // 상태관리
  const navigate = useNavigate();
  const [filter, setFilter] = useState('전체');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeLoading, setNoticeLoading] = useState(true);

  // Effect
  useEffect(() => {
    getNotices();
  }, [filter]);

  // Method
  const getNotices = async () => {
    // 공지사항 목록 불러오기
    let q;
    if (filter === '전체')
      q = query(collection(db, 'notices'), orderBy('date', 'desc'));
    else
      q = query(
        collection(db, 'notices'),
        where('category', '==', filter),
        orderBy('date', 'desc'),
      );
    const response = await getDocs(q);

    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Notice, 'id'>),
    }));
    setNotices(data);
    setNoticeLoading(false);
  };

  // 렌더

  const renderNotice = () => {
    return noticeLoading ? (
      <LoadingCircle color='bg-indigo-200' />
    ) : (
      <div className='border-b'>
        {notices.length === 0 && <div>공지사항이 없습니다...</div>}
        {notices.map((notice, index) => (
          <NoticeBox
            key={index}
            id={notice.id}
            category={notice.category}
            title={notice.title}
            content={notice.content}
            toDetail={() => navigate(`/notice/${notice.id}`)}
          />
        ))}
      </div>
    );
  };

  return (
    <section className='flex flex-col min-h-screen  justify-between bg-white text-black'>
      <NavBar />
      <div className='relative mt-10 md:mt-20 max-w-6xl mx-auto w-full flex-grow flex flex-col items-stretch p-5 md:p-10 gap-2'>
        <h1 className='text-4xl'>공지사항</h1>
        <div className='noticeFilter py-2 flex gap-3 text-xl'>
          {filtercategorys.map((category) => (
            <span
              key={category}
              onClick={() => setFilter(category)}
              className={`cursor-pointer ${filter === category ? 'active' : ''}`}
            >
              {category}
            </span>
          ))}
        </div>
        {renderNotice()}
      </div>
      <Footer />
    </section>
  );
};

export default NoticePage;
