import React from 'react';
import { useState } from "react";
import '../../resource/css/main.css';
import '../../resource/css/tree/AddCarrot.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Header from '../fragment/header';
import Switch from '@mui/material/Switch';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import r1 from '../../resource/img/r1.png';
import r2 from '../../resource/img/r2.png';
import r3 from '../../resource/img/r3.png';
import r4 from '../../resource/img/r4.png';
import r5 from '../../resource/img/r5.png';
import { createTheme, ThemeProvider } from "@mui/material";


import styled from "@emotion/styled";
const Image = styled.img`
  width: 30%;
  margin:0 auto;
`;

const theme = createTheme({
  typography: {
    fontFamily: 'GmarketSansMedium'
  }
})



function AddCarrot2() {

  
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [selectedImage, setSelectedImage] = useState("r1");
  // const [selectedImage, setSelectedImage] = useState(r1);
  

  const handleImageChange = (index) => {
    // "imageSrc":"r1","message" 가 됨
    setSelectedImage("r"+index);
    

    // 소스 경로를 아래처럼 싶으면 아래처럼 바꾸면 되는데 경로가 좀 이상함 
    // "imageSrc":"/static/media/r1.a46d9656ba63c9aa9836.png"

    // 이렇게 할려면 아래 두줄 주석 풀고 위에 setSelectedImage useState 쓰는 부분 주석 풀고
    // 아래 switch 문 수정하면 됨 주석처럼
    
    // const images = [r1, r2, r3, r4, r5];
    // setSelectedImage(images[index]);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAnonymousChange = (event) => {
    setIsAnonymous(event.target.checked);
  };

  // 당근 주기 버튼
  const handleSubmit = (event) => {

  var msg = document.getElementsByName('msg');
  if(msg[0].value === null || msg[0].value === ''){
    alert('메시지를 입력하세요.');
  }else{
    
    // false인 경우 동작 x ?
    event.preventDefault();

    const formData = { imageSrc: selectedImage, message : message, isAnonymous : isAnonymous };
    console.log(JSON.stringify(formData));  // json 문자열로 변환
    
    // 비동기함수 fetch (접근url 적어줌) / headers, request, response 3개 있음
    fetch('/carrot/add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }, // json형태의 데이터를 서버로 보냅니다.
      body: JSON.stringify({
        imageSrc: selectedImage, 
        message : message, 
        isAnonymous : isAnonymous, 
      })
    })    // .then => 받아온 정보를 사용할 필요가 있는 경우에 사용
      .then(response => {
        // handle response from server
      })
      .catch(error => {
        // handle error
      });

      window.location.href="ViewCarrot";}
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => {
      switch (index) {
        case 0:
          // setSelectedImage(r1);
          setSelectedImage("r1");
          break;
        case 1:
          setSelectedImage("r2");
          break;
        case 2:
          setSelectedImage("r3");
          break;
        case 3:
          setSelectedImage("r4");
          break;
        case 4:
          setSelectedImage("r5");
          break;
        default:
          setSelectedImage("r1");
          break;
      }
    }
  };

  return (
    <div className="mainContainer">

      <div className='mainCenter'>

        {/* 헤더 부분 */}
        <Header />

        <div className='divMain'>

          {/* 여기서 작업 */}
          <form id="frm" onSubmit={handleSubmit}>
            <div className='carrotMain'>
              <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>

                  <div id="slider-div">
                    <Slider {...settings} onChange={handleImageChange}>
                      <div>
                        <Image src={r1} />
                      </div>
                      <div>
                        <Image src={r2} />
                      </div>
                      <div>
                        <Image src={r3} />
                      </div>
                      <div>
                        <Image src={r4} />
                      </div>
                      <div>
                        <Image src={r5} />
                      </div>
                    </Slider></div>


                </Grid>
                <ThemeProvider theme={theme}>
                <Grid item xs={12}>
                  <TextField
                    className='test'
                    name="msg"
                    id="standard-required"
                    label="| 메시지"
                    fullWidth sx={{
                      m: 1, '& .MuiInput-underline:after': { borderBottomColor: '#FF8000' }, "label": { color: 'black' }, "& label.Mui-focused": {
                        color: '#FF8000;'
                      }
                    }}
                    value={message}
                    onChange={handleMessageChange}
                    multiline
                    rows={5}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}><span id="anonymous">| 익명</span></Grid>
                </ThemeProvider>
                <Grid item xs={8}><Switch checked={isAnonymous} onChange={handleAnonymousChange} color="warning" /></Grid>
                <Grid item xs={4}><button type="submit" id="btnCarrot">🥕 당근 주기</button></Grid>

              </Grid>
              
            </div>
          </form>




        </div>


      </div>

    </div>
  );
}

export default AddCarrot2;
