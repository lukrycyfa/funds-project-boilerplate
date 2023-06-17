import React, { useState, useEffect, useCallback } from "react";
import {  Card, Grid, Text, Row, Col, Loading} from "@nextui-org/react";
import PropTypes from "prop-types";
import { IconArrowBigRightLines, IconArrowBigLeftLines} from "../icons/Icons";
import Carousel from 'react-material-ui-carousel';
import '../css/carousel.css';


const DisplayNfts = ({ pushImg}) =>{

  const [imgs, setImgs ] = useState([]);
  const [loading, setLoading] = useState(false);


  const Imgs = useCallback(async ()=>{
        const Images = [{url:"https://gateway.pinata.cloud/ipfs/QmenTnEY7H39N7meW8REQiseR16gfEJ2PVMgGHBVe3qiup",img:"img1.jpg"},
        {url:"https://gateway.pinata.cloud/ipfs/QmWfPGw6n39pi5JAfkfSSDjUuAnwEU9zjFH2LDJj92rLdp",img:"img2.jpg"},
        {url:"https://gateway.pinata.cloud/ipfs/QmNgzQoptTU6eMFX9sqH18W6sBQmemXLS9rzq6wXLDyrwN",img:"img3.jpg"}  
        ]
        setImgs(Images);
    }, []);

  useEffect(()=>{
    try{
      setLoading(true);
      Imgs();

    } catch (error){
      console.log(error)
    } finally {
      setLoading(false);
    }
  },[Imgs])

  return(
    <>
        {!loading ?(<>
            
            <Grid.Container gap={2} justify="center" alignItems='center' alignContent='center'> 
                <Carousel className="car" PrevIcon={<IconArrowBigLeftLines/>} NextIcon={<IconArrowBigRightLines/>}
                >
                    {imgs.map((img, idx) => (
                        <Grid xs={12} md={12} key={idx}> 
                            <Card css={{ w: "100%", h: "450px" }} isPressable onPress={()=>{pushImg(img.url, img.img)}}>
                                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }} >
                                </Card.Header>
                                <Card.Body css={{ p: 0 }}>
                                    <Card.Image
                                        src={img.url}
                                        width="100%"
                                        height="100%"
                                        objectFit='fill'
                                        alt="Card example background"
                                    />
                                </Card.Body>
                                <Card.Footer
                                isBlurred
                                css={{
                                    position: "absolute",
                                    bgBlur: "#ffffff66",
                                    borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                                    bottom: 0,
                                    zIndex: 1,
                                    width:"100%",
                                    height:"9%"
                                }}
                                >
                                <Row>
                                    <Col>
                                        <Text color="#000" size={12}>
                                            <span>{img.img}</span> 
                                        </Text>
                                    </Col>
                                </Row>
                                </Card.Footer>
                            </Card>
                        </Grid>      
                    ))} 
            
                </Carousel>                                              
            </Grid.Container> 
        </>):(
            <><Loading
                type="points"
                size="xl"
                color="secondary"
            />
        </>)}                      
    </>);
}

DisplayNfts.propTypes = {
    pushImg: PropTypes.func.isRequired
}
export default DisplayNfts;