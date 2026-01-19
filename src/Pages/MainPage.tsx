import FAQ from '../Components/common/FAQ';
import Footer from '../Components/common/Footer';
import NavBar from '../Components/common/NavBar';
import Intro from '../Components/introduce/Intro';
const MainPage = () => {
  return (
    <section className='mainpage'>
      <NavBar />
      <Intro />
      <FAQ />
      <Footer />
    </section>
  );
};

export default MainPage;
