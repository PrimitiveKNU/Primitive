import { useEffect, useState } from 'react';
import { FaDev } from 'react-icons/fa';
import Fireworks from '@/src/Components/common/Fireworks';
import { data, developers } from '@/src/Pages/MembersPage/data';
import Footer from '../../Components/common/Footer';
import NavBar from '../../Components/common/NavBar';
import MemberCard from '../../Components/member/MemberCard';

const MembersPage = () => {
  useEffect(() => {}, []);
  const emojis = [
    '🔥',
    '🌿',
    '🌱',
    '😁',
    '😎',
    '👍',
    '🚀',
    '👀',
    '🎉',
    '👻',
    '💀',
  ];
  const [emojiPresident, setEmojiPresident] = useState(
    emojis[Math.floor(Math.random() * emojis.length)],
  );
  const [emojiVice, setEmojiVice] = useState(
    emojis[Math.floor(Math.random() * emojis.length)],
  );
  const handleClick = (setter: (emoji: string) => void) => {
    setter(emojis[Math.floor(Math.random() * emojis.length)]);
  };

  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <NavBar />
      <>
        <div className='max-w-7xl mx-auto w-screen pb-24 flex flex-col items-center '>
          <h1 className='md:text-5xl text-3xl font-bold mt-24 mb-10'>운영진</h1>
          <div className='flex  gap-4 md:flex-row flex-col mb-24'>
            <MemberCard
              name={data.presidentData.name}
              number={data.presidentData.grade}
              position={data.presidentData.position}
              description={`안녕하세요 PRIMITIVE 24대 회장 ${data.presidentData.name}입니다.`}
              emoji={emojiPresident}
              handleClick={() => handleClick(setEmojiPresident)}
            />
            <MemberCard
              name={data.vicePresidentData.name}
              number={data.vicePresidentData.grade}
              position={data.vicePresidentData.position}
              description={`안녕하세요 PRIMITIVE 부회장 ${data.vicePresidentData.grade}학번 ${data.vicePresidentData.name}입니다!`}
              emoji={emojiVice}
              handleClick={() => handleClick(setEmojiVice)}
            />
          </div>
          <div className={'max-w-7xl '}>
            <h2 className=' w-full  border-b text-3xl font-bold my-3 inline-flex items-center gap-1 pb-2'>
              <FaDev />
              개발
            </h2>

            <div className='flex md:flex-row  flex-col gap-2'>
              {developers.map((developer, index) => (
                <MemberCard
                  name={developer.name}
                  number={developer.grade}
                  position={developer.position}
                  description={developer.description}
                  image={developer.image}
                  type={'small'}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </>
      {emojiPresident === emojiVice && <Fireworks />}
      <Footer />
    </div>
  );
};

export default MembersPage;
