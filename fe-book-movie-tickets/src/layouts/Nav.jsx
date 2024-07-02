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
              key: 'part-1',
              href: '#part-1',
              title: 'Phim đang chiếu',
            },
            {
              key: 'part-2',
              href: '#part-2',
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
          id="part-1"
          style={{
            width: '100vw',
            height: '80vh',
            textAlign: 'center',
            background: 'rgba(0,255,0,0.02)',
          }}
        > <MovieIsShowing /> </div>


        <div
          id="part-2"
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
