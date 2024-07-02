import '../main.scss'
import { Anchor } from 'antd';
import MovieIsShowing from '../components/MovieIsShowing';
import MovieComing from '../components/MovieComing';
function Nav() {

  return (
    <>
      <div className='nav'
        style={{
          padding: '5px',

        }}
      >
        <Anchor
          direction="horizontal"
          items={[
            {
              key: 'phim-dang-chieu',
              href: '#phim-dang-chieu',
              title: 'Phim đang chiếu',
            },
            {
              key: 'phim-sap-chieu',
              href: '#phim-sap-chieu',
              title: 'Phim sắp chiếu',
            },
            {
              key: 'part-3',
              href: '#part-3',
              title: 'Part 3',
            },
          ]}
        />
      </div>
      <div>
        <div
          id="phim-dang-chieu"
          style={{
            width: '100vw',
            height: '80vh',
            textAlign: 'center',
            background: 'rgba(0,255,0,0.02)',
          }}
        > <MovieIsShowing /> </div>


        <div
          id="phim-sap-chieu"
          style={{
            width: '100vw',
            height: '80vh',
            textAlign: 'center',
            background: 'rgba(0,0,255,0.02)',
          }}
        >  <MovieComing /> </div>
        <div
          id="part-3"
          style={{
            width: '100vw',
            height: '50vh',
            textAlign: 'center',
            background: '#FFFBE9',
          }}
        />
      </div>
    </>
  )

}

export default Nav;
