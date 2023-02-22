import React, { useEffect } from 'react';
import { useState } from "react"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: "GmarketSansMedium"
  }
})
function Company() {
  const [farm, setFarm] = useState( []  )
    // 세션에 저장된 회사명,,
  const company = 'all4'

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/list/company', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          }, // json형태의 데이터를 서버로 보냅니다.
          body: JSON.stringify({
          company: company
        })
      })
      const json = await response.json();
      setFarm(json);
    };
    fetchData();
  }, []);
  // res 가져올 값
  // title subTitle receiver count 
  const farmList = farm.map((farm, i) =>
    <List sx={{ width: "90%", bgcolor: "background.paper" }} key={i}>
      <ListItem alignItems="flex-start" style={{marginLeft:'5%'}} >
        <ListItemText
          primary=  {`to ${farm.receiver} : ${farm.title}`}
          secondary={<React.Fragment>  {farm.subTitle}  </React.Fragment>} /><span style={{color:'#FE9A2E'}}> 🥕 {farm.count}개 아이디 : {farm._id} </span> 
      </ListItem>
    </List>
  )
  return <>
    <Link to = "/작성페이지"> <h3 className='titleName' style={{marginLeft:'8%'}}> <h1 style={{display:'inline'}}>🧑‍🌾</h1> 회사 농장!! </h3></Link >
    <div style={{ clear: "both" }} ></div>
    <ThemeProvider theme={theme}>
      {farmList}
    </ThemeProvider>
  </>
}
export default Company;