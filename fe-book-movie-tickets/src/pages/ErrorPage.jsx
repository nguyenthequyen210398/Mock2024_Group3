import './error.scss';

export default function ErrorPage() {


    return (
        <>

            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="main">
                <h1>404</h1>
                <p>Không tìm thấy trang...<br />Vui lòng thử lại sau.</p>
                <a href="/index.html"><b>Trang chủ</b></a>
            </div>


        </>
    );
}